import React, { Component } from 'react'

import { connect } from 'react-redux'

import Alert from '@material-ui/lab/Alert'
import { showFeedback } from '../../redux/interactions'
import { feedbackSelector } from '../../redux/selectors'
class FeedbackBar extends Component {

   render() {
    const { feedback, dispatch } = this.props

    const handleClose = () => {
      const feedback = {
        text: '',
        type: '',
        visible: false,
      }

      showFeedback(dispatch, feedback)
    }

    return (
      <div>
        {feedback && feedback.visible && (
          <div>
            <Alert
              variant="filled"
              onClose={handleClose}
              severity={feedback.type}
            >
              {feedback.text}
            </Alert>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    feedback: feedbackSelector(state),
  }
}

export default connect(mapStateToProps)(FeedbackBar)
