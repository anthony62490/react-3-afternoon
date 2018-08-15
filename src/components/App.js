import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component 
{
  constructor() 
  {
    super();

    this.state = 
    {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() 
  {
    axios
      .get(`https://practiceapi.devmountain.com/api/posts`)
      .then((res)=>
      {
        console.log('res received: ', res.data);
        this.setState({ posts: res.data });
      })
      .catch((error)=> console.log("GET componentDidMount().", error));
  }

  updatePost(id, text) 
  {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
      .then( (res)=> this.setState({posts: res.data}) )
      .catch((error)=> console.log("PUT updatePost(id, text)", error));
  }

  deletePost(id) 
  {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then( (res)=> this.setState({posts: res.data}) )
      .catch((error)=> console.log("DELETE deletePost(id)", error));
  }

  createPost(text) 
  {
    axios
      .post("https://practiceapi.devmountain.com/api/posts", {"text": text})
      .then( (res)=> this.setState({ posts: res.data}) )
      .catch((error)=> console.log("POST createPost(text)", error));
  }

  searchFeed(text, list)
  {
    return list.filter( (x)=> (x.includes(text)) );
  }

  render() 
  {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchFeedFn={this.searchFeed}
                list={this.posts}/>

        <section className="App__content">

          <Compose  createPostFn={this.createPost}/>
          
          {
            posts.map((e)=>(
            <Post key={e.id} 
                  text={e.text} 
                  date={e.date}
                  id={e.id}
                  updatePostFn={this.updatePost} 
                  removePostFn={this.deletePost}
                  createPostFn={this.createPost}/>
              )
            ) //map
          }
          
        </section>
      </div>
    ); //return
  }
}

export default App;
