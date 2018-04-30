import React, { PureComponent } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

import withSearchBar from '../../../hoc/withSearchBar'
import { consume } from '../../../stores'

import ListView from '../ListView'

@consume(
  'orderSearch',
  ({ orderActions: { searchList, clearSearch } }) => ({
    searchList,
    clearSearch
  })
)
@withSearchBar(
  'Search Orders...',
  ({ searchList }) => searchList
)
class SearchOrder extends PureComponent {
  componentWillUnmount () {
    this.props.clearSearch()
  }

  loadItem = (order) => {
    this.props.navigation.navigate('Order', { order })
  }

  renderItem = ({ item: { id, status, restaurant, price, quantity, createtime, finishtime } }) => (
    <ListItem title={restaurant.name}
              titleStyle={styles.title}
              subtitle={`@ ${new Date(createtime).toLocaleString()}`}
              subtitleStyle={styles.subtitle}
              chevron
              bottomDivider
              onPress={() => this.loadItem(id)}
              rightTitle={`$ ${price}`}
              rightSubtitle={`x ${quantity}`}
    />
  )

  keyExtractor = ({ id }) => id

  render() {
    const { orderSearch, isLoading } = this.props

    return (
      <FlatList data={orderSearch}
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

export default SearchOrder
