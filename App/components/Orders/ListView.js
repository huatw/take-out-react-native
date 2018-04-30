import React, { PureComponent } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

@withNavigation
class ListView extends PureComponent {
  state = {
    isRefreshing: false
  }

  fetchList = async () => {
    await this.props.fetchList()
    this.setState({ isRefreshing: false })
  }

  onRefresh = () => {
    this.setState({ isRefreshing: true })
    this.fetchList()
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

  onEndReached = () => {
    console.log('onEndReached')
    // pagination TODO
    // if last page, return; else load next page...
  }

  keyExtractor = ({ id }) => id

  render() {
    const defaultFilter = orders => orders

    const { orders, filterOrder = defaultFilter } = this.props
    const filteredOrders = filterOrder(orders)

    return (
      <FlatList data={filteredOrders}
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
  }
})

export default ListView
