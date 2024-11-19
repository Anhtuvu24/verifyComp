import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { Button, Table, Tooltip } from "antd";
import { useParams } from 'react-router-dom';
import { StringParam, useQueryParams } from 'use-query-params';

// Components
import DobCellItem from "./DobCellItem";
import GenderCellItem from "./GenderCellItem";
import CellItem from "./CellDatapoint";

// Styles
import { FooterTable, TableWrapper, DeleteButton, ColTitle } from "./index.styles";

interface TableDataProps {
    tableId: string;
    table: any;
    activeFieldData: any;
    fieldDataValues: any;
    isReadOnly: boolean;
    focusDatapoints: any;
    debounced: (field_data_id: string, value: string) => void;
    onValidate: (documentId: string, datapointId: string) => void;
    inputRefs: any;
    onDatapointKeyDown: (e: React.KeyboardEvent, document_id: string, datapoint_id: string, index: number) => void;
    setActiveFieldData: (data: any) => void;
    setShowActiveBox: (type: boolean) => void;
    onChangeFieldDataValue: (datapointId: string, value: any) => void;
    // isSoDoVCB?: boolean;
}

const TableData: React.FC<TableDataProps> = ({
    tableId: field_data_id,
    table,
    activeFieldData,
    fieldDataValues,
    isReadOnly,
    focusDatapoints,
    debounced,
    onValidate,
    inputRefs,
    onDatapointKeyDown,
    setActiveFieldData,
    setShowActiveBox,
    onChangeFieldDataValue,
    // isSoDoVCB,
}) => {
    const tableDatapoint = table;

    // const getFieldDataRequest = useSelector((state: any) => state.docbase.requests.field_data.getFieldData);
    // const addFieldRowRequest = useSelector((state: any) => state.docbase.requests.field_data.addFieldRow);
    // const deleteFieldRowRequest = useSelector((state: any) => state.docbase.requests.field_data.deleteFieldRow);
    // const tableLoading = useLoading([getFieldDataRequest, addFieldRowRequest, deleteFieldRowRequest]);

    const [prevFocusedDocumentId, setPrevFocusedDocumentId] = useState('');
    const [prevFocusedId, setPrevFocusedId] = useState('');
    const [dataSource, setDataSource] = useState<any[]>([]);

    useEffect(() => {
        if (!tableDatapoint) return;
        const { field_data_set } = tableDatapoint;
        setDataSource(field_data_set);
    }, [tableDatapoint]);

    const onAddRow = () => {
        // dispatch(addFieldRow({ org_id, folder_id, submission_id, parent: field_data_id }));
    };

    const onDeleteRow = (id: string) => {
        // dispatch(deleteFieldRow({ org_id, folder_id, submission_id, field_data_id: id }));
    };

    const onFocusCell = (documentId: string, datapointId: string, activeDatapoint: any) => {
        setActiveFieldData(activeDatapoint);
        setPrevFocusedDocumentId(documentId);
        setPrevFocusedId(datapointId);
        setShowActiveBox(true);
    };

    const onMouseDownCell = (datapointId: string) => {
        if (!isReadOnly && prevFocusedId && prevFocusedId !== datapointId) {
            onValidate(prevFocusedDocumentId, prevFocusedId);
        }
    };

    const renderCell = (data: any, index: number, dataKey: string) => {
        if (dataKey === 'dob') {
            return (
                <DobCellItem
                    datapoint={data[index]}
                    fieldDataValues={fieldDataValues}
                    inputCellRefs={inputRefs}
                    isReadOnly={isReadOnly}
                    flatData={focusDatapoints}
                    onFocusCell={onFocusCell}
                    onKeyDownCell={onDatapointKeyDown}
                    onMouseDownCell={onMouseDownCell}
                    debounced={debounced}
                    onChangeFieldDataValue={onChangeFieldDataValue}
                />
            );
        }
        if (dataKey === 'gender') {
            return (
                <GenderCellItem
                    activeFieldData={activeFieldData}
                    fieldDataValues={fieldDataValues}
                    datapoint={data[index]}
                    inputCellRefs={inputRefs}
                    isReadOnly={isReadOnly}
                    flatData={focusDatapoints}
                    onFocusCell={onFocusCell}
                    onKeyDownCell={onDatapointKeyDown}
                    onMouseDownCell={onMouseDownCell}
                    debounced={debounced}
                    onChangeFieldDataValue={onChangeFieldDataValue}
                />
            );
        }
        return (
            <CellItem
                datapoint={data[index]}
                fieldDataValues={fieldDataValues}
                inputCellRefs={inputRefs}
                isReadOnly={isReadOnly}
                flatData={focusDatapoints}
                onFocusCell={onFocusCell}
                onKeyDownCell={onDatapointKeyDown}
                onMouseDownCell={onMouseDownCell}
                debounced={debounced}
                onChangeFieldDataValue={onChangeFieldDataValue}
            />
        );
    };

    const cols = dataSource.length
        ? dataSource[0].field_data_set.map((col: any, index: number) => {
            const { id, submission_field } = col;
            const { name, required, label } = submission_field;
            return {
                title: <ColTitle required={required}>{name}</ColTitle>,
                key: id,
                dataIndex: 'field_data_set',
                render: (data: any) => renderCell(data, index, label),
            };
        })
        : [];

    const columns = [
        ...cols,
        {
            title: '',
            key: 'delete',
            render: (_: any, record: any) => {
                if (isReadOnly) {
                    return null;
                }
                return (
                    <Tooltip title='Xóa hàng'>
                        <DeleteButton onClick={() => onDeleteRow(record.id)}>
                            <MdDelete style={{ fontSize: 16, verticalAlign: 'middle' }} />
                        </DeleteButton>
                    </Tooltip>
                );
            },
            width: 48,
            fixed: 'right',
        },
    ];

    const reloadTableData = () => {
        // dispatch(getFieldData({ org_id, folder_id, submission_id, field_data_id, force: true, type: 'table' }));
    };

    return (
        <FooterTable>
            <TableWrapper>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    rowKey={record => record.id}
                    size='small'
                    scroll={{ y: 200, x: 'max-content' }}
                    // loading={tableLoading}
                    bordered
                />
            </TableWrapper>
            {!isReadOnly && (
                <div style={{ padding: '0 16px 16px' }}>
                    <Button type='dashed' size='small' style={{ height: 26, fontSize: 13 }} onClick={onAddRow}>
                        + Thêm hàng
                    </Button>
                </div>
            )}
        </FooterTable>
    );
};

export default React.memo(TableData);
