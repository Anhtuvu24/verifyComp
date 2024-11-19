import styled from "styled-components";
// @ts-ignore
import { Element } from 'react-scroll'
import { Select } from 'antd';
// @ts-ignore
export const Datapoint = styled(Element)`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 12px;
  transition: color 0.1s ease-in-out;
  justify-content: flex-start;
  cursor: pointer;
  flex-wrap: wrap;
  /* padding-left: 6px; */
  &:not(:last-child) {
    margin-bottom: 8px;
  }

  .ant-form-item-explain {
    font-size: 12px;
  }
  .sothe-form-item.ant-form-item-has-feedback .ant-form-item-children-icon {
    right: 32px !important;
  }
  .ant-picker {
    font-size: 13px;
    box-shadow: none;
    transition: all 0.1s ease 0s;
    width: 100%;
    /* height: 36px; */
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    font-size: 13px;
    box-shadow: none;
    transition: all 0.1s ease 0s;
    width: 100%;
    /* height: 36px; */
    align-items: center;
  }
  .ant-picker-input > input {
    font-size: 13px;
  }
  .phieulaodong-form-item {
    &.ant-row.ant-form-item {
      display: inline-block;
      margin-bottom: 0;
    }
    .ant-form-item-control-input {
      min-height: auto;
    }
    .ant-checkbox-wrapper {
      font-size: 13px;
      margin-left: 0;
      margin-right: 8px;
    }
  }
`

interface TitleProps {
    required?: boolean;
}

export const Title = styled.div<TitleProps>`
  width: 220px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;

  &:before {
    margin-right: 2px;
    color: ${props => (props.required ? '#ff4d4f' : 'transparent')};
    display: ${props => (props.required ? 'initial' : 'none')};
    content: '*';
  }
`

interface SelectStylesProps {
    borderColor?: string;
}

export const SelectStyles = styled(Select)<SelectStylesProps>`
  .ant-select-selector {
    border-color: ${props => props.borderColor} !important;
  }
`

export const PopoverStyled = styled.div`
  .ant-popover-inner {
    min-width: 200px;
    max-width: 300px;
  }
  .ant-popover-inner-content {
    padding: 4px 0;
  }
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