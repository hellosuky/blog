import React,{Component} from 'react'
import {Carousel} from 'antd'
import './banner.css'


class Banner extends Component{
  render(){
    return(
      <Carousel autoplay>
        <div><img src={require(`./img/pic1.png`)} alt=""/></div>
        <div><img src={require(`./img/pic2.png`)} alt=""/></div>
        <div><img src={require(`./img/pic3.png`)} alt=""/></div>
      </Carousel>
    )
  }
}

export default Banner
