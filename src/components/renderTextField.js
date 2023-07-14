import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    margin: "0px 20px",
    //marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    width: 260,
  },
});

// TextField
const renderTextField = props => {
  //console.log("RENDER_TEXT_FILED:PROPS", props)
  const { input, classes, meta: {touched, error}, ...custom } = props;
  const helperText = (touched && error)? error : ''

  return (
    <div>
      <TextField
        {...input}
        {...custom}
        className={classes.textField}
        helperText={helperText}
      />
    </div>
  );
}

renderTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(renderTextField);