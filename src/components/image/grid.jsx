import React, { Component } from 'react'
import PropTypes from 'prop-types'
import img_styles from './image.css'
import styles from './imagegrid.css'

export default class Grid extends Component{
  constructor(props){
    super(props)
    this.state = {
      styles: {},
      rowMaxView: 0,
      rowMaxLen: 0,
      rows: [],
      grid_height: 0,
      grid_width: 0,
      img_h: 0,
      img_w: 0,
      margin: 0
    }
  }
  componentDidMount = () => {
    let _styles = {}
    let classes = []
    let img_classes = []

    classes.push(styles.grid)

    this.props.fluid && classes.push(styles.fluid)

    if(this.props.width && this.props.width !== 0){
      _styles.width = this.props.width
    }
    if(this.props.height && this.props.height !== 0){
      _styles.height = this.props.height
    }
    this.setState({
      styles: _styles,
      classes: classes.join(" "),
      rowMaxLen: this.props.rowMaxLen ? this.props.rowMaxLen : 6,
      rowMaxView: this.props.rowMaxLen ? this.props.rowMaxLen : 4
    })
    window.addEventListener('resize', this.getDimensions)
    this.gatherImageEffects()
    let token = setInterval(() => {
      if(this.state.img_h < 1){
        this.getDimensions()
      }else{
        this.createImageGrid()
        clearInterval(token)
      }
    }, 100)
  }
  gatherImageEffects = () => {
    let img_classes = []

    img_classes.push(img_styles.silk_image)
    this.props.imageHover && this.props.imageHover.split(" ").map((fx, i) => {
      if(fx === 'greyscale'){
        img_classes.push(img_styles.greyscale_hov)
      }
      if(fx === 'blur'){
        img_classes.push(img_styles.blur_hov)
      }
      if(fx === 'greyscaleBlur'){
        img_classes.push(img_styles.greyscale_blur_hov)
      }
      if(fx === 'clear'){
        img_classes.push(img_styles.clear)
      }
    })
    this.props.imageEffect && this.props.imageEffect.split(" ").map((fx, i) => {
      if(fx === 'greyscale'){
        img_classes.push(img_styles.greyscale)
      }
      if(fx === 'greyscaleBlur'){
        img_classes.push(img_styles.greyscale_blur)
      }
      if(fx === 'blur'){
        img_classes.push(img_styles.blur)
      }
    })
    this.setState({
      img_classes: img_classes.join(" ")
    })
  }
  createImageGrid = () => {
    let n = this.props.images.length
    let rows = []
    let row = []
    let x = 0
    this.setState({rows: rows})
    this.props.images.map((c, i) => {
      x++
      row.push(c)
      if(x == this.state.rowMaxLen){
        x = 0
        rows.push(row)
        row = []
      }
      return null
    })
    setTimeout(() => {
      this.setState({rows: rows})
    }, 100)
  }
  getDimensions = () => {
    let obj = document.getElementById('silk-grid')
    let w = obj.offsetWidth
    let h = obj.offsetHeight
    let img_w = Math.floor(w / this.props.rowMaxLen)
    let img_h = !this.state.img_h ? Math.floor(h / this.props.rowMaxView) : this.state.img_h
    this.setState({
      grid_width: w,
      grid_height: h,
      img_w: img_w,
      img_h: img_h
    })
  }
  handleImageClick = (e) => {
    if(this.props.imageClicked){
      this.props.imageClicked(e)
    }
  }
  render(){
    return(
      <div
        id="silk-grid"
        className={this.state.classes}
        style={this.state.styles}
        >
        {this.state.rows.map((row, i) => {
          if(this.props.images){
            return(
              <div
                className={styles.grid_row}
                >
              {row.map((s, ind) => {
                let id = `img-r${i}-c${ind}`
                return(
                  <div
                    id={id}
                    className={this.state.img_classes}
                    style={{
                      backgroundImage: `url(${s})`,
                      width: this.state.img_w,
                      height: this.state.img_h,
                    }}
                    onClick={() => {this.handleImageClick(
                      {url: s, id: id}
                    )}}
                    >
                  </div>
                )
              })}
              </div>
            )
          }
        })}
      </div>
    )
  }
}
