import React, { Component, useState, useEffect } from 'react';

const App = () => {
  //state
  const [news, setNews] = useState([]);

  //fetch news

  const fetchNews = () => {
    fetch("http://hn.algolia.com/api/v1/search?query=react")
    .then(result => result.json())
    //.then(data => console.log(data)); //ver la data en consola
    .then(data => setNews(data.hits))
    .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchNews();
  });
  return (
    <div>
      <h2>News</h2>
      {news.map((n, i) => (
        <p key={i}> {n.title} </p>
      ))}
    </div>
  );

};

/** 
//USING REACT HOOKS:

const App = () => {
  //setCount function that will update the count state
  const [count, setCount] = useState(0) 

  //useEffect its a function that takes another as an argument 
  //runs every time theres a change in the state
  useEffect(() => {
    document.title = `Clicked ${count} times`;
  });

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Counter App</h2>
      <button onClick={ increment }>Clicked { count } times </button>
    </div>
  );
};
*/

/**  

//USING CLASS COMPONENTS

class App extends Component  {
  //simple class component
  state = {
      count: 0
  };

  increment = () => {
    this.setState ({
      count: this.state.count + 1
    });
  };

  //lifecycle methods:
  componentDidMount() {
    document.title = `Clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `Clicked ${this.state.count} times`;
  }

  render(){
    return (
    <div>
        <h2>counter app</h2>
        <button onClick = {this.increment}>Clicked {this.state.count} times </button>
    </div>
    );
  }
} 
*/

export default App;
