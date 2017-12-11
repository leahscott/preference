import React from 'react';

class EditPoll extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        Start editing your new poll! <br />
        This is your Poll Id: {match.params.id}
      </div>
    );
  }
}

export default EditPoll;
