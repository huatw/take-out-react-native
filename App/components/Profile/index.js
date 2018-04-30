import React, { PureComponent } from 'react'
import { SafeAreaView, View, StyleSheet, Alert } from 'react-native'
import { Icon, Text, Input, Button } from 'react-native-elements'

import requireAuth from '../../hoc/requireAuth'
import { consume } from '../../stores'

import LogoutButton from './LogoutButton'
import ListProfile from './ListProfile'

@consume(['session', 'address'])
@requireAuth(({ session }) => session.username)
class Profile extends PureComponent {
  render () {
    return (
      <SafeAreaView style={styles.container}>
        <ListProfile />
        <View style={styles.buttonContainer}>
          <LogoutButton />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: 'center'
  }
})

export default Profile
