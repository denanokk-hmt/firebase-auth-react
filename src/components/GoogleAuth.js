import React from "react";
//import PropTypes from "prop-types";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { HelpOutline } from '@material-ui/icons'
import ReactTooltip from 'react-tooltip'

const useStyles = makeStyles({
  root: {
    margin: '20px 10px 10px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    width: 300,
  },
  help: {
    marginTop: '10px',
    fill: 'lightgray',
    position: 'absolute'
  }
});

const GoogleAuth = ({ props }) => {

  const classes = useStyles();

  return (
    <div>
      <Button className={classes.root} onClick={props.googleLogin} >
        LOGIN WITH GOOGLE
      </Button>
      <span className={classes.help} data-tip="Googleアカウント認証を利用して、ログイン">
        <HelpOutline className={classes.help} />
        <ReactTooltip effect="float" type="info" place="right" />
      </span>
    </div>
  )
};

GoogleAuth.propTypes = {
};

export default GoogleAuth;