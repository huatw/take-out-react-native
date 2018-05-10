import React, { PureComponent } from 'react'
import { FlatList, SectionList, View, StyleSheet } from 'react-native'
import { Button, Text, ListItem, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import { IMAGE_URL } from '../../config'
import { consume } from '../../stores'

@withNavigation
@consume(
  ({ restaurant, cart }) => ({ restaurant, cart: cart[restaurant.id] }),
  'cartActions'
)
class ListFoods extends PureComponent {
  state = { cuisine: '' }

  /**
   * right list scroll to section of index
   * @param  {Number} index
   */
  scroll = (index) => {
    this.section.scrollToLocation({
      sectionIndex: index,
      itemIndex: 0
    })
  }

  renderItemLeft = ({ item: { cuisine }, index }) => (
    <Button title={cuisine}
            clear
            titleStyle={styles.leftTitle}
            containerStyle={[cuisine === this.state.cuisine && styles.activeLeftContainer]}
            onPress={() => this.scroll(index)}
    />
  )

  incToCart = (food) => {
    this.props.cartActions.inc(food, this.props.restaurant.id)
  }

  decToCart = (food) => {
    this.props.cartActions.dec(food, this.props.restaurant.id)
  }

  loadFood = (id) => {
    // TODO load food
    console.log('load food')
    // this.props.navigation.navigate('Food', { food: id })
  }

  renderItemRight = ({ item }) => {
    const food = this.props.cart.foods[item.id]
    const quantity = (food && food.quantity) || 0

    return (
      <ListItem title={item.name}
                titleStyle={styles.rightTitle}
                subtitle={`$ ${item.price}`}
                leftAvatar={{
                  source: { uri: `${IMAGE_URL}${item.thumbnail}` },
                  medium: true,
                  rounded: false,
                  overlayContainerStyle: { backgroundColor: 'white' }
                }}
                bottomDivider
                rightElement={
                  <View style={styles.rightCartOp}>
                    {quantity &&
                      <Icon name="remove-circle"
                            containerStyle={styles.biggerIcon}
                            onPress={() => this.decToCart(item)}
                      />
                    }
                    {quantity &&
                      <Text style={styles.rightQuantity}>
                        {quantity}
                      </Text>
                    }
                    <Icon name="add-circle"
                          containerStyle={styles.biggerIcon}
                          onPress={() => this.incToCart(item)}
                    />
                  </View>
                }
                onPress={() => this.loadFood(item.id)}

      />
    )
  }

  renderSectionHeader = ({ section: { cuisine } }) => (
    <ListItem title={cuisine}
              titleStyle={styles.rightHeaderTitle}
              containerStyle={styles.rightHeaderContainer}
    />
  )

  onViewableItemsChanged = ({ viewableItems }) => {
    const cuisine = viewableItems[0].section.cuisine

    if (cuisine !== this.state.cuisine) {
      this.setState({ cuisine })
    }
  }

  showCartDetails = () => {
    // TODO
    console.log('showCartDetails')
  }

  checkout = () => {
    this.props.navigation.navigate('CheckOut')
  }

  normalizeData = (data) => {
    const groupedData = data.reduce(
      (acc, food) => {
        acc[food.cuisine] = acc[food.cuisine] || []
        acc[food.cuisine].push(food)
        return acc
      },
      {}
    )

    const results = Object.entries(groupedData).map(
      ([cuisine, data]) => ({ cuisine, data })
    )

    return results
  }

  render () {
    const {
      cart,
      restaurant
    } = this.props

    const foods = this.normalizeData(restaurant.foods)

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <FlatList
            data={foods}
            style={styles.bodyLeft}
            renderItem={this.renderItemLeft}
            keyExtractor={({ cuisine }) => cuisine}
            // ListEmptyComponent={}
            // ItemSeparatorComponent={}
          />
          <SectionList
            ref={(section) => this.section = section}
            sections={foods}
            style={styles.bodyRight}
            stickySectionHeadersEnabled={true}
            keyExtractor={({ id }) => id}
            renderItem={this.renderItemRight}
            renderSectionHeader={this.renderSectionHeader}
            onViewableItemsChanged={this.onViewableItemsChanged}
            // ListEmptyComponent={}
            // ItemSeparatorComponent={() => <Divider/>}
          />
        </View>
        <ListItem title={`$ ${cart.price}`}
                  titleStyle={styles.footerTitle}
                  subtitle={`x ${cart.quantity}`}
                  subtitleStyle={styles.footerTitle}
                  containerStyle={styles.footer}
                  leftIcon={{
                    name: 'shopping-cart',
                    reverse: true
                  }}
                  rightIcon={{
                    name: 'navigate-next',
                    reverse: true,
                    size: 55,
                    containerStyle: { marginRight: -20 },
                    onPress: this.checkout
                  }}
                  onPress={this.showCartDetails}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    flexDirection: 'row'
  },
  bodyLeft: {
    maxWidth: 70
  },
  leftTitle: {
    color: 'black',
    fontSize: 16
  },
  activeLeftContainer: {
    backgroundColor: 'white'
  },
  bodyRight: {
    minWidth: 200,
    backgroundColor: 'white'
  },
  rightHeaderContainer: {
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  rightHeaderTitle: {
    color: 'white',
    fontSize: 16
  },
  rightTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  rightCartOp: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightQuantity: {
    // marginHorizontal: 5,
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: 55
  },
  footerTitle: {
    color: 'white'
  },
  biggerIcon: {
    padding: 8
  }
})

export default ListFoods
