import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import styled from 'styled-components'

import Login from './Login'
import SignUp from './SignUp'

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1
  marginTop: 20
`

class Auth extends PureComponent {
  render () {
    return (
      <StyledSafeAreaView>
        <ScrollableTabView
          renderTabBar={() => <DefaultTabBar />}
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          // tabBarBackgroundColor='#FFFFFF'
          tabBarActiveTextColor='#000'
          tabBarInactiveTextColor='#959595'
        >
          <Login tabLabel="Login" />
          <SignUp tabLabel="Sign up" />
        </ScrollableTabView>
      </StyledSafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  tabBarUnderlineStyle: {
    backgroundColor: '#000',
    height: 2
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10
  }
})

export default Auth
