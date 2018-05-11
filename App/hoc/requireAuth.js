import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { Icon, Text, Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import styled from 'styled-components'

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1
  margin-top: 20
  align-items: center
  justify-content: center
`

const StyledView = styled.View`
  align-items: center
  margin-bottom: 50
`

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
      <StyledSafeAreaView>
        <StyledView>
          <Text h4>Please Login to view page.</Text>
        </StyledView>
        <Button title="LOG IN"
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.titleStyle}
                onPress={this.auth}
        />
      </StyledSafeAreaView>
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
})

export default requireAuth
