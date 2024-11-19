import styled from "styled-components";

export const Topbar = styled.div`
  position: absolute;
  width: 100%;
  left: 0px;
  top: 0px;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  padding: 0px 20px;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @-webkit-keyframes blinking_123 {
    0% {
      box-shadow: 0 0 0 2px #fff,0 0 0 4px #EC1C2A;
    }
    50% {
      box-shadow: 0 0 0 2px #fff,0 0 0 4px #d20f1c;
    }
    100% {
      box-shadow: 0 0 0 2px #fff,0 0 0 4px #EC1C2A;
    }
  }

  button.blinking {
    box-shadow: 0 0 0 2px #fff,0 0 0 4px #EC1C2A;
    animation-name: blinking_123;
    animation-duration: 1.75s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
  }
`

export const ControlBar = styled.div`
`

export const ZoomContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
`

interface ZoomButtonProps {
    disabled?: boolean;
}

export const ZoomButton = styled.div<ZoomButtonProps>`
  padding: 9px 13px;
  //cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  cursor: pointer;

  transition: all 0.3s;
  //color: ${props => (props.disabled ? 'rgba(0,0,0,0.34)' : '#000')};
  color: #000;

  &:hover {
    //color: ${props => (props.disabled ? 'rgba(0,0,0,0.34)' : '#EC1C2A')};
    color: #EC1C2A;
  }
`