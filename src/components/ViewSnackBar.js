/*
import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import { Snackbar, Slide } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const styles = theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
})

const renderMultilineString = (text) => {
  const strs = text.split(/[\r\n]+/g)
  return <>
  {
    strs.map((str, index) => {
      return <div key={index}>{ str }<br/></div> 
    })
  }
  </>
}
const Transition = (props) => {
  return <Slide {...props} direction="left" />
}
const Content = React.forwardRef(
  ({type, message, onClose}, ref) => {
    return <div ref={ ref }>
      { type ? <>
        <Alert elevation={ 6 } onClose={ onClose } severity={ type || "info" }>
          { renderMultilineString(message) }
        </Alert>
      </> : <>
        { renderMultilineString(message) }
      </>}
    </div>
  }
)
class ViewSnackbar extends React.PureComponent{

  handleClose = () => {
    this.props.dispatch(ac.updateAlertSnackbar({enabled: false}))
  }
  
  render() {
    const { common } = this.props

    return (
      <Snackbar
        open={common.alert_snackbar.enabled}
        autoHideDuration={common.alert_snackbar.duration || 6000}
        onClose={this.handleClose}
        TransitionComponent={ Transition }
        key={ Transition.name }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Content type={ common.alert_snackbar.type } message={ common.alert_snackbar.message } onClose={ this.handleClose } />
      </Snackbar>
    )
  }
}

export default connect(state => ({
}))(withStyles(styles)(ViewSnackbar))
*/