import React, { PureComponent } from 'react'
import { SafeAreaView, ScrollView, FlatList, View, StyleSheet, Alert } from 'react-native'
import { ListItem, Button, Input, Icon } from 'react-native-elements'

import { consume } from '../../../stores'
import withLoader from '../../../hoc/withLoader'

@consume('order', 'orderActions')
@withLoader(({ navigation, order }) =>
  order.id === navigation.getParam('order')
)
class Order extends PureComponent {
  state = {
    isLoading: false,
    comment: '',
    stars: ''
  }

  componentDidMount () {
    const id = this.props.navigation.getParam('order')
    this.props.orderActions.fetch(id)
  }

  rate = async () => {
    const {
      comment,
      stars
    } = this.state

    const {
      order,
      orderActions,
      navigation
    } = this.props

    this.setState({ isLoading: true })

    try {
      await orderActions.complete(order.id, comment, Number(stars))

      navigation.pop()
    } catch (e) {
      console.log(e)
      this.setState({ isLoading: false })

      Alert.alert(
        'rating Order failed',
        'You should not see this message...',
        [{ text: 'OK' }]
      )
    }
  }

  renderItem = ({ item: { food, quantity } }) => (
    <ListItem title={food.name}
              titleStyle={styles.title}
              subtitle={`$ ${food.price}`}
              rightTitle={`$ ${food.price * quantity}`}
              rightSubtitle={`x ${quantity}`}
              leftAvatar={{
                source: { uri: food.thumbnail },
                medium: true,
                rounded: false,
                overlayContainerStyle: { backgroundColor: 'white' }
              }}
              bottomDivider
    />
  )

  renderComments = (isRated) => {
    const { rating } = this.props.order

    if (isRated) {
      return (
        <ListItem title={
                    <Input label="Comment:"
                           value={rating.content}
                           editable={false}
                    />
                  }
                  containerStyle={styles.addressBar}
        />
      )
    }

    return (
      <ListItem title={
                  <Input placeholder='Comment'
                         label="Comment:"
                         autoCapitalize="none"
                         value={this.state.comment}
                         onChangeText={comment => this.setState({ comment })}
                  />
                }
                containerStyle={styles.addressBar}
      />
    )
  }

  renderRating = (isRated) => {
    const { rating } = this.props.order

    if (isRated) {
      return (
        <ListItem title={
                    <Input label="Rating:"
                           value={String(rating.stars)}
                           editable={false}
                    />
                  }
                  containerStyle={styles.addressBar}
        />
      )
    }

    return (
      <ListItem title={
                  <Input placeholder='Rating(0-5)'
                         label="Rating:"
                         autoCapitalize="none"
                         value={this.state.stars}
                         onChangeText={stars => this.setState({ stars })}
                  />
                }
                containerStyle={styles.addressBar}
      />
    )
  }

  render () {
    const { isLoading } = this.state

    const {
      quantity,
      price,
      status,
      createtime,
      finishtime,
      address,
      orderFoods,
      restaurant
    } = this.props.order

    const isRated = status !== 0
    const buttonTitle = isRated ? 'RATED' : 'RATE'
    // orderFoods {
    //   quantity
    //   food {
    //     id
    //     name
    //     price
    //     thumbnail
    //   }
    // }
    // restaurant {
    //   id
    //   name
    //   thumbnail
    // }

    return (
      <SafeAreaView>
        <ScrollView>
          <FlatList data={orderFoods}
                    renderItem={this.renderItem}
                    keyExtractor={({ food }) => food.id}
                    // ListEmptyComponent={}
                    // ItemSeparatorComponent={}
          />
          <ListItem title={
                      <Input value={address.full}
                             label="Address:"
                             editable={false}
                      />
                    }
                    rightTitle={`Total: $ ${price}`}
                    rightSubtitle={`x ${quantity}`}
                    containerStyle={styles.addressBar}
          />
          {this.renderComments(isRated)}
          {this.renderRating(isRated)}
          <View style={styles.buttonContainer}>
            <Button title={buttonTitle}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.titleStyle}
                    loading={isLoading}
                    disabledStyle={styles.disabledButtonStyle}
                    disabled={isRated || isLoading}
                    onPress={this.rate}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  addressBar: {
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 30
  },
  titleStyle: {
    fontWeight: 'bold',
    color: 'white'
  },
  buttonStyle: {
    height: 50,
    width: 200,
    backgroundColor: '#000',
    borderRadius: 30
  },
  disabledButtonStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  }
})

export default Order
