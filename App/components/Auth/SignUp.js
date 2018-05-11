import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { Icon, Text, Input, Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
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

@withNavigation
@consume(
  null,
  ({ userActions: { register } }) => ({ register })
)
class SignUp extends PureComponent {
  state = {
    username: '',
    nickname: '',
    password: '',
    usernameError: '',
    passwordError: '',
    nicknameError: '',
    isLoading: false
  }

  checkLength = (key) => {
    return this.state[key].length > 0
  }

  checkInfo = () => {
    const usernameError = this.checkLength('username') ? '' : 'username length should be larger than 6.'
    const nicknameError = this.checkLength('nickname') ? '' : 'nickname length should be larger than 6.'
    const passwordError = this.checkLength('password') ? '' : 'password length should be larger than 6.'

    this.setState({ usernameError, nicknameError, passwordError})
    return !usernameError && !nicknameError && !passwordError
  }

  register = async () => {
    if (!this.checkInfo()) {
      return
    }

    const { register, navigation } = this.props
    const { username, nickname, password } = this.state

    this.setState({ isLoading: true })

    try {
      await register(username, nickname, password)
      navigation.pop()
    }
    catch (e) {
      this.setState({
        isLoading: false,
        passwordError: 'username has been used.'
      })
    }
  }

  render() {
    const {
      username,
      nickname,
      password,
      usernameError,
      passwordError,
      nicknameError,
      isLoading
    } = this.state

    return (
      <StyledContainerView>
        <StyledFormView>
          <Input placeholder="Username"
                 autoCapitalize="none"
                 autoCorrect={false}
                 returnKeyType="next"
                 blurOnSubmit={false}
                 onChangeText={username => this.setState({ username })}
                 value={username}
                 leftIcon={ <Icon name="person" size={25} /> }
                 containerStyle={styles.inputContainerStyle}
                 errorStyle={styles.errorStyle}
                 errorMessage={usernameError}
          />
          <Input placeholder="Nickname"
                 autoCapitalize="none"
                 autoCorrect={false}
                 returnKeyType="next"
                 blurOnSubmit={false}
                 onChangeText={nickname => this.setState({ nickname })}
                 value={nickname}
                 leftIcon={ <Icon name="face" size={25} /> }
                 containerStyle={styles.inputContainerStyle}
                 errorStyle={styles.errorStyle}
                 errorMessage={nicknameError}
          />
          <Input placeholder="Password"
                 autoCapitalize="none"
                 autoCorrect={false}
                 secureTextEntry={true}
                 returnKeyType="done"
                 blurOnSubmit={true}
                 onChangeText={(password) => this.setState({ password })}
                 value={password}
                 leftIcon={<Icon name="lock" size={25} />}
                 containerStyle={styles.inputContainerStyle}
                 errorStyle={styles.errorStyle}
                 errorMessage={passwordError}
          />
        </StyledFormView>
        <StyledButtonView>
          <Button title="SIGN UP"
                  buttonStyle={styles.buttonStyle}
                  titleStyle={styles.titleStyle}
                  loading={isLoading}
                  disabledStyle={styles.disabledButtonStyle}
                  disabled={isLoading}
                  onPress={this.register}
          />
        </StyledButtonView>
      </StyledContainerView>
    )
  }
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginVertical: 10
  },
  errorStyle: {
    textAlign: 'center',
    fontSize: 14
  },
  titleStyle: {
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

export default SignUp
