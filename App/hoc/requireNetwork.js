import React, { PureComponent } from 'react'
import { SafeAreaView, NetInfo, View, StyleSheet } from 'react-native'
import { Icon, Text, Button } from 'react-native-elements'

/* NetInfo API is buggy on IOS... */
const requireNetwork = Wrapped => class extends PureComponent {
  static displayName = `requireNetwork(${Wrapped.displayName || Wrapped.name})`

  state = {
    isConnected: true
  }

  componentDidMount () {
    NetInfo.isConnected.fetch().then().done(() => {
      NetInfo.isConnected.addEventListener('connectionChange', this.handleChange)
    })
  }

  handleChange = (isConnected) => {
    this.setState({ isConnected })
  }

  render () {
    return this.state.isConnected
      ? <Wrapped {...this.props} />
      : (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text h4>No Network.</Text>
          </View>
          <Button title="RETRY"
                  buttonStyle={styles.buttonStyle}
                  titleStyle={styles.titleStyle}
                  onPress={this.checkNetwork}
          />
        </SafeAreaView>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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

export default requireNetwork
