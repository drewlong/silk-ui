import React, { Component } from 'react'

import {
  Container,
  ImageGrid
} from 'silk-ui'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      images: []
    }
  }
  componentDidMount = () => {
    let images = this.importAll(require.context('./img/', false, /\.(png|jpe?g|svg)$/))
    this.setState({images: images})
  }
  importAll = (r) => {
    return r.keys().map(r);
  }
  handleClick = (e) => {
    alert(JSON.stringify(e))
  }
  render () {
    return (
      <Container
        fluid
        direction="column"
        >
      </Container>
    )
  }
}
