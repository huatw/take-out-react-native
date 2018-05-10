import React, { PureComponent } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { ListItem, Icon, Text } from 'react-native-elements'

import { consume } from '../../stores'

@consume(
  ({ restaurant: { id, ratings } }) => ({
    restaurantId: id,
    ratings
  }),
  'ratingActions'
)
class ListRatings extends PureComponent {
  state = { isRefreshing: true }

  componentDidMount () {
    this.fetchList()
  }

  fetchList = async () => {
    const {
      restaurantId,
      ratingActions: { fetchByRestaurant }
    } = this.props

    await fetchByRestaurant(restaurantId)

    this.setState({ isRefreshing: false })
  }

  onRefresh = () => {
    this.setState({ isRefreshing: true })
    this.fetchList()
  }

  renderItem = ({ item: { nickname, content, createtime, stars } }) => (
    <ListItem title={nickname}
              titleStyle={styles.title}
              subtitle={
                <View>
                  <Text style={styles.subtitle}>{ content || 'No Comment.' }</Text>
                  <Text>{ `@ ${new Date(createtime).toLocaleDateString()}` }</Text>
                </View>
              }
              bottomDivider
              badge={{
                value: `Rating: ${stars}`,
                containerStyle: styles.badge
              }}
    />
  )

  onEndReached = () => {
    console.log('onEndReached')
    // pagination TODO
    // if last page, return; else load next page...
  }

  keyExtractor = ({ id }) => id

  render() {
    const ratings = this.props.ratings

    return (
      <FlatList data={ratings}
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
    fontSize: 16,
    marginVertical: 5
  },
  badge: {
    backgroundColor: 'black'
  }
})

export default ListRatings
