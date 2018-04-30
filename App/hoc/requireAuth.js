import React, { PureComponent } from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { Icon, Text, Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

const requireAuth = (check, runAuth) => Wrapped => class extends PureComponent {
  static displayName = `requireAuth(${Wrapped.displayName || Wrapped.name})`

  componentDidMount () {
    runAuth && runAuth(this.props)
  }

  render () {
    return check(this.props)
      ? <Wrapped {...this.props} />
      : <Auth />
  }
}

@withNavigation
class Auth extends PureComponent {
  auth = () => {
    this.props.navigation.navigate('Auth')
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text h4>Please Login to view page.</Text>
        </View>
        <Button title="LOG IN"
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.titleStyle}
                onPress={this.auth}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    alignItems: 'center',
    marginBottom: 50
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
})

export default requireAuth
