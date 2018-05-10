import React, { PureComponent } from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import withLoader from './hoc/withLoader'
import { provide, consume } from './stores'

import Restaurants from './components/Restaurants'
import Saved from './components/Saved'
import Orders from './components/Orders'
import Profile from './components/Profile'
import SearchRestaurant from './components/Restaurants/Search'
import SearchOrder from './components/Orders/Search'
import Setting from './components/Profile/Setting'
import UpdateProfile from './components/Profile/UpdateProfile'
import Restaurant from './components/Restaurant'
import CheckOut from './components/Restaurant/CheckOut'
import Contact from './components/Restaurant/Contact'
import Order from './components/Orders/Order'
import Auth from './components/Auth'

console.disableYellowBox = true

const MainTab = TabNavigator({
  Restaurants: {
    screen: Restaurants,
    path: '/restaurants',
    navigationOptions: {
      header: null,
      tabBarLabel: 'Restaurants',
      tabBarIcon: ({ tintColor }) => <Icon name="restaurant" size={20} color={tintColor}/>
   }
  },
  Orders: {
    screen: Orders,
    path: '/orders',
    navigationOptions: {
      header: null,
      tabBarLabel: 'Orders',
      tabBarIcon: ({ tintColor }) => <Icon name="assignment" size={20} color={tintColor}/>
    }
  },
  Saved: {
    screen: Saved,
    path: '/saved',
    navigationOptions: {
      title: "Saved",
      tabBarLabel: 'Saved',
      tabBarIcon: ({ tintColor }) => <Icon name="bookmark" size={20} color={tintColor}/>
    }
  },
  Profile: {
    screen: Profile,
    path: '/profile',
    navigationOptions: {
      title: "Profile",
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="account-box" size={20} color={tintColor}/>
    },
  }
}, {
  initialRouteName: 'Restaurants',
  animationEnabled: true,
  swipeEnabled: true,
  lazy: true,
  tabBarPosition: 'bottom',
  tabBarOptions: { // TODO style
    activeTintColor: '#494949',
    inactiveTintColor: '#999999',
    // tabStyle: {},
    labelStyle: {
      fontSize: 12,
      marginBottom: 8
    },
    style: {
      height: 55
    }
  }
})

const MainStack = StackNavigator({
  MainTab: {
    screen: MainTab,
    path: '/'
  },
  SearchRestaurant: {
    screen: SearchRestaurant,
    path: '/searchRestaurant',
    navigationOptions: {
      header: null
    }
  },
  SearchOrder: {
    screen: SearchOrder,
    path: '/SearchOrder',
    navigationOptions: {
      header: null
    }
  },
  Restaurant: {
    screen: Restaurant,
    path: '/restaurant',
    navigationOptions: {
      header: null
    }
  },
  CheckOut: {
    screen: CheckOut,
    path: '/checkout',
    navigationOptions: {
      title: 'Check Out'
    }
  },
  Contact: {
    screen: Contact,
    path: '/contact',
    navigationOptions: {
      title: 'Contact'
    }
  },
  Order: {
    screen: Order,
    path: '/order',
    navigationOptions: {
      title: 'Order'
    }
  },
  Auth: {
    screen: Auth,
    path: '/auth',
    navigationOptions: {
      header: null
    }
  },
  Setting: {
    screen: Setting,
    path: '/setting',
    navigationOptions: {
      title: 'Setting'
    }
  },
  UpdateProfile: {
    screen: UpdateProfile,
    path: '/updateProfile',
    navigationOptions: ({ navigation }) => ({
      title: `Update ${navigation.getParam('title')}`
    })
  }
}, {
  mode: 'modal', // ios modal, up front
  // headerMode: 'none'
})

@provide
@consume('session', 'sessionActions')
@withLoader((_, state) => !state.initing)
class App extends PureComponent {
  state = { initing: true }

  async componentDidMount () {
    await this.props.sessionActions.fetch()
    this.setState({ initing: false })
  }

  render () {
    return <MainStack />
  }
}

export default App
