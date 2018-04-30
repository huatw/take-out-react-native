import React, { PureComponent } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

import SearchBarHeader from './SearchBarHeader'
import Lists from './Lists'

class Restaurants extends PureComponent {
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
    flex: 1
  }
})

export default Restaurants
