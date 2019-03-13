import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding: 1rem 2rem;

  @media screen and (max-width: 375px) {
    width: 100%;
  }
`;

const Time = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
`;

class OrderTimer extends React.Component {
  state: {
    time: {
      minutes?: string;
      seconds?: string;
    };
    seconds: number;
  };
  props: any;
  timer: any;

  constructor(props: any) {
    super(props);
    this.state = { time: {}, seconds: 60 * 15 };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.props.startTimer(() => {
        this.timer = setInterval(this.countDown, 1000);
      });
    }
    const timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  secondsToTime(secs: number) {
    const minutes: string | number = parseInt(`${secs / 60}`, 10);
    const seconds: string | number = parseInt(`${secs % 60}`, 10);
    return {
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds
    };
  }

  countDown() {
    this.setState((prevState: any) => {
      const seconds = prevState.seconds - 1;
      if (seconds === 0) {
        clearInterval(this.timer);
        this.props.handleExpire();
      }
      return { time: this.secondsToTime(seconds), seconds };
    });
  }

  render() {
    const { time } = this.state;
    return (
      <Container>
        <span>Reservation time:</span>
        <Time>
          {time.minutes}:{time.seconds}
        </Time>
      </Container>
    );
  }
}

export default OrderTimer;
