import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: {},
      current: []
    };
    this.calledOnClick = this.calledOnClick.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }
  calledOnClick() {
    axios.get(`https://api.github.com/users?since=XXX`)
      .then(res => {
        const postPerPage = 8,p={};
        let index=1;
        const posts = res.data.slice();
        for(let i=0;i<posts.length;i=i+postPerPage-1){
          p[`page${index}`] = posts.slice(i,postPerPage*index);
          index++;
        }
        console.log(p);
        //console.log(p[page1]);
        this.setState({ posts:p, current:p[`page1`]});
      });
    // fetch("https://api.github.com/users?since=XXX")
      
    //   .then(
    //     (result) => {
    //       this.setState({
    //         isLoaded: true,
    //         posts: result.data
    //       });
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )
  }
  nextPage(e){

  }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
        <button className="btn" onClick={this.calledOnClick}>Clickme</button>
        {this.state.posts && Object.keys(this.state.posts).map((o,i)=> <a href="#" onClick={this.nextPage}><span>Page{i+1}</span></a>)}
          { <ul className="listOfUsers">
            {this.state.current.map(post =>
              <li key={post.id}>
                <span className="userName">{post.login}</span>
                <img src={post.avatar_url}/>
              </li>
            )}
          </ul> }
      </div>
    );
  }
}

export default App;
