import styled from "styled-components";
// @ts-ignore
import { Element } from 'react-scroll';

export const ImageContainer = styled.div`
  margin: 10px auto;
  height: auto;
  width: 100%;
  flex: 0 0 auto;
  position: relative;
  user-select: none;
  box-shadow: -5px 0 5px -5px rgb(0 0 0 / 40%), 5px 0 5px -5px rgb(0 0 0 / 40%);

  &:first-of-type {
    margin-top: 72px;
  }
`

export const Image = styled.img`
  height: auto;
  margin: 0 auto;
  width: 100%;
  flex: 0 0 auto;
  position: relative;
  user-select: none;
  box-shadow: -5px 0 5px -5px rgb(0 0 0 / 40%), 5px 0 5px -5px rgb(0 0 0 / 40%);
`

export const ActiveBox = styled(Element)`
  z-index: 98;
  position: absolute;
  border: 1.12381px solid #fade4c;
  background: #fade4c40;
`

export const EditBox = styled.div`
  position: absolute;
  z-index: 98;
  //left: 50%;
  //transform: translateX(-50%);
  transition: 0.2s ease-in-out;
`

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  pointer-events: none;
`

export const EditBoxWrapper = styled.div`
  padding: 8px 10px 8px;
  margin-top: 3px;
  white-space: nowrap;
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #757575;

  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  .ant-form-item-control {
    width: unset !important;
    max-width: 320px;
  }
`

export const EditBoxInput = styled.textarea`
  background: #F5F6F9;
  border-radius: 8px;
  padding: 8px;
  border-style: none;
  color: #212B36;
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  resize: none;
  max-height: 300px;
  /* overflow: hidden; */
  overflow: auto;
  text-align: left;
  box-shadow: none;
  outline: none;
  
  font-size: 12px;
  max-width: 320px;
`

export const EditBoxLabel = styled.div`
  color: #212B36;
  font-size: 12px;
  font-weight: 600;
  margin-top: 6px;
`

export const EditBoxIcons = styled.div``

export const EditBoxIcon = styled.div`
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  margin: 7px 5px 0;
  padding: 0.6em;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #d2d2d2;
    color: #fff;
  }
`

export const EditBoxIconCheck = styled(EditBoxIcon)`
  background-color: #00b4971a;
  color: #00b497;

  &:hover {
    background-color: #00b497;
    color: #fff;
  }
`

export const PassiveBox = styled(Element)`
  z-index: 97;
  position: absolute;
  border: ${props => (props.hiddenBox ? 'transparent solid #fade4c' : '1.12381px solid #fade4c')};
  background: ${props => (props.hiddenBox ? 'transparent' : '#fade4c40')};
`