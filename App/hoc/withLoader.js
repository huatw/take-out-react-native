import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

const withLoader = check => Wrapped => class extends Wrapped {
  static displayName = `withLoader(${Wrapped.displayName || Wrapped.name})`

  componentDidMount () {
    super.componentDidMount && super.componentDidMount()
  }

  render () {
    return check(this.props, this.state)
      ? super.render()
      : <ActivityIndicator size="large" style={styles.loadding}/>
  }
}

const styles = StyleSheet.create({
  loadding: { marginTop: 100 }
})

export default withLoader
