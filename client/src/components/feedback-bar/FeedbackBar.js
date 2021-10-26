import React, { Component } from 'react'

import { connect } from 'react-redux'

import Alert from '@material-ui/lab/Alert'
import { showFeedback } from '../../redux/interactions'
import { feedbackSelector } from '../../redux/selectors'
import { errorSelector } from '../../redux/selectors'
import Expire from '../expire/Expire'

class FeedbackBar extends Component {
  async componentDidUpdate(prevProps) {
    const { dispatch } = this.props

    if (this.props.error && prevProps && prevProps.error !== this.props.error) {
      showFeedback(dispatch, {
        text: this.props.error,
        type: 'error',
        visible: true,
      })
    }
  }

  render() {
    const { feedback, dispatch } = this.props

    const handleClose = () => {
      showFeedback(dispatch, {
        visible: false,
      })
    }

    return (
      <div>
        {feedback && feedback.visible && (
          <Expire
            delay={5000}
            onTimeout={handleClose}
          >
            <div>
              <Alert
                variant="filled"
                onClose={handleClose}
                severity={feedback.type}
              >
                {feedback.text}
              </Alert>
            </div>
          </Expire>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    feedback: feedbackSelector(state),
    error: errorSelector(state),
  }
}

export default connect(mapStateToProps)(FeedbackBar)
