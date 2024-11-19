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

interface ColTitleProps {
    required?: boolean;
}

export const ColTitle = styled.div<ColTitleProps>`
  &:before {
    margin-right: 2px;
    color: ${props => (props.required ? '#ff4d4f' : 'transparent')};
    display: ${props => (props.required ? 'inline-block' : 'none')};
    content: '*';
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

export const FooterTable = styled.div`
  flex: 0 0 auto;
  display: flex;
  background: #ffffff;
  flex-direction: column;
  bottom: 0;
  width: 100%;
  z-index: 151;
`

export const TableWrapper = styled.div`
  padding: 16px 0;
  flex: 1;
  overflow: auto;
  margin-bottom: 16px;

  .ant-table-wrapper {
    height: 100%;

    .ant-spin-nested-loading {
      height: 100%;

      .ant-spin-container {
        height: 100%;
        display: flex;
        flex-flow: column nowrap;

        .ant-table {
          flex: auto;
          overflow: hidden;

          .ant-table-container {
            height: 100%;
            display: flex;
            flex-flow: column nowrap;

            .ant-table-header {
              flex: none;
            }

            .ant-table-body {
              flex: auto;
              overflow: scroll;
            }
          }
        }
      }
    }
  }

  .ant-table-thead > tr > th {
    font-size: 13px;
  }

  .ant-table-body {
    overflow-y: auto !important;
    /* padding-bottom: 4px; */

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
  }
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: #fff !important;
  }
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td {
    padding: 0;
    border: none;

    &:last-child {
      border-right: 1px solid #f0f0f0;
    }
  }

  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr:last-child > td {
    border-bottom: 1px solid #f0f0f0;
  }
`