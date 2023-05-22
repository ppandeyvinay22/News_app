import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
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

    async componentDidMount(){
      let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=283a33a4d8b5455a805e3e4c818d73b6&page=1&pageSize=9";
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults})
    }

    handleprevclick = async()=>{
      console.log("prev")
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=283a33a4d8b5455a805e3e4c818d73b6&page=${this.state.page - 1}&pageSize=9`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({articles: parsedData.articles,
        page: this.state.page - 1})
    }
    handlenextclick = async()=>{
      console.log("next")
      if(this.state.page+1 > Math.ceil(this.state.totalArticles/21)){}
      else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=283a33a4d8b5455a805e3e4c818d73b6&page=${this.state.page + 1}&pageSize=9`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles,
          page: this.state.page + 1,})
      }
    }
    render() {
      console.log("render");
      return (
        <div className = "container my-3">
          <h1>Top Headlines</h1>
          <div className="row">
            {this.state.articles.map((element)=>{
              return <div className="col-md-4" key = {element.url}>  
                  <NewsItem title = {element.title?element.title.slice(0,40):""} description = {element.description?element.description.slice(0,80):""} imageUrl = {element.urlToImage?element.urlToImage:"https://images.hindustantimes.com/tech/img/2023/05/20/1600x900/exoplanet_1684604246137_1684604260516.png"} newsUrl={element.url}/>
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&larr; Previous</button>
          <button disabled={this.state.page == Math.ceil(this.state.totalArticles/9)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &rarr;</button>
          </div>
        </div>
    )
  }
}

export default News
