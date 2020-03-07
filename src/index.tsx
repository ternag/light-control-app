import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "./index.css";
import "./App.css";
import App from './App';
//import * as serviceWorker from './serviceWorker';

interface person {
  name: string;
  age: number;
}

// function Hi(props:person) {
// return <div>Hello {props.name}! ({props.age} years old)</div>
// }

const Hi = ({ name, age }: person) => (
  <div className="App-header">
    Hello {name}! ({age} years old)
  </div>
);

const MediaCard = ({ title, body, url }: any) => (
  <div className="App-header">
    <h2>{title}</h2>
    <p>{body}</p>
    <img src={url} />
  </div>
);

function Room() {
  const [isLit, setLit] = useState(false);
  const brightness = isLit ? "lit": "dark";
  
  return ( 
  <div className={`App-header ${brightness}`}>
    The room is { isLit ? 'lit':'dark' }.
    <br/>
    <button onClick={() => setLit(!isLit)}>Flip</button>
  </div>
  );
}

function Reddit() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`https://www.reddit.com/r/reactjs.json`)
         .then((res:any) => {
            const newPosts = res.data.data.children.map((obj:any) => obj.data);
            setPosts(newPosts);
          });
      }, []);

  return (
    <div className="App-header">
      <h1>/r/reactjs</h1>
      <ul>
        {posts.map((post:any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// ReactDOM.render(
//   <MediaCard title="Hello" body={<p>Lorem ipsum <strong>sit</strong> dolor amit</p>} url="logo192.png" />,
//   document.querySelector("#root")
// );

// ReactDOM.render(
//   <Hi name={"Terje"} age={51} />,
//   document.querySelector("#root")
// );

ReactDOM.render(
  <App/>,
  document.querySelector("#root")
);

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
