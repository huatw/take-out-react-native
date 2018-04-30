import React, { PureComponent } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

import withSearchBar from '../../../hoc/withSearchBar'
import { consume } from '../../../stores'

import ListView from '../ListView'

@consume(
  ({ restaurants }) => ({ restaurants: restaurants.name }),
  ({ restaurantActions }) => ({
    fetchList: (keyword) => restaurantActions.fetchList('NAME', keyword),
    clearList: () => restaurantActions.clearList('NAME')
  })
)
@withSearchBar(
  'Search Restaurants...',
  ({ fetchList }) => fetchList
)
class SearchRestaurant extends PureComponent {
  componentWillUnmount () {
    this.props.clearList()
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
                source: { uri: item.thumbnail },
                large: true,
                rounded: false,
                containerStyle: { margin: 15 },
                overlayContainerStyle: { backgroundColor: 'white' }
              }}
              chevron
              bottomDivider
              onPress={() => this.loadItem(item.id)}
    />
  )

  keyExtractor = ({ id }) => id

  render() {
    const {
      restaurants,
      isLoading
    } = this.props

    return (
      <FlatList data={restaurants}
                refreshing={isLoading}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
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
  }
})

export default SearchRestaurant

