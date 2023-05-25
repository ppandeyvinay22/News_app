import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

    static defaultProps = {
      country : 'in',
      PageSize: 6,
      category: 'entertainment',
    }
    static propTypes = {
      country : PropTypes.string,
      PageSize: PropTypes.number,
      category: PropTypes.string,
    }
    constructor(){
        super();
        console.log("Hello I am a constructor from news component")
        this.state =
        {
          articles : [],
          loading: false,
          page:1
        }
      }
    
    async updateNews()
    {
      let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=283a33a4d8b5455a805e3e4c818d73b6&page=${this.state.page}&pageSize=${this.props.PageSize}`;
      this.setState({loading : true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults, loading : false})
    }
    
    async componentDidMount(){
      // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=283a33a4d8b5455a805e3e4c818d73b6&page=1&pageSize=${this.props.PageSize}`;
      // this.setState({loading : true})
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults,loading : false})
      this.updateNews();
    }
    
    handleprevclick = async()=>{
      // console.log("prev")
      // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=283a33a4d8b5455a805e3e4c818d73b6&page=${this.state.page - 1}&pageSize=${this.props.PageSize}`;
      // this.setState({loading : true})
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // this.setState({articles: parsedData.articles,page: this.state.page - 1, loading : false})
      this.setState({page: this.state.page - 1})
      this.updateNews();
    }
    
    handlenextclick = async()=>{
      console.log("next")
      // if(!(this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.PageSize)))
      // {
        // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=283a33a4d8b5455a805e3e4c818d73b6&page=${this.state.page + 1}&pageSize=${this.props.PageSize}`;
        // this.setState({loading : true})
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({articles: parsedData.articles,page: this.state.page + 1,loading : false})
        // }
        this.setState({page: this.state.page + 1})
        this.updateNews();
    }
    render() {
      console.log("render");
      return (
        <div className = "container my-3">
          <h1 className='text-center'>Top Headlines</h1>
          {this.state.loading && <Spinner/>}
          <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
              return <div className="col-md-4" key = {element.url}>  
                  <NewsItem title = {element.title?element.title.slice(0,40):""} description = {element.description?element.description.slice(0,80):""} imageUrl = {element.urlToImage?element.urlToImage:"https://images.hindustantimes.com/tech/img/2023/05/20/1600x900/exoplanet_1684604246137_1684604260516.png"} newsUrl={element.url}  author= {element.author?element.author:"unknown"} date= {element.publishedAt} Source={element.author}/>
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.PageSize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &rarr;</button>
          </div>
        </div>
    )
  }
}

export default News