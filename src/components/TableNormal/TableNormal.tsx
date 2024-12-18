import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StringParam, useQueryParams } from "use-query-params";
import { Button, Table, Tooltip } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { MdClose, MdDelete } from "react-icons/md";

// Components
import DobCellItem from "./DobCellItem";
import GenderCellItem from "./GenderCellItem";
import CellItem from "./CellDatapoint";

// Styles
import { ColTitle, DeleteButton, FooterTable1, TableLoadingWrapper, TableWrapper } from "./index.styles";

interface TableNormalProps {
    isReadOnly: boolean;
    tableLoading?: boolean;
    activeFieldData: any;
    fields: any;
    focusDatapoints: any;
    debounced: (field_data_id: string, value: string) => void;
    onValidate: (documentId: string, datapointId: string) => void;
    inputRefs: any;
    onDatapointKeyDown: (e: React.KeyboardEvent, document_id: string, datapoint_id: string, index: number) => void;
    tableSelect: any;
    onCloseTable: () => void;
    onAddRow?: (table_id: string) => void;
    onRemoveRow?: (row_id: string) => void;
    setShowActiveBox: (type: boolean) => void;
    setActiveFieldData: (data: any) => void;
    onChangeFieldDataValue: (datapointId: string, value: any) => void;
}

const TableNormal: React.FC<TableNormalProps> = ({
    isReadOnly,
    tableLoading,
    fields,
    activeFieldData,
    focusDatapoints,
    debounced,
    onValidate,
    onAddRow,
    onRemoveRow,
    inputRefs,
    onDatapointKeyDown,
    tableSelect,
    onCloseTable,
    setShowActiveBox,
    setActiveFieldData,
    onChangeFieldDataValue,
}) => {
    const {
        table,
        tableId,
        name,
    } = tableSelect;
    const tableDatapoint = fields?.find((item: any) => item.id === tableId);
    const dataSource = tableDatapoint?.field_data_set || [];

    const [isLoading, setIsLoading] = useState(true);
    // const [prevFocusedDocumentId, setPrevFocusedDocumentId] = useState('');
    // const [prevFocusedId, setPrevFocusedId] = useState('');
    useEffect(() => {
        if (tableDatapoint && isLoading) {
            setIsLoading(false);
        }
    }, [tableDatapoint]);

    const onAddRowF = () => {
        if (onAddRow) {
            onAddRow(tableId)
        }
        // dispatch(addFieldRow({ org_id, folder_id, submission_id, parent: field_data_id }));
    };

    const onDeleteRow = (id: string) => {
        if (onRemoveRow) {
            onRemoveRow(id)
        }
    };

    const onFocusCell = (documentId: string, datapointId: string, activeDatapoint: any) => {
        setActiveFieldData(activeDatapoint);
        // setPrevFocusedDocumentId(documentId);
        // setPrevFocusedId(datapointId);
        setShowActiveBox(true);
    };

    const onMouseDownCell = (datapointId: string) => {
        // if (!isReadOnly && prevFocusedId && prevFocusedId !== datapointId) {
        //     onValidate(prevFocusedDocumentId, prevFocusedId);
        // }
    };

    const renderCell = (data: any, index: number, dataKey: string) => {
        if (dataKey === 'dob') {
            return (
                <DobCellItem
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
        if (dataKey === 'gender') {
            return (
                <GenderCellItem
                    activeFieldData={activeFieldData}
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

    const columns =
        [
            ...cols,
            {
                title: '',
                key: 'delete',
                render: (_: any, record: any) => {
                    if (isReadOnly) {
                        return null;
                    }
                    return (
                        <DeleteButton onClick={() => onDeleteRow(record.id)}>
                            <MdDelete style={{ fontSize: 16, verticalAlign: 'middle' }} />
                        </DeleteButton>
                    );
                },
                width: 48,
                fixed: 'right',
            },
        ];

    return (
        <FooterTable1>
            <div className={'header'}>
                <b>{name}</b>
                <div className={'closeBtn'} onClick={() => onCloseTable()}><MdClose color={'#637381'} fontSize={24} /></div>
            </div>
            {isLoading ? (
                <TableLoadingWrapper>
                    <Loading3QuartersOutlined spin={true} style={{ fontSize: 40, color: '#1847A3' }} />
                </TableLoadingWrapper>
            ) : (
                <TableWrapper>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        rowKey={record => record.id}
                        size='small'
                        scroll={{ y: '100%', x: 'max-content' }}
                        loading={tableLoading}
                        bordered
                    />
                </TableWrapper>
            )}
            {!isReadOnly && (
                <div>
                    <Button type='dashed' size='small' style={{ height: 26, fontSize: 13 }} onClick={onAddRowF}>
                        + Thêm hàng
                    </Button>
                </div>
            )}
        </FooterTable1>
    );
};

export default TableNormal;
