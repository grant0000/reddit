import "./App.css";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [redditData, setRedditData] = useState({});

  useEffect(() => {
    getRedditData();
  }, []);

  const getRedditData = async () => {
    const response = await fetch(`https://www.reddit.com/r/popular.json`);
    const data = await response.json();
    setRedditData(data);
    console.log(redditData.data.children[0].data.author);
  };

  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
