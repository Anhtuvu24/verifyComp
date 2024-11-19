import { Button } from 'antd'
// @ts-ignore
import { Element } from 'react-scroll'
import styled from 'styled-components'

export const DocumentValidationWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

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
`

export const DocumentValidationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-grow: 1;
  max-height: 100%;
  overflow-y: auto;
`

export const LeftSidebar = styled.div`
  width: 116px;
  display: flex;
  flex-direction: column;
  z-index: 100;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;
  padding-top: 0px;
  margin-top: 56px;

  &::-webkit-scrollbar {
    height: 6px;
    width: 6px;
    background: transparent;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #69696999;
    border-radius: 50px;
  }
`

interface MiddleProps {
    isTableSelect?: boolean;
}

export const Middle = styled.div<MiddleProps>`
  //flex: 2;
  display: flex;
  flex-direction: column;
  background: #f5f6f9;
  /* width: calc(100% - 650px); */
  /* margin-top: 50px; */
  position: relative;
  width: ${props => (props.isTableSelect ? '100%' : 'calc(100% / 3 * 2)')}; // docbase v2
`

export const RightSidebar = styled.div`
  /* width: 394px; */
  //flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 100;
  /* margin-top: 56px; */
  width: calc(100% / 3); // docbase v2
`

export const RightSidebarHeader = styled.div`
  padding: 24px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const RightSidebarMiddle = styled(Element)`
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 16px;
  padding-right: 16px;
  margin-left: 16px;
  transition: all 0.5s;

  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    background: transparent;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #69696999;
    border-radius: 50px;
  }

  .ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header {
    padding: 12px 0px;
  }
  .ant-collapse-content > .ant-collapse-content-box {
    /* padding: 16px 0px; */
    padding: 16px 0 16px 16px;
  }
  .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab {
    padding: 4px 8px;
    font-size: 13px;
  }
`

export const Section = styled.div`
  flex: 0 1;
  margin-bottom: 24px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 24px;
  }
`

export const SectionTitle = styled.div`
  font-weight: 500;
  /* padding-left: 6px; */
  /* margin-bottom: 16px; */
`

export const CellDatapoint = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 12px;
  transition: color 0.1s ease-in-out;
  justify-content: flex-start;
  cursor: pointer;
  flex-wrap: wrap;
  position: relative;

  .ant-form-item-control-input {
    min-height: 20px;
  }

  .ant-input {
    font-size: 12px;
    border-left-color: transparent;
    border-bottom-color: transparent;

    &:focus,
    &:hover {
      border-color: #fa464c;
    }
  }

  .ant-picker {
    border-left-color: transparent;
    border-bottom-color: transparent;

    &:focus,
    &:hover {
      border-color: #fa464c;
    }
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    font-size: 12px;
    border-radius: 0;
    height: 28.84px;
    outline: none;
    box-shadow: none !important;

    border-left-color: transparent;
    border-bottom-color: transparent;

    &:focus,
    &:hover {
      border-color: #fa464c;
    }
  }
  .ant-select-arrow {
    right: 18px;
  }
  .ant-picker-input > input {
    font-size: 12px;
  }
  .ant-picker-suffix {
    font-size: 12px;
    margin-right: 6px;
  }
  .ant-select-arrow .anticon:not(.ant-select-suffix) {
    pointer-events: none;
  }
`

export const DocumentWrapper = styled.div`
  flex: 1;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: hidden;
`

export const TableItemWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 24px;
  padding-right: 16px;
  width: 100%;

  .label {
    padding: 6px 8px;
    color: #637381;
    font-size: 12px;
  }

  > div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F5F6F9;
    border-radius: 500px;
    transition: all 0.3s ease-in-out;
    gap: 8px;
    color: #212B36;
    font-size: 12px;
    &:hover {
      cursor: pointer;
      background-color: #D2D2D280;
    }
  }
`

export const ControlBar = styled.div`
  /* height: 40px; */
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 9px 12px;
  z-index: 100;
`

export const ZoomContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 8px rgb(0 0 0 / 4%);
`

export const ZoomWrapper = styled.div`
  flex: 0 1 auto;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding-right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`

export const Document = styled(Element)`
  flex: 1 1 auto;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  position: relative;
  padding-right: 25px;
  padding-left: 25px;
  scroll-behavior: smooth;
  z-index: 1;

  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    background: transparent;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #69696999;
    border-radius: 50px;
  }
`

// export const Document = styled.div`
//   flex: 1 1 auto;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   overflow-y: scroll;
//   position: relative;
//   padding-right: 25px;
//   padding-left: 25px;
//   scroll-behavior: smooth;
//   z-index: 1;

//   &::-webkit-scrollbar {
//     height: 8px;
//     width: 8px;
//     background: transparent;
//   }
//   &::-webkit-scrollbar-corner {
//     background-color: transparent;
//   }
//   &::-webkit-scrollbar-thumb {
//     background-color: #69696999;
//     border-radius: 50px;
//   }
// `;

export const Image = styled.img`
  height: auto;
  margin: 0 auto;
  width: 100%;
  flex: 0 0 auto;
  position: relative;
  user-select: none;
  box-shadow: -5px 0 5px -5px rgb(0 0 0 / 40%), 5px 0 5px -5px rgb(0 0 0 / 40%);
`

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

export const DeleteButton = styled.div`
  width: 24px;
  height: 24px;
  background: transparent;
  /* box-shadow: 0px 1px 2px rgb(0 0 0 / 16%); */
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 1;
  transition: all 0.3s;
  margin: 0 auto;

  &:hover {
    opacity: 1;
  }

  svg {
    transition: all 0.3s;
    color: rgba(0, 0, 0, 0.24);
  }

  svg:hover {
    color: #ff4d4f;
  }
`

export const NoteWrapper = styled.div`
  padding: 16px;
  background: #fff1f0;
  border: 1px solid #ffccc7;
  border-radius: 2px;
  margin: 0 0 16px;

  .title {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
  }
  .note {
    margin-top: 6px;
    color: rgba(0, 0, 0, 0.65);
    max-height: 60px;
    overflow: auto;
  }
`

export const DataBlock = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 4px;
  padding: 16px;
`

export const MoreAction = styled(Button)`
  &.ant-btn {
    width: 40px;
    height: 40px;
    box-shadow: 0px 2px 0px rgb(0 0 0 / 4%);
    border: 0;
    position: absolute;
    right: 24px;
    top: 12px;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`
