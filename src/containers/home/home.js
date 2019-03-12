import React,{Component,Fragment} from 'react'
import MediaQuery from 'react-responsive'
import Banner from '../../components/banner/banner'
import PageMobile from '../page/page-mobile'
import PagePC from '../page/page-pc'


class Home extends Component{
  render(){
    return(
      <Fragment>
          <Banner/>
          <MediaQuery maxWidth={768}>
            <PageMobile history={this.props.history}/>
          </MediaQuery>
          <MediaQuery minWidth={768}>
            <PagePC history={this.props.history}/>
          </MediaQuery>
      </Fragment>
    )
  }
}

export default Home
