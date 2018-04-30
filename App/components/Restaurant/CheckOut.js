import React, { PureComponent } from 'react'
import { SafeAreaView, ScrollView, FlatList, View, StyleSheet, Alert } from 'react-native'
import { ListItem, Button, Input, Icon } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

import { consume } from '../../stores'
import requireAuth from '../../hoc/requireAuth'

@consume(
  ({ session, restaurant, cart, address }) => ({
    session,
    address,
    restaurant,
    cart: cart[restaurant.id]
  }),
  ({ orderActions: { create } }) => ({ create })
)
@requireAuth(({ session }) => session.username)
class CheckOut extends PureComponent {
  state = {
    isLoading: false,
    full: this.props.address.full
  }

  confirm = async () => {
    const { create, navigation, restaurant } = this.props

    this.setState({ isLoading: true })

    try {

      await create(restaurant.id, this.state.full)

      // reset to mainTab then navigate to orders page
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'MainTab' })]
      })
      navigation.dispatch(resetAction)
      navigation.navigate('Orders')
    } catch (e) {
      console.log(e)
      this.setState({ isLoading: false })

      Alert.alert(
        'creating Order failed',
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

  render () {
    const { isLoading, full } = this.state
    const { cart, address } = this.props

    const {foods, price, quantity } = cart

    const data = Object.values(foods)

    return (
      <SafeAreaView>
        <ScrollView>
          <FlatList data={data}
                    renderItem={this.renderItem}
                    keyExtractor={({ food }) => food.id}
                    // ListEmptyComponent={}
                    // ItemSeparatorComponent={}
          />
          <ListItem title={
                      <Input placeholder='Address'
                             label="Address:"
                             value={full}
                             autoCapitalize="none"
                             onChangeText={full => this.setState({ full })}
                      />
                    }
                    rightTitle={`Total: $ ${price}`}
                    rightSubtitle={`x ${quantity}`}
                    containerStyle={styles.addressBar}
          />
          <View style={styles.buttonContainer}>
            <Button title="CONFIRM"
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.titleStyle}
                    loading={isLoading}
                    disabledStyle={styles.disabledButtonStyle}
                    disabled={isLoading}
                    onPress={this.confirm}
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

export default CheckOut
