import React, { Component } from 'react'


export default class NewsItem extends Component {
  

  render() {
    let {title,description,url,id,author,date}=this.props;
    return (
  <div>
  <div className="card" >
    <div style={{display:'flex',justifyContent:'center',position:'absolute',right:'0'}}>
  <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" >
       {"source"}
  </span>  
  </div>
  <img src={url?url:''} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title" >{title?title:"My NEWS"} </h5>
    <p className="card-text">{description?description:"news is a very important part of our life"}</p>
    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString() }</small></p>
    <a href={id} target="blank"  className="btn btn-sm btn-dark" >Read more</a>
  </div>
</div>
</div>
    )
  }
}
