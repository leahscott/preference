import React from 'react';
import Question from '../shared/Question';

class Poll extends React.Component {
  static questions = [
    'How would you rate Candidate X?',
    'How much does a lightbulb cost?'
  ];

  renderQuestions() {
    return Poll.questions.map((question, index) =>
      <Question question={question} ratingId={index} key={index} />
    );
  }

  render() {
    return (
      <center>
        {this.renderQuestions()}
      </center>
    );
  }
}

export default Poll;
