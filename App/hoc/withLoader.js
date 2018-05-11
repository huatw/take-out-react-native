import React from 'react'
import styled from 'styled-components'

const StyledActivityIndicator = styled.ActivityIndicator`
  margin-top: 100
`

const withLoader = check => Wrapped => class extends Wrapped {
  static displayName = `withLoader(${Wrapped.displayName || Wrapped.name})`

  componentDidMount () {
    super.componentDidMount && super.componentDidMount()
  }

  render () {
    return check(this.props, this.state)
      ? super.render()
      : <StyledActivityIndicator size="large" />
  }
}

export default withLoader
