import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const handleClick = (e) => {
  console.log("hello");
};

export default function SearchButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button onClick={handleClick} variant="contained" color="primary">
        Search
      </Button>
    </div>
  );
}
