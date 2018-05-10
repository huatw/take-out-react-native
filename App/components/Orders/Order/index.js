import React, { PureComponent } from 'react'
import { SafeAreaView, ScrollView, FlatList, View, StyleSheet, Alert } from 'react-native'
import { ListItem, Button, Input, Icon, Rating } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import { consume } from '../../../stores'
import withLoader from '../../../hoc/withLoader'
import { IMAGE_URL } from '../../../config'

@withNavigation
@consume('order', 'orderActions')
@withLoader(({ navigation, order }) =>
  order.id === navigation.getParam('order')
)
class Order extends PureComponent {
  state = {
    isLoading: false,
    isCanceling: false,
    comment: '',
    stars: 5
  }

  componentDidMount () {
    const id = this.props.navigation.getParam('order')
    this.props.orderActions.fetch(id)
  }

  cancel = async () => {
    const {
      order,
      orderActions,
      navigation
    } = this.props

    this.setState({ isCanceling: true })

    try {
      await orderActions.cancel(order.id)

      navigation.pop()
    } catch (e) {
      console.log(e)
      this.setState({ isCanceling: false })

      Alert.alert(
        'canceling Order failed',
        'You should not see this message...',
        [{ text: 'OK' }]
      )
    }
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
                source: { uri: `${IMAGE_URL}${food.thumbnail}` },
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
      />
    )
  }

  renderRating = (isRated) => {
    const { rating } = this.props.order

    if (isRated) {
      return (
        <ListItem title={
                    <Rating showRating
                            startingValue={rating.stars}
                            readonly
                            imageSize={30}
                    />
                  }
        />
      )
    }

    return (
      <ListItem title={
                  <Rating ratingCount={5}
                          fractions={0}
                          startingValue={this.state.stars}
                          imageSize={30}
                          onFinishRating={stars => this.setState({ stars })}
                          showRating
                  />
                }
      />
    )
  }

  renderCancelButton = (isRated) => {
    const { isCanceling } = this.state
    if (!isRated) {
      return (
        <Button title="CANCEL"
                buttonStyle={[styles.button, styles.cancelButton]}
                titleStyle={styles.buttonTitle}
                loading={isCanceling}
                disabled={isCanceling}
                onPress={this.cancel}
        />
      )
    }
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

    const isCanceled = status === 2
    const isRated = status !== 0
    const rateTitle = isRated ? 'RATED' : 'RATE'

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <ListItem title={
                      <Input value={address.full}
                             label="Address:"
                             editable={false}
                      />
                    }
                    rightTitle={`Total: $ ${price}`}
                    rightSubtitle={`x ${quantity}`}
          />
          <FlatList data={orderFoods}
                    renderItem={this.renderItem}
                    keyExtractor={({ food }) => food.id}
                    // ListEmptyComponent={}
                    // ItemSeparatorComponent={}
          />
          {!isCanceled
            && <View>
              {this.renderComments(isRated)}
              {this.renderRating(isRated)}
              <View style={styles.buttonContainer}>
                <Button title={rateTitle}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonTitle}
                        loading={isLoading}
                        disabledStyle={styles.disabledButton}
                        disabled={isRated || isLoading}
                        onPress={this.rate}
                />
                {this.renderCancelButton(isRated)}
              </View>
            </View>
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 30
  },
  buttonTitle: {
    fontWeight: 'bold',
    color: 'white'
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: '#000',
    borderRadius: 30
  },
  disabledButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})

export default Order
