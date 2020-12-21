import "./App.css";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import RedditCard from "../RedditCard/RedditCard";
import SearchButton from "../Button/Button";
import Loader from "../Loader/Loader";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function App() {
  const classes = useStyles();

  const [redditData, setRedditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("chicago%20illinois");

  useEffect(() => {
    getRedditData();
  }, [search]);

  const getRedditData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://www.reddit.com/search.json?q=${search}`
    );
    const data = await response.json();
    setRedditData(data);
    console.log(redditData);
    setLoading(false);
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const search = e.target.value;
      const adjustedSearch = search.split(" ").join("%20");
      setSearch(adjustedSearch);
    }
  };

  const timeConverter = (utc) => {
    var unixTimestamp = utc;
    var date = new Date(unixTimestamp * 1000);
    return date;
  };

  return (
    <div className="App">
      <div className="nav">
        <Navbar />
      </div>
      <div className="search">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            onKeyDown={keyPress}
            id="outlined-basic"
            label="Reddit"
            variant="outlined"
          />
        </form>{" "}
      </div>
      <div>
        <SearchButton />
      </div>
      <div className="list-container">
        {!loading ? (
          redditData.data.children.map((post) => (
            <div className="c-card">
              <RedditCard
                key={Math.random()}
                cardTitle={post.data.title}
                cardTime={timeConverter(post.data.created_utc).toString()}
                className="r-card"
                imageUrl={post.data.url}
                ratio={post.data.upvote_ratio}
              />
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default App;
