import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Input, Button } from 'react-native-elements'
import styled from 'styled-components'

import { consume } from '../../stores'

const StyledContainerView = styled.View`
  flex: 1
  align-items: center
`

const StyledFormView = styled.View`
  flex: 1
  width: 90%
  align-items: center
  justify-content: center
`

const StyledButtonView = styled.View`
  flex: 1
  align-items: center
  justify-content: flex-start
`

@consume(
  'session',
  ({ userActions: { update } }) => ({ update })
)
class UpdateProfile extends PureComponent {
  state = {
    isLoading: false,
    value: this.props.session[this.props.navigation.getParam('title')],
    valueError: ''
  }

  checkLength = (key) => {
    return this.state[key].length > 0
  }

  checkInfo = () => {
    const valueError = this.checkLength('value') ? '' : 'length should be larger than 6.'

    this.setState({ valueError })
    return !valueError
  }

  update = async () => {
    if (!this.checkInfo()) {
      return
    }

    const { update, navigation } = this.props
    const { value } = this.state

    this.setState({ isLoading: true })

    try {
      await update({ [navigation.getParam('title')]: value })
      navigation.pop()
    } catch (e) {
      console.log(e)

      this.setState({
        isLoading: false,
        valueError: 'update failed.'
      })
    }
  }

  render () {
    const { navigation } = this.props

    const { value, valueError, isLoading } = this.state

    return (
      <StyledContainerView>
        <StyledFormView>
          <Input placeholder={navigation.getParam('title')}
                 autoFocus
                 autoCapitalize="none"
                 autoCorrect={false}
                 returnKeyType="done"
                 onChangeText={value => this.setState({ value })}
                 value={value}
                 leftIcon={ <Icon name="person" size={25} /> }
                 containerStyle={styles.inputContainer}
                 errorStyle={styles.errorStyle}
                 errorMessage={valueError}
          />
        </StyledFormView>
        <StyledButtonView>
          <Button title="UPDATE"
                  buttonStyle={styles.buttonStyle}
                  titleStyle={styles.buttonTitle}
                  loading={isLoading}
                  disabledStyle={styles.disabledButtonStyle}
                  disabled={isLoading}
                  onPress={this.update}
          />
        </StyledButtonView>
      </StyledContainerView>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10
  },
  errorStyle: {
    textAlign: 'center',
    fontSize: 14
  },
  buttonTitle: {
    fontWeight: 'bold',
    color: 'white'
  },
  buttonStyle: {
    height: 50,
    width: 200,
    backgroundColor: '#000',
    borderRadius: 30
  },
  disabledButtonStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
})
export default UpdateProfile
