import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react'

class AdminIndex extends Component{
  constructor(){
    super()
    this.getOption = this.getOption.bind(this)
  }
  getOption(){
    let a = this.props.blog.map(c=>c.title) || []
    let b = this.props.blog.map(c=>c.view_count) || []
    return {title: {
      text: '阅读数top5'
    },
    tooltip: {},
    legend: {
      data:['阅读量']
    },
    xAxis: {
      data:a
    },
    yAxis: {},
    series: [{
      name: '阅读量',
      type: 'bar',
      data: b
    }]}
  }
  render(){
    return(
      <div>
      <ReactEcharts
        option={this.getOption()}
        style={{height: '350px', width: '100%'}}
        className='react_for_echarts' />
      </div>
    )
  }
}

export default AdminIndex
