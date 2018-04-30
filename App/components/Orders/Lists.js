import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import withLoader from '../../hoc/withLoader'
import { consume } from '../../stores'

import ListAll from './ListAll'
import ListOngoing from './ListOngoing'
import ListCompleted from './ListCompleted'
import ListCanceled from './ListCanceled'

@consume('orders', 'orderActions')
@withLoader((_, state) => !state.initing)
class Lists extends PureComponent {
  state = { initing: true }

  async componentDidMount () {
    await this.props.orderActions.fetchList()
    this.setState({ initing: false })
  }

  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => <DefaultTabBar/> }
        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        // tabBarBackgroundColor='#FFFFFF'
        tabBarActiveTextColor='#000'
        tabBarInactiveTextColor='#959595'
      >
        <ListAll tabLabel="All" />
        <ListOngoing tabLabel="Ongoing" />
        <ListCompleted tabLabel="Completed" />
        <ListCanceled tabLabel="Canceled" />
      </ScrollableTabView>
    )
  }
}

const styles = StyleSheet.create({
  tabBarUnderlineStyle: {
    backgroundColor: 'black',
    height: 2
  }
})

export default Lists
