import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import { Icon, Text, Input, Button } from 'react-native-elements'
import styled from 'styled-components'

import requireAuth from '../../hoc/requireAuth'
import { consume } from '../../stores'

import LogoutButton from './LogoutButton'
import ListProfile from './ListProfile'

const StyledContainerView = styled.View`
  flex: 1
`

const StyledButtonView = styled.View`
  marginTop: 50
  align-items: center
`

@consume(['session', 'address'])
@requireAuth(({ session }) => session.username)
class Profile extends PureComponent {
  render () {
    return (
      <StyledContainerView>
        <ListProfile />
        <StyledButtonView>
          <LogoutButton />
        </StyledButtonView>
      </StyledContainerView>
    )
  }
}

export default Profile
