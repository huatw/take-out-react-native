import React, { PureComponent } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

@withNavigation
class SearchBarHeader extends PureComponent {
  search = () => {
    this.props.navigation.navigate('SearchOrder')
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.searchBar}
                          onPress={this.search}
        >
          <Icon name="search" size={15} color="#8B8B8B" />
          <Text style={styles.searchBarText}>
            Search Orders...
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
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    flex: 1,
    backgroundColor: '#F5F5F5',
    height: 30,
    borderRadius: 10,
  },
  searchBarText: {
    color: '#8B8B8B',
    marginLeft: 5
  }
})

export default SearchBarHeader