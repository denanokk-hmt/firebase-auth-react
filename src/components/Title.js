import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Image from "./Image";
import Text from "./Text";

const useStyles = makeStyles({
  root: {
    margin: '0px 0px 0px',
    padding: '10px',
    background: 'linear-gradient(0deg, #ffffff 30%, #e6e6fa 90%)',
    border: 0,
    borderRadius: 3,
    //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: '#93cadc',
    fontWeight: 500,
    fontSize: '100%',
    height: 'auto',
    width: 'auto',
    textAlign: "center"
  },
});

const Title = ({ title, props, msg}) => {
  //console.log("TITEL PROPS", props)
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <Text text={title} />
      <Image id="logo3" tag="hmt-logo" url={process.env.PUBLIC_URL + "/hmt-log.png"} />
      <Text text={msg} styleClass="message1" />
    </div>
  )
};

Title.propTypes = {
};

export default Title;