import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
      country : 'in',
      PageSize: 6,
      category: 'general'
    }
    static propTypes = {
      country : PropTypes.string,
      PageSize: PropTypes.number,
      category: PropTypes.string
    }

    capitalizeFirstLetter = (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        console.log("Hello I am a constructor from news component")
        this.state =
        {
          articles : [],
          loading: true,
          page:1,
          totalArticles : 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Speedy News`
      }
    
    async updateNews()
    {
      this.setState({page : this.state.page + 1}) // must add to increase the page number
      this.props.setprogress(0);
      let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.PageSize}`;
      this.props.setprogress(30);
      let data = await fetch(url);
      let parsedData = await data.json();
      this.props.setprogress(50);
      this.setState({articles: parsedData.articles,
        totalArticles: parsedData.totalResults
      })
      this.props.setprogress(100);
      // console.log("-> Page : ", this.state.page,"\n");
    }
    
    async componentDidMount(){
      this.updateNews();
    }
    
    fetchMoreData = async() => {
      this.setState({page : this.state.page + 1})
      let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.PageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles: this.state.articles.concat(parsedData.articles),
        totalArticles: parsedData.totalResults
      })
      // console.log(this.state.articles.length, this.state.totalArticles,",value :",this.state.articles.length !== this.totalArticles,"\n");
      // console.log("-> Page : ", this.state.page,"\n");
    };
    
    render() {
      console.log("render");
      return (
        <>
          <h1 className='text-center' style = {{margin : '35px 0px'}}>Speedy News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
          {/* {this.state.loading && <Spinner/>}  */}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles} // last scroll to 
          loader={<Spinner/>}
          >
            <div className= "container">
              <div className="row">
                {this.state.articles.map((element)=>{
                  return <div className="col-md-4" key = {element.url}>  
                      <NewsItem title = {element.title?element.title:""} description = {element.description?element.description:""} imageUrl = {element.urlToImage?element.urlToImage:"https://images.hindustantimes.com/tech/img/2023/05/20/1600x900/exoplanet_1684604246137_1684604260516.png"} newsUrl={element.url}  author= {element.author?element.author:"unknown"} date= {element.publishedAt} Source={element.author}/>
                  </div>
                })}
              </div>
            </div>
            
          </InfiniteScroll>
        </>
    )
  }
}

export default News
