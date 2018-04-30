import React, { PureComponent } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import Login from './Login'
import SignUp from './SignUp'

class Auth extends PureComponent {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollableTabView
          renderTabBar={() => <DefaultTabBar/> }
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          // tabBarBackgroundColor='#FFFFFF'
          tabBarActiveTextColor='#000'
          tabBarInactiveTextColor='#959595'
        >
          <Login tabLabel="Login" />
          <SignUp tabLabel="Sign up" />
        </ScrollableTabView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarUnderlineStyle: {
    backgroundColor: '#000',
    height: 2
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
  },
})

export default Auth
