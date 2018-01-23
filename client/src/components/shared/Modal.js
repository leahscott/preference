import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { colors } from './constants';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '30px 40px',
    border: 'none',
    background: colors.grayLight
  },
  overlay: {
    zIndex: '10',
    backgroundColor: 'rgba(221, 221, 221, 0.75)'
  }
};

class ModalWrapper extends React.Component {
  render() {
    const { handleClose } = this.props;
    return (
      <Modal style={customStyles} {...this.props}>
        <Close onClick={handleClose} aria-label="Close" role="button">
          &times;
        </Close>
        {this.props.children}
      </Modal>
    );
  }
}

const Close = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #aaa;
  font-size: 2em;
  font-weight: 300;
  line-height: .5;
  padding: 10px;
  cursor: pointer;
`;

export default ModalWrapper;
