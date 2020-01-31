import React, {Component} from 'react'

export default class Image extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render(){
    return(
      <img
        id={this.props.id}
        src={this.props.src}
        className={this.props.className}
        style={{...this.props.style}}
        />
    )
  }
}
