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
  const [search, setSearch] = useState("popular");

  useEffect(() => {
    getRedditData();
  }, [search]);

  const getRedditData = async () => {
    const response = await fetch(`https://www.reddit.com/r/${search}.json`);
    const data = await response.json();
    setRedditData(data);
    setLoading(false);
    console.log(data);
    // console.log(redditData.data.children[2].data.title);
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setSearch(e.target.value);
      console.log(search);
    }
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
                cardTime={post.data.created_utc}
                className="r-card"
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
