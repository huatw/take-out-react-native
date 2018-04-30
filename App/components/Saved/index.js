import React, { PureComponent } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

import requireAuth from '../../hoc/requireAuth'
import { consume } from '../../stores'

@consume(
  ({ session, restaurants }) => ({ session, restaurants: restaurants.saved }),
  ({ restaurantActions }) => ({
    fetchList: () => restaurantActions.fetchList('SAVED'),
    unsave: restaurantActions.unsave
  })
)
@requireAuth(({ session } ) => session.username)
class Saved extends PureComponent {
  state = { isRefreshing: true }

  componentDidMount () {
    this.fetchList()
  }

  fetchList = async () => {
    await this.props.fetchList()

    this.setState({ isRefreshing: false })
  }

  onRefresh = () => {
    this.setState({ isRefreshing: true })
    this.fetchList()
  }

  loadItem = (restaurant) => {
    this.props.navigation.navigate('Restaurant', { restaurant })
  }

  toggleSave = (restaurant) => {
    this.props.unsave(restaurant)
  }

  /* refacting: abstract out all the ListView */
  renderItem = ({ item }) => (
    <ListItem title={item.name}
              titleStyle={styles.title}
              subtitle={item.cuisine}
              subtitleStyle={styles.subtitle}
              leftAvatar={{
                source: { uri: item.thumbnail },
                large: true,
                rounded: false,
                containerStyle: { margin: 15 },
                overlayContainerStyle: { backgroundColor: 'white' }
              }}
              badge={{
                value: 'Unsave',
                containerStyle: styles.badge,
                onPress: () => this.toggleSave(item.id)
              }}
              chevron
              bottomDivider
              onPress={() => this.loadItem(item.id)}
    />
  )

  onEndReached = () => {
    console.log('onEndReached')
    // pagination TODO
    // if last page, return; else load next page...
  }

  keyExtractor = ({ id }) => id

  render() {
    const restaurants = this.props.restaurants

    return (
      <FlatList data={restaurants}
                renderItem={this.renderItem}
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
                keyExtractor={this.keyExtractor}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.5}
                // ListEmptyComponent={}
                // ItemSeparatorComponent={}
      />
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  subtitle: {
    fontSize: 14
  },
  badge: {
    backgroundColor: 'rgba(0,0,0,0.4)'
  }
})

export default Saved
