import React, { PureComponent } from 'react'
import { SafeAreaView, NetInfo, View, StyleSheet } from 'react-native'
import { Icon, Text, Button } from 'react-native-elements'

const requireGPS = (propMapper, actionMapper) => Wrapped => class extends PureComponent {
  static displayName = `requireGPS(${Wrapped.displayName || Wrapped.name})`

  componentDidMount () {
    if (!propMapper(this.props)) {
      this.getGPS()
    }
  }

  getGPS = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        actionMapper(this.props)(latitude, longitude)
      },
      err => {
        actionMapper(this.props)()
        console.log('connect failed', err)
      }
    )
  }

  render () {
    return propMapper(this.props)
      ? <Wrapped {...this.props} />
      : (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text h4>Please Turn on GPS.</Text>
          </View>
          <Button title="RETRY"
                  buttonStyle={styles.buttonStyle}
                  titleStyle={styles.titleStyle}
                  onPress={this.getGPS}
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

export default requireGPS

