import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExpenseGroup extends Component {
  
  async componentWillUpdate(prevProps) {

  }

  async componentDidUpdate(prevProps) {   
  
  }

  render() {        
    return (      
      <h4>{this.props.match.params.contractAddress} placeholder</h4>
    );
  }
}

export default connect()(ExpenseGroup);
