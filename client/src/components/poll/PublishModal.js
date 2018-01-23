import React from 'react';
import Modal from '../shared/Modal';
import styled from 'styled-components';
import moment from 'moment';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import pluralize from 'pluralize';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import { colors } from '../shared/constants';

import 'nouislider/distribute/nouislider.min.css';
import './Slider.css';

class PublishModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 1440
    };
  }

  handleSliderChange = values => {
    this.setState({ minutes: values[0] });
  };

  initSlider = slider => {
    if (!slider) return;

    const { minutes } = this.state;

    noUiSlider.create(slider, {
      behaviour: 'snap',
      start: minutes,
      connect: [true, false],
      tooltips: wNumb({ edit: this.formatTooltip, decimals: 0 }),
      format: wNumb({ decimals: 0 }),
      range: {
        // At 1 minute, step by 5 minute intervals
        min: [15, 5],
        // At 1 hour, step by 3 hour intervals
        '25%': [60, 180],
        // At 1 day, step by 1 day intervals
        '50%': [1440, 1440],
        // At 1 week, step by 3.5 day intervals
        '75%': [10080, 5040],
        // Set max at 1 month
        max: [40320]
      },
      pips: {
        mode: 'steps',
        density: 4,
        stepped: true,
        filter: this.filterSteps,
        format: wNumb({ edit: this.formatPip })
      }
    });

    slider.noUiSlider.on('update', this.handleSliderChange);
  };

  filterSteps(value, type) {
    if (type === 2 || type === 0) {
      return 0;
    } else {
      return 1;
    }
  }

  formatPip(value) {
    var label;
    switch (value) {
      case '15':
        label = '15 min';
        break;
      case '60':
        label = '1 hour';
        break;
      case '1440':
        label = '1 day';
        break;
      case '10080':
        label = '1 week';
        break;
      case '40320':
        label = '1 month';
    }

    return label;
  }

  formatTooltip(value) {
    const minutes = Math.round(value);

    if (minutes < 60) {
      return `${value} minutes`;
    } else if (minutes < 1440) {
      const hours = value / 60;
      return `${hours} ${pluralize('hours', hours)}`;
    } else if (minutes < 10080) {
      const days = minutes / 1440;
      return `${days} ${pluralize('days', days)}`;
    } else if (minutes < 40320) {
      const weeks = minutes / 10080;
      return `${weeks} ${pluralize('weeks', weeks)}`;
    } else {
      return '1 month';
    }
  }

  expirationDate = () => {
    return moment().add(this.state.minutes, 'minutes');
  };

  formatExpirationDate() {
    return this.expirationDate().format('MMMM Do, YYYY [at] h:mma');
  }

  save = () => {
    const { handlePublish } = this.props;
    handlePublish(this.expirationDate());
  };

  render() {
    const { poll, show, handleClose, published } = this.props;

    return (
      <Modal isOpen={show} handleClose={handleClose}>
        {published
          ? <div style={{ textAlign: 'center' }}>
              <h2>The polls are open!</h2>
              <p>
                <strong>Poll title</strong> is now live. Grab the link below to
                share it far and wide
              </p>
              <p>
                <Link to={'/polls/' + poll.slug}>
                  {window.location.origin + '/' + poll.slug}
                </Link>
              </p>
              <Button>
                <Link
                  to={{
                    pathname: '/',
                    state: {
                      message: 'Your poll has been published',
                      type: 'success'
                    }
                  }}
                >
                  Ok
                </Link>
              </Button>
            </div>
          : <div>
              <h3 style={{ textAlign: 'center' }}>
                When should this poll close?
              </h3>
              <SliderWrapper>
                <div ref={this.initSlider} />
              </SliderWrapper>

              <Rule />

              <Expiration>
                Poll will close on {this.formatExpirationDate()}
              </Expiration>

              <PublishButton onClick={this.save}>Publish</PublishButton>
            </div>}
      </Modal>
    );
  }
}

const Expiration = styled.p`
  float: left;
  line-height: 40px;
  color: #333;
  margin: 0;
  font-size: 16px;
`;

const PublishButton = Button.extend`float: right;`;

const Rule = styled.div`
  height: 1px;
  background: ${colors.gray};
  margin: 30px -100px;
`;

const SliderWrapper = styled.div`
  width: 500px;
  margin: 70px auto;
  padding: 0 15px;
`;

export default PublishModal;
