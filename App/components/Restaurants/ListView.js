import React, { PureComponent } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { ListItem, Icon, Badge } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import { IMAGE_URL } from '../../config'

@withNavigation
class ListView extends PureComponent {
  state = { isRefreshing: true }

  componentDidMount () {
    this.fetchList()
  }

  fetchList = async () => {
    const { fetchList, listName } = this.props

    await fetchList(listName)

    this.setState({ isRefreshing: false })
  }

  onRefresh = () => {
    this.setState({ isRefreshing: true })

    this.fetchList()
  }

  loadItem = (restaurant) => {
    this.props.navigation.navigate('Restaurant', { restaurant })
  }

  renderItem = ({ item }) => (
    <ListItem title={item.name}
              titleStyle={styles.title}
              subtitle={item.cuisine}
              subtitleStyle={styles.subtitle}
              leftAvatar={{
                source: { uri: `${IMAGE_URL}${item.thumbnail}` },
                large: true,
                rounded: false,
                containerStyle: { margin: 15 },
                overlayContainerStyle: { backgroundColor: 'white' }
              }}
              badge={{
                value: `Rating ${item.avgrating}`,
                containerStyle: styles.badge
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
    backgroundColor: 'black'
  }
})

export default ListView
