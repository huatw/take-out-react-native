import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import io from 'socket.io-client'
import { GiftedChat } from 'react-native-gifted-chat'

import { WS_URL } from '../../../config'
import { consume } from '../../../stores'
import requireAuth from '../../../hoc/requireAuth'

@consume(
  ({ session, contacts, restaurant }) => ({
    session,
    restaurantId: restaurant.id,
    messages: contacts[restaurant.id] || []
  }),
  'contactActions'
)
@requireAuth(({ session } ) => session.username)
class Contact extends PureComponent {
  componentDidMount () {
    const {
      contactActions,
      restaurantId,
      session
    } = this.props

    contactActions.init(restaurantId)

    this.socket = io(WS_URL, {
      query: `from=${session.username}&&to=${restaurantId}`
    })
    this.socket.on('message', this.storeMessages)
  }

  componentWillUnmount () {
    this.socket.disconnect()
  }

  storeMessages = (newMessages = []) => {
    const {
      contactActions,
      messages,
      restaurantId
    } = this.props

    const concatMsgs = GiftedChat.append(messages, newMessages)

    contactActions.sendMessage(concatMsgs, restaurantId)
  }

  onSend = (messages = []) => {
    this.socket.emit('message', messages[0])
    this.storeMessages(messages)
  }

  render() {
    const {
      session: user,
      messages
    } = this.props

    return (
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={this.onSend}
          user={user}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
})

export default Contact
