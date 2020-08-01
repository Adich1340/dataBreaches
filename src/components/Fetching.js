import React, {Suspense} from 'react';
import { InfiniteScroll } from 'react-simple-infinite-scroll';
import Post from './Post';


export default class Fetching extends React.Component {
  
  postData;
  
  constructor(props){
    super(props);
    this.state = {
      items: [], 
      isLoading: true,
      cursor: 0,
      hasMore: true
    }
  }
  
  componentDidMount() {
    this.loadMore()
    this.postData = JSON.parse(localStorage.getItem('post'));
    if (localStorage.getItem('post')) {
      this.setState({
          items: this.postData.items,
          isLoading: this.postData.isLoading,
          cursor: this.postData.cursor,
          hasMore: this.postData.hasMore
      })
  } else {
      this.setState({
        items: [], 
        isLoading: true,
        cursor: 0,
        hasMore: true
      })
  }
  }

  componentDidUpdate(nextProps, nextState){
    localStorage.setItem('post', JSON.stringify(nextState));
  }

  loadMore = () => {
    if(this.state.cursor > 262){
      this.setState({hasMore: false});
      console.log("YOU REACHED TO THE END");
      return;
    }

    this.setState({ isLoading: true, error: undefined })
    fetch(`https://guard.io/v2/hiring/fe/breaches?offset=${this.state.cursor}`,
    {headers:{"X-Best-Pokemon":"Pikachu"}})
      .then(res => res.json())
      .then(
        res => {
          this.setState(state => ({
            items: [...state.items, ...res.items],
            cursor: this.state.cursor + 1,
            isLoading: false,
            hasMore: true
          }))
        },
        error => {
          this.setState({ isLoading: false, error })
        }
    )
    console.log(this.state.items)
  }

  render() {
    let id = 0;
    return (
      <div>
        <InfiniteScroll
          throttle={100}
          threshold={10}
          isLoading={this.state.isLoading}
          hasMore={this.state.hasMore}
          onLoadMore={this.loadMore}
        >
          {this.state.items.length > 0
            ? this.state.items.map(item => (
                <Post key={id++} title={item.Title} date={item.BreachDate} logo={item.LogoPath} path={item.Description} />
              ))
            :  <Suspense fallback={<div>loading...</div>}>LOADING...</Suspense>}
        </InfiniteScroll>
      </div>
    )
  }
}

