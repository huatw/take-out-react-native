import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import { consume } from '../../stores'

@withNavigation
@consume('session')
class ListProfile extends PureComponent {
  render() {
    const { session, navigation } = this.props
    const {
      createtime,
      nickname,
      thumbnail,
      username
    } = session

    // TODO list image..

    return (
      <View>
        <ListItem title={"Username"}
                  containerStyle={styles.disabledItem}
                  titleStyle={styles.title}
                  rightTitle={username}
                  bottomDivider
        />
        <ListItem title={"Joined at"}
                  containerStyle={styles.disabledItem}
                  titleStyle={styles.title}
                  rightTitle={new Date(createtime).toLocaleDateString()}
                  bottomDivider
        />
        <ListItem title={"Nickname"}
                  titleStyle={styles.title}
                  rightTitle={nickname}
                  bottomDivider
                  onPress={() => navigation.navigate(
                    'UpdateProfile',
                    { title: 'nickname' }
                  )}
        />
        <ListItem title={"Update Password"}
                  titleStyle={styles.title}
                  onPress={() => navigation.navigate(
                    'UpdateProfile',
                    { title: 'password' }
                  )}
                  bottomDivider
        />
        <ListItem title={"Update Photo"}
                  titleStyle={styles.title}
                  onPress={() => console.log('todo')}
                  bottomDivider
        />
        <ListItem title={"More settings"}
                  titleStyle={styles.title}
                  onPress={() => navigation.navigate('Setting')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  disabledItem: {
    backgroundColor: '#F5F5F5'
  }
})

export default ListProfile
