import "./App.css";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import RedditCard from "../RedditCard/RedditCard";
import Search from "../Search/Search";
import SearchButton from "../Button/Button";

function App() {
  const [redditData, setRedditData] = useState({});

  useEffect(() => {
    getRedditData();
  }, []);

  const getRedditData = async () => {
    const response = await fetch(`https://www.reddit.com/r/popular.json`);
    const data = await response.json();
    setRedditData(data);
    console.log(data);
    // console.log(redditData.data.children[2].data.title);
  };

  return (
    <div className="App">
      <div className="nav">
        <Navbar />
      </div>
      <div className="search">
        <Search />
      </div>
      <div>
        <SearchButton />
      </div>
      <div className="list-container">
        {redditData.data.children.map((post) => (
          <div className="c-card">
            <RedditCard
              key={post.data.title}
              cardTitle={post.data.title}
              cardTime={post.data.created_utc}
              className="r-card"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
