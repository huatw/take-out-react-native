import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import withLoader from '../../hoc/withLoader'
import requireGPS from '../../hoc/requireGPS'
import { consume } from '../../stores'

import ListHot from './ListHot'
import ListCheap from './ListCheap'
import ListRating from './ListRating'
import ListQuick from './ListQuick'

@consume('address', 'addressActions')
@withLoader(({ address }) => !address.initing)
@requireGPS(
  ({ address }) => address.gps.length > 0,
  ({ addressActions }) => addressActions.update
)
class Lists extends PureComponent {
  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => <DefaultTabBar/> }
        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        // tabBarBackgroundColor='#FFFFFF'
        tabBarActiveTextColor='#000'
        tabBarInactiveTextColor='#959595'
      >
        <ListHot tabLabel="Hot" />
        <ListQuick tabLabel="Quick" />
        <ListCheap tabLabel="Cheap" />
        <ListRating tabLabel="Rating" />
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
