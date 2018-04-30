import React, { Component } from 'react'

const DID_MOUNT = 'componentDidMount'
const SHOULD_UPDATE = 'shouldComponentUpdate'
const DID_UPDATE = 'componentDidUpdate'
const WILL_UNMOUNT = 'componentWillUnmount'

const methodConfig = {
  [DID_MOUNT]: true,
  [SHOULD_UPDATE]: true,
  [DID_UPDATE]: true,
  [WILL_UNMOUNT]: true
}

const colorConfig = {
  [DID_MOUNT]: 'background: #4caf50; color: white;',
  [SHOULD_UPDATE]: 'background: #ff5722; color: white;',
  [DID_UPDATE]: 'background: #039bee; color: white;',
  [WILL_UNMOUNT]: 'background: #795548; color: white;'
}
const boldStyle = 'font-weight: bold;'

const logProps = (config = {}) => Wrapped => {
  const componentName = Wrapped.displayName || Wrapped.name || 'Component'

  if (typeof config === 'string') {
    config = [config]
  }

  const methodFilter = Array.isArray(config)
    ? config.reduce((acc, method) => ({ ...acc, [method]: true }), {})
    : { ...methodConfig, ...config }

  const log = (method, data) => {
    if (methodFilter[method]) {
      console.group(`%c${componentName}: ${method}`, colorConfig[method])
      if (data) {
        Object.entries(data).forEach(([key, val]) => {
          console.log(`%c${key}:`, boldStyle, val)
        })
      }
      console.groupEnd()
    }
  }

  return class extends Component {
    componentDidMount () {
      log(DID_MOUNT, { props: this.props })
    }

    shouldComponentUpdate (nextProps) {
      log(SHOULD_UPDATE, { props: this.props, nextProps })
      return true
    }

    componentDidUpdate (prevProps) {
      log(DID_UPDATE, { props: this.props, prevProps })
    }

    componentWillUnmount () {
      log(WILL_UNMOUNT)
    }

    render () {
      return <Wrapped {...this.props} />
    }
  }
}

const log = (logFn = console.log.bind(console)) => (target, key, descriptor) => {
  const fn = descriptor.value.bind(target)

  descriptor.value = (...args) => {
    logFn(...args)
    return fn(...args)
  }
}

export default logProps
export { log }
