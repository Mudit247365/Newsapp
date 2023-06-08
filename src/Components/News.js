import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  articles = [
    {
      status: "ok",
      totalResults: 38,
      articles: [
        {
          source: {
            id: null,
            name: "Swarajya",
          },
          author: "Swati Goel Sharma",
          title:
            "Ground Report: In Delhi Colony Where Minor Girl Was Stabbed To Death — Love Jihad, Shraddha Murder And The Kerala Story On Everyone's Lips - Swarajya",
          description: null,
          url: "https://swarajyamag.com/reports/ground-report-in-delhi-colony-where-minor-girl-was-stabbed-to-death-love-jihad-shraddha-murder-and-the-kerala-story-on-everyones-lips",
          urlToImage:
            "https://gumlet.assettype.com/swarajya%2F2023-05%2Fe12dcaf0-5198-4dd3-9796-410ae9a300e6%2Fpic_02.png?w=1200&auto=format%2Ccompress&ogImage=true",
          publishedAt: "2023-05-31T11:11:33Z",
          content:
            "In the colony where the killer lived\r\nSaahils family lives in a rented two-room accommodation in Jain Colony of Prahaladpur village that falls under Sector 35 of Rohini area. The colony is about thre… [+6002 chars]",
        },
      ],
    },
  ];

  constructor() {
    super();
    console.log("I am contructor");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults:0
    };
  }

  async componentDidMount(props) {
    console.log("cdn");
    this.props.setProgree(10);
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&apiKey=d6c484537a304060b7932e46ee9c2d8f&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgree(30);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    });
    this.props.setProgree(100);
  }
//  UpdateNews=async ()=>{
//     const url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&apiKey=d275c981d632439fb2c18df7444016ea&pageSize=${this.props.pageSize}`;
//     this.setState({loding:true})
//     let data = await fetch(url);
//     let parseData = await data.json();
//     this.setState({
//       articles: parseData.articles,
//       totalResults: parseData.totalResults,
//       loading: false
//     });
//   }
  
  fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&page=${this.state.page+1}&apiKey=d6c484537a304060b7932e46ee9c2d8f&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false
    })
  };

  render() {
    return (
      <div className="container my-3">
        
        <h1 className="text-centre " style={{ textAlign: "centers" }}>
          News Monkey - Top Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.articles.totalResults}
          loader={<Spinner/>}>
            <div className="container">
        <div className="row">
          
        {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-3">
                  <div>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 50) : ""}
                      description={element.description? element.description.slice(0, 100): ""}
                        url={element.urlToImage}
                        id={element.id}
                      author={element.author ? element.author : "Mudit Gupta"}
                      date={element.publishedAt}


                    />
                  </div>

                </div>
                
              );
            })}
            </div>
          {/* <div className="d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.Previous}
              className="btn btn-dark"
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
                  ? true
                  : false
              }
              type="button"
              onClick={this.Next}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div> */}
          
        </div>
        </InfiniteScroll>
      </div>
    );
  }
}
