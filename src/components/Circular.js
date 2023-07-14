import React from 'react'
import { connect } from 'react-redux'

import { Backdrop, CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  string: {
    color: '#dbdbdb',
  }
})

class Circular extends React.PureComponent{

  render() {

    const open = this.props.props.circulerOpen

    const progressMsg = this.props.props.progressMsg || 'Login...'
    return (
      <div>
        <Backdrop className={this.props.classes.backdrop} open={open}>
          <div>
            <CircularProgress color="inherit" />
              <p className={this.props.classes.string}>{progressMsg}</p>
          </div>
        </Backdrop>
      </div>
    )
  }
}

export default connect(state => ({
}))(withStyles(styles)(Circular))
