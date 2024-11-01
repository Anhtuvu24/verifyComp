import styled from "styled-components";
// @ts-ignore
import { Element } from 'react-scroll';

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
    height: 28px;
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