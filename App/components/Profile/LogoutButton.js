import React, { PureComponent } from 'react'
import { SafeAreaView, View, StyleSheet, Alert } from 'react-native'
import { Icon, Text, Input, Button } from 'react-native-elements'

import { consume } from '../../stores'

@consume(
  null,
  ({ sessionActions: { logout } }) => ({ logout })
)
class LogoutButton extends PureComponent {
  state = { isLoading: false }

  logout = async () => {
    const { logout, navigation } = this.props

    this.setState({ isLoading: true })

    try {
      await logout()
    } catch (e) {
      this.setState({ isLoading: false })

      Alert.alert(
        'Log out failed',
        'You should not see this message...',
        [{ text: 'OK' }]
      )
    }
  }

  render () {
    const { isLoading } = this.state

    return (
      <Button title="LOG OUT"
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.titleStyle}
              loading={isLoading}
              disabledStyle={styles.disabledButtonStyle}
              disabled={isLoading}
              onPress={this.logout}
      />
    )
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
})

export default LogoutButton
