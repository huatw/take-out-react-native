import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Input, Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import { consume } from '../../stores'

@withNavigation
@consume(
  null,
  ({ sessionActions: { login } }) => ({ login })
)
class Login extends PureComponent {
  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    isLoading: false
  }

  checkLength = (key) => {
    return this.state[key].length > 0
  }

  checkInfo = () => {
    const usernameError = this.checkLength('username') ? '' : 'username length should be larger than 6.'
    const passwordError = this.checkLength('password') ? '' : 'password length should be larger than 6.'

    this.setState({ usernameError, passwordError })
    return !usernameError && !passwordError
  }

  login = async () => {
    if (!this.checkInfo()) {
      return
    }

    const { login, navigation } = this.props
    const { username, password } = this.state

    this.setState({ isLoading: true })

    try {
      await login(username, password)
      navigation.pop()
    } catch (e) {
      this.setState({
        isLoading: false,
        passwordError: 'incorrect username or password.'
      })
    }
  }

  render() {
    const {
      username,
      password,
      usernameError,
      passwordError,
      isLoading
    } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.form}>
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
        </View>
        <View style={styles.buttonContainer}>
          <Button title="LOG IN"
                  buttonStyle={styles.buttonStyle}
                  titleStyle={styles.titleStyle}
                  loading={isLoading}
                  disabledStyle={styles.disabledButtonStyle}
                  disabled={isLoading}
                  onPress={this.login}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  form: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainerStyle: {
    marginVertical: 10
  },
  errorStyle: {
    textAlign: 'center',
    fontSize: 14
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
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
    backgroundColor: 'rgba(0,0,0,0.2)',
  }
})

export default Login
