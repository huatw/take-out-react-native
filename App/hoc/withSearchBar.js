import React, { PureComponent } from 'react'
import { SearchBar } from 'react-native-elements'
import styled from 'styled-components'

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1
  marginTop: 20
`

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
      <StyledSafeAreaView>
        <SearchBar value={this.state.search}
                   platform="ios"
                   placeholder={placeholder}
                   autoFocus
                   autoCapitalize="none"
                   containerStyle={{ backgroundColor: 'transparent' }}
                   showLoading={this.state.isLoading}
                   onChangeText={this.changeText}
                   onClear={this.clearText}
                   onCancel={this.cancel}
                   onSubmitEditing={this.submit}
        />
        <Wrapped {...this.props}
                 {...this.state}
        />
      </StyledSafeAreaView>
    )
  }
}

export default withSearchBar
