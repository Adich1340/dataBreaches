import React, { Suspense, useState, useEffect } from 'react';
import Modal from 'react-awesome-modal';
import { InfiniteScroll } from 'react-simple-infinite-scroll';
import Post from './Post';
import { loadPostsAPI } from '../APIs/PostsAPI';


export default function Posts () {
  const [items, setItems ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState(false);

  useEffect(() => {
    const initData = async () => {
      const postDataLS = localStorage.getItem('dbPost');

      await loadPosts();

      if (postDataLS) {
        const parsedData = await JSON.parse(postDataLS);
        setSelectedPost(parsedData);
      }
    }

    initData();
  }, []);

  const loadPosts = async () => {
    if(cursor > 262){
      setHasMore(false);
      console.log("YOU REACHED TO THE END");
      return;

    }

    try {
      setIsLoading(true);

      const data = await loadPostsAPI(cursor);
      const dataParsed = await data.json();
 
      setItems(items => [...items, ...dataParsed.items]);
      setCursor(cursor => cursor + 1);
      setHasMore(true);
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false);
    }
  }

  const onShowPost = post => {
    localStorage.setItem('dbPost', JSON.stringify(post));
    setSelectedPost(post);
  }

  const onHidePost = () => {
    localStorage.setItem('dbPost', false);
    setSelectedPost(false);
  }

 
    return (
      <div>
        <table >
            <thead>
                <th>Title and breach date</th>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <InfiniteScroll
                        throttle={100}
                        threshold={10}
                        isLoading={isLoading}
                        hasMore={hasMore}
                        onLoadMore={loadPosts}
                        >
                        {items.length > 0
                            ? items.map((item, idx) => (
                                <Post key={idx} post={item} onClick={e => onShowPost(item)}/>
                            ))
                            :  <Suspense fallback={<div>loading...</div>}>LOADING...</Suspense>}
                        </InfiniteScroll>
                        <Modal visible={selectedPost} width="400" height="700" effect="fadeInUp" onClickAway={onHidePost}>
                            <div>
                                <h1>Title:</h1><p>{selectedPost.Title}</p>
                                <h4>Description:</h4><p> {selectedPost.Description}</p>
                                <a onClick={onHidePost}>Close</a>
                            </div>
                        </Modal>
                    </td>
                </tr>
            </tbody>
        </table> 
      </div>
    )

}