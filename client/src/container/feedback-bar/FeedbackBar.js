import React, { Component } from 'react'

import { connect } from 'react-redux'

import Alert from '@material-ui/lab/Alert'
import { showFeedback } from '../../redux/interactions'
import { feedbackSelector } from '../../redux/selectors'
import { errorSelector } from '../../redux/selectors'

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
        type: "",
        visible: false
      })
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
    error: errorSelector(state),
  }
}

export default connect(mapStateToProps)(FeedbackBar)
