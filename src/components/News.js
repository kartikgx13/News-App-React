import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps={
     country: "in",
     pageSize: 6,
     category: 'general'
    }

    static propTypes={
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }

    constructor(){
        super();//here we are calling the constructor of superclass
        console.log("This is a constructor")
        this.state={
            articles: [],
            loading: false,
            page: 1 //here to change the page number we have by default set the
            //page no. to one
        }
        //since the articles consists of all the info related to the news
        //so by mentioning them in this.state they become a part of that
        //state so now loading and articles are both part of the state
        //also suppose we want to uniquely identify a news we will do so
        //by using the url attribute of that image
    }

    //inorder to use the fetch API we will use component did mount method
    //which is a lifecycle method which is called after the render method
    //the order in which the methods are called is constructor-->render-->componentdidMount

    async componentDidMount(){
      let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=2c753b6c3c2945dba09ffa11eda505bc&page=1&pageSize=${this.props.pageSize}`//this is the api key for all the current news
      //now we will use fetch api
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({articles: parsedData.articles , totalResults: parsedData.totalResults, loading: false})
    }

    handleNextClick = async ()=>{
      console.log('Next clicked')
      if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

      }
      else{
        let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=2c753b6c3c2945dba09ffa11eda505bc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`//this is the api key for all the current news
        //now we will use fetch api
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
          page : this.state.page + 1,
          articles: parsedData.articles,
          loading: false
        })
      }
      
    }

    handlePrevClick= async ()=>{
      console.log('Previous clicked')
      console.log('Next clicked')
      let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=2c753b6c3c2945dba09ffa11eda505bc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`//this is the api key for all the current news
      //now we will use fetch api
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
        page : this.state.page - 1,
        articles: parsedData.articles,
        loading: false
      })
    }


  render() {
    return (
      <>
      <div className="container my-3">
        <h2 className='text-center'>NewsShortzzz top headlines</h2>
        {this.state.loading && <Spinner/>}
      <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
         return <div className="col-md-4" key={element.url}>
         <NewsItem title={element.title ? element.title.slice(0,45) : ""} description={element.description ? element.description.slice(0,88) : ""} imageUrl={ element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""}/>
         </div>
        })}
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
      </div>
      </div>
      </>
    )
  }
}

export default News