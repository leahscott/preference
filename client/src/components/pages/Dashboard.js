import React from 'react';
import { connect } from 'react-redux';
import { setDashboard } from '../../actions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.props.setDashboard();
  }

  renderContent() {
    if (this.props.content) {
      return (
        <p>
          {this.props.content}
        </p>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.dashboard.content };
}

export default connect(mapStateToProps, { setDashboard })(Dashboard);
