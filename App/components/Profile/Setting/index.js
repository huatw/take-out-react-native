import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Setting extends PureComponent {
  render () {
    return (
      <View>
        <Text>International / Theme Setting...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Setting