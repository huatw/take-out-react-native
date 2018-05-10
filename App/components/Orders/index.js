import React, { PureComponent } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

import requireAuth from '../../hoc/requireAuth'
import { consume } from '../../stores'

import SearchBarHeader from './SearchBarHeader'
import Lists from './Lists'

@consume('session')
@requireAuth(({ session } ) => session.username)
class Orders extends PureComponent {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBarHeader />
        <Lists />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
})

export default Orders
