import React, {Component} from 'react'
import styles from './container.css'
import colors from '../css/colors.css'

export default class Container extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  collectClasses = () => {
    let classes = []
    classes.push(styles.container)
  }
  render(){
    return(
      <div className={styles.container}>
        {Object.keys(colors).map((key, i) => {
          let k = key
          return(
            <p className={colors[k]}>{k}</p>
          )
        })}
      </div>
    )
  }
}
