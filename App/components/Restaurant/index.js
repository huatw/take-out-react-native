import React, { PureComponent } from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { ListItem, Text, Badge } from 'react-native-elements'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import { consume } from '../../stores'
import withLoader from '../../hoc/withLoader'

import ListFoods from './ListFoods'
import ListRatings from './ListRatings'

@consume(
  ['restaurant', 'cart'],
  ['restaurantActions', 'cartActions']
)
@withLoader(({ navigation, restaurant }) =>
  restaurant.id === navigation.getParam('restaurant')
)
class Restaurant extends PureComponent {
  componentDidMount () {
    const id = this.props.navigation.getParam('restaurant')
    this.props.restaurantActions.fetch(id)

    if (!this.props.cart[id]) {
      this.props.cartActions.init(id)
    }
  }

  toggleSave = async () => {
    const {
      restaurantActions: {
        save,
        unsave
      },
      restaurant: {
        id,
        issaved
      }
    } = this.props

    await issaved ? unsave(id) : save(id)
  }

  renderHeader = () => {
    const { restaurant } = this.props

    const createtime = new Date(restaurant.createtime).toLocaleDateString()
    const updatetime = new Date(restaurant.updatetime).toLocaleDateString()
    const address = restaurant.address.full || 'Unknown Address'
    const saveBadge = `${restaurant.issaved ? 'Unsave' : 'Save'} ${restaurant.nsaved}`

    return (
      <ListItem title={restaurant.name}
                titleStyle={styles.title}
                subtitle={
                  <View style={styles.subtitle}>
                    <Text> {restaurant.description} </Text>
                    <Text> Since {createtime} </Text>
                    <Text> Last updated {updatetime} </Text>
                    <Text> @{address} </Text>
                  </View>
                }
                rightElement={
                  <View style={styles.badges}>
                    <Badge value={saveBadge}
                           onPress={this.toggleSave}
                    />
                    <Badge value={`Rating ${restaurant.avgrating}`}
                           containerStyle={styles.badge}
                    />
                    <Badge value={`$ ${restaurant.avgprice}`}
                           containerStyle={styles.badge}
                    />
                  </View>
                }
                leftAvatar={{
                  source: { uri: restaurant.thumbnail },
                  large: true,
                  rounded: true,
                  containerStyle: { margin: 15 },
                  overlayContainerStyle: { backgroundColor: 'white' }
                }}
      />
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        { this.renderHeader() }
        <ScrollableTabView
          renderTabBar={() => <DefaultTabBar/> }
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          // tabBarBackgroundColor='#FFFFFF'
          tabBarActiveTextColor='#000'
          tabBarInactiveTextColor='#959595'
        >
          <ListFoods tabLabel="Foods" />
          <ListRatings tabLabel="Ratings" />
        </ScrollableTabView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 4
  },
  badges: {
    minHeight: 75,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  badge: {
    backgroundColor: 'black'
  },
  subtitle: {
    marginTop: 5
  },
  tabBarUnderlineStyle: {
    backgroundColor: '#000',
    height: 2
  }
})

export default Restaurant
