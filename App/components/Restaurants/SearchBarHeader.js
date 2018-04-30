import React, { PureComponent } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import { consume } from '../../stores'

@withNavigation
@consume('address')
class SearchBarHeader extends PureComponent {
  search = () => {
    this.props.navigation.navigate('SearchRestaurant')
  }

  render () {
    const hasGPS = this.props.address.gps.length > 0
    const GPSIcon = hasGPS ? "gps-fixed" : "gps-off"

    return (
      <View style={styles.container}>
        <View style={styles.gps}>
          <Icon name={GPSIcon} />
        </View>
        <TouchableOpacity style={styles.searchBar}
                          onPress={this.search}
        >
          <Icon name="search" size={15} color="#8B8B8B" />
          <Text style={styles.searchBarText}>
            Search Restaurants...
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10
  },
  gps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    flex: 1,
    backgroundColor: '#F5F5F5',
    height: 30,
    borderRadius: 10
  },
  searchBarText: {
    color: '#8B8B8B',
    marginLeft: 5
  }
})

export default SearchBarHeader