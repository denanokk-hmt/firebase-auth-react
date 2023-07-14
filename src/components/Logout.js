import React from "react";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    margin: '20px 10px 10px',
    background: 'linear-gradient(45deg, #ffd700 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    width: 300,
  },
});

const Logout = ({ props }) => {

  const classes = useStyles();

  //console.log(this.props)
  return (
    <div>
      <Button className={classes.root} onClick={props.logout} >LOGOUT</Button>
    </div>
  )
};

Logout.propTypes = {
};

export default Logout;
