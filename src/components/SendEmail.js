import React from "react";
import Button from '@material-ui/core/Button';
import { Field } from "redux-form";
import { makeStyles } from '@material-ui/core/styles';
import renderTextField from './renderTextField'

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
});


const SendEmail = ({ props }) => {

  const classes = useStyles();
  const disabled = (props.pristine || props.send_flg)? true : false

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
        <Button className={classes.root} type="submit" disabled={disabled} >Send Email</Button>
      </div>
    </div>
  )
};

SendEmail.propTypes = {
};

export default SendEmail;