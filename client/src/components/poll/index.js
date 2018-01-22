import axios from 'axios';
import Button from '../shared/Button';
import Cookies from 'universal-cookie';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { ChevronRight } from '../shared/icons';
import { clearFix } from 'polished';
import { colors } from '../shared/constants';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Progress from '../shared/Progress';

class MyPolls extends React.Component {
  static propTypes = {
    polls: PropTypes.array
  };

  constructor(props) {
    super(props);
    momentDurationFormatSetup(moment);
    this.state = {
      redirectSlug: null
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      const { state } = this.props.location;
      NotificationManager[state.type](state.message, null, 2000);
    }
  }

  timeRemaining(expirationDate) {
    const diff = moment(expirationDate).diff(moment());
    return moment.duration(diff).format();
  }

  lastUpdated(updatedAt) {
    const diff = moment(updatedAt).diff(moment());
    return moment.duration(Math.abs(diff)).format(this.updatedTemplate);
  }

  updatedTemplate() {
    const duration = this.duration.asMinutes();
    if (duration < 5) {
      return '[just now]';
    } else if (duration < 60) {
      return 'm [minutes ago]';
    } else if (duration < 1440) {
      return 'h [hours] ago';
    } else {
      return null;
    }
  }

  renderResponses(responses) {
    return <Label>{`${responses} ${pluralize('response', responses)}`}</Label>;
  }

  percentRemaining(poll) {
    const totalTime = moment(poll.expirationDate).diff(poll.publishDate);
    const remainingTime = moment(poll.expirationDate).diff(moment());
    const remaining = (totalTime - remainingTime) / totalTime * 100;
    return Math.round(remaining);
  }

  renderStatus = poll => {
    if (poll.status === 'open') {
      return (
        <Status>
          <Progress percent={this.percentRemaining(poll)} />
          <Remaining>
            {this.timeRemaining(poll.expirationDate)} remaining
          </Remaining>
          <Divider />
          {this.renderResponses(poll.ballots.length)}
        </Status>
      );
    } else if (poll.status === 'draft') {
      return (
        <Status>
          <span>Draft</span>
          <Divider />
          <Label>
            Updated {this.lastUpdated(poll.updatedAt)}
          </Label>
        </Status>
      );
    } else {
      return (
        <Status>
          <span>Closed</span>
          <Divider />
          {this.renderResponses(poll.ballots.length)}
        </Status>
      );
    }
  };

  renderPolls = () => {
    const { polls } = this.props;
    return polls.map(poll =>
      <Poll key={poll._id}>
        <Link to={`polls/${poll.slug}/edit`}>
          <PollName>
            {poll.title || 'Untitled'}
          </PollName>
          {this.renderStatus(poll)}
          <ChevronWrapper>
            <ChevronRight fill={colors.gray} />
          </ChevronWrapper>
        </Link>
      </Poll>
    );
  };

  createPoll = () => {
    const cookies = new Cookies();
    axios
      .post('http://localhost:3001/api/polls', {
        token: cookies.get('token')
      })
      .then(res => {
        this.setState({ redirectSlug: res.data.slug });
      });
  };

  render() {
    const { polls } = this.props;
    const { redirectSlug } = this.state;
    return (
      <div>
        {redirectSlug && <Redirect to={`/polls/${redirectSlug}/edit`} />}
        <Header>
          <Title>My Polls</Title>
          <div style={{ float: 'right' }}>
            <Button onClick={this.createPoll}>Create new poll</Button>
          </div>
        </Header>
        <PollList>
          {polls.length ? this.renderPolls() : <h3>No Polls Yet</h3>}
        </PollList>
      </div>
    );
  }
}

const Header = styled.header`${clearFix()};`;

const Title = styled.h2`
  float: left;
  line-height: 38px;
  margin: 0;
`;
const ChevronWrapper = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

const PollName = styled.h3`
  font-size: 1.7em;
  text-transform: capitalize;
`;

const Poll = styled.li`
  list-style-type: none;
  background: ${colors.white};
  border-radius: 4px;
  position: relative;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);

  a {
    display: block;
    padding: 25px 20px;
    color: ${colors.black};
  }

  a:hover {
    text-decoration: none;
  }

  & + & {
    margin-top: 25px;
  }
`;

const PollList = styled.ul`
  padding: 0;
  margin: 30px 0;
`;

const Status = styled.div`
  font-size: 16px;

  span {
    display: inline-block;
    vertical-align: middle;
  }
`;

const Remaining = styled.span`color: ${colors.green};`;

const Label = styled.span`
  color: ${colors.grayDark};
  font-weight: 300;
`;

const Divider = styled.span`
  width: 6px;
  height: 6px;
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  background: ${colors.gray};
  margin: 0 10px;
  line-height: 1;
`;

export default withRouter(MyPolls);
