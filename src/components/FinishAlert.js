import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setFinishAlert } from '../redux/actions';
import styled from 'styled-components';
import { SlideInDown } from './Animates';
import { getTimeFormated } from '../utils';
import Cards from '../containers/Cards';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: #0005;
  .alert {
    /* max-width: 12rem; */
    background: #508a88;
    padding: 1.4rem 0.4rem;
    border-radius: 0.2rem;
    text-align: center;
    position: relative;
    animation-fill-mode: both;
    animation: ${SlideInDown} 1s;
    /* animation-delay: 1s; */
    .header {
      text-transform: uppercase;
      font-size: 1.8rem;
      padding-bottom: 1rem;
    }
    .content {
      font-size: 1rem;
      padding-bottom: 1rem;
      display: flex;
      flex-direction: column;
      line-height: 1.2;
      .time {
        padding: 0 0.4rem;
        font-weight: 800;
        font-size: 1.2rem;
      }
      .box {
        margin-top: 1rem;
        max-height: 60vh;
        overflow: scroll;
        position: relative;
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          z-index: 1000;
        }
      }
    }
    .close {
      position: absolute;
      top: -0.6rem;
      right: -0.6rem;
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
      border: 1px solid #fff;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      font-size: 1rem;
      background: #333;
      cursor: pointer;
    }
  }
`;
const FinishAlert = ({ isVisible, setFinishAlert, timeUsed }) => {
  const handleClose = () => {
    setFinishAlert(false);
  };
  useEffect(() => {
    if (isVisible) {
      window.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth'
      });
    }
  }, [isVisible]);
  return isVisible ? (
    <Wrapper>
      <section className="alert">
        <h1 className="header">👍👍👍</h1>
        <p className="content">
          <span>
            <span className="time"> {getTimeFormated(timeUsed)}</span>Greeeeeeeat Job!
          </span>
          <div className="box">
            <div className="mask" />
            <Cards />
          </div>
        </p>
        <div className="close" onClick={handleClose}>
          x
        </div>
      </section>
    </Wrapper>
  ) : null;
};

const mapStateToProps = ({ finishAlert, currTimeUsed }) => {
  return { isVisible: finishAlert, timeUsed: currTimeUsed };
};
const mapDispatchToProps = dispatch => ({
  setFinishAlert: bindActionCreators(setFinishAlert, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishAlert);
