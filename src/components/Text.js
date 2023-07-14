import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    margin: '0px 0px 0px',
    padding: '10px',
    background: 'none',
    border: 0,
    borderRadius: 3,
    color: 'lightblue',
    fontSize: '100%',
    height: 20,
    width: 'auto',
    align: "center",
    textAlign: "center"
  },
  message1 : {
    margin: '0px 0px 0px',
    padding: '10px',
    background: 'none',
    border: 0,
    borderRadius: 3,
    color: '#50b6d8',
    fontSize: '100%',
    height: 20,
    width: 'auto',
    align: "center",
    textAlign: "center"
  },
  space: {
    margin: '0px 0px 0px',
    padding: '0px',
    background: 'none',
    border: 0,
    borderRadius: 3,
    color: 'lightblue',
    fontSize: '50%',
    height: 10,
    width: 'auto',
    align: "center",
    textAlign: "center"
  },
});

const Text = ({ text, styleClass="root" }) => {
  //console.log("TEXT::STYLE", style)
  const classes = useStyles();
  return (
    <div className={classes[styleClass]} >
      <div>{text}</div>
    </div>
  )
};

Text.propTypes = {
};

export default Text;