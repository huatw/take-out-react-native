import React, { PureComponent } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'

const withSearchBar = (placeholder = 'Search...', cb) => Wrapped =>
class extends PureComponent {
  static displayName = `withSearchBar(${Wrapped.displayName || Wrapped.name})`

  state = {
    isLoading: false,
    search: ''
  }

  submit = () => {
    if (!this.state.search) {
      return
    }

    cb(this.props)(this.state.search)
  }

  changeText = (search) => {
    this.setState({ search })
  }

  clearText = () => {
    this.setState({ search: '' })
  }

  cancel = () => {
    this.props.navigation.pop()
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar value={this.state.search}
                   platform="ios"
                   placeholder={placeholder}
                   autoFocus
                   autoCapitalize="none"
                   containerStyle={styles.containerStyle}
                   showLoading={this.state.isLoading}
                   onChangeText={this.changeText}
                   onClear={this.clearText}
                   onCancel={this.cancel}
                   onSubmitEditing={this.submit}
        />
        <Wrapped {...this.props}
                 {...this.state}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  containerStyle: {
    backgroundColor: 'transparent'
  }
})

export default withSearchBar
