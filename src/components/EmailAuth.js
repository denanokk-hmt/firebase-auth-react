import React from "react";
import Button from '@material-ui/core/Button';
import { Field } from "redux-form";
import { makeStyles } from '@material-ui/core/styles';
import renderTextField from './renderTextField'
import { HelpOutline } from '@material-ui/icons'
import ReactTooltip from 'react-tooltip'


const useStyles = makeStyles({
  root: {
    margin: '10px 10px 10px',
    padding: '1em 3em',
    background: 'linear-gradient(45deg, #00BFFF 10%, #6495ED 90%)',
    border: 0,
    borderRadius: 3,
    //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    width: 300,
  },
  help: {
    marginTop: '5px',
    fill: 'lightgray',
    position: 'absolute',
  }
});


const EmailAuth = ({ props }) => {

  const classes = useStyles();
  //console.log("EMAIL AUTH::PROPS*****", props)

  const disabled = (!props.pristine && props.valid)? false : true

  return (
    <div>
      <div>
        <Field
          label="Email"
          name="email"
          type="email"
          component={renderTextField}
        />
      </div>
      <div>
        <Field
          label="Password"
          name="password"
          type="password"
          component={renderTextField}
        />
      </div>
      <div>
        <Button className={classes.root} type="submit" disabled={disabled}>
          Login with Email & Pw
        </Button>
        <span className={classes.help} data-tip="Eメールとパスワードで認証して、ログイン" >
          <HelpOutline className={classes.help} />
          <ReactTooltip effect="float" type="info" place="right" />
        </span>
      </div>
    </div>
  )
};

EmailAuth.propTypes = {
};

export default EmailAuth;