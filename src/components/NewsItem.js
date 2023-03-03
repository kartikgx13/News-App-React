import React, { Component } from 'react'

export class NewsItem extends Component {
    

  render() {
    let {title,description,imageUrl,newsUrl} = this.props
    //the above concept is called destructuring
    //from the object this.props the above two values are pulled
    //now we can use these two values to change the title and description
    //dynamically
    return (
      <>
      <div className='my-3'>
      <div className="card">
       <img src={imageUrl} className="card-img-top" alt="..."/>
       <div className="card-body">
       <h5 className="card-title">{title}...</h5>
       <p className="card-text">{description}...</p>
       <a href={newsUrl} className="btn btn-sm btn-primary">Read more</a>
       </div>
       </div>
       </div>
      </>
    )
  }
}

export default NewsItem