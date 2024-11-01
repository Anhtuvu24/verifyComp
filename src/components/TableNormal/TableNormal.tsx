import { useParams } from "react-router-dom";
import { StringParam, useQueryParams } from "use-query-params";
import React, { useEffect, useState } from "react";
import { Button, Table, Tooltip } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";

function TableNormal({
     isReadOnly,
     focusDatapoints,
     debounced,
     onValidate,
     inputRefs,
     onDatapointKeyDown,
     tableSelect,
     onCloseTable
 }) {
    const dispatch = useDispatch()
    const org_id = useGetOrgId()
    const { folderId: folder_id } = useParams()
    const [query, setQuery] = useQueryParams({
        submissionId: StringParam,
    })
    const { submissionId: submission_id } = query
    const {
        tableId: field_data_id,
        name,
        isSoDoVCB,
        ma_tinh,
    } = tableSelect
    const tableDatapoint = useSelector(state => state.docbase.entities.field_data.all[field_data_id])
    const dataSource = tableDatapoint?.field_data_set || []
    const getFieldDataRequest = useSelector(state => state.docbase.requests.field_data.getFieldData)
    const addFieldRowRequest = useSelector(state => state.docbase.requests.field_data.addFieldRow)
    const deleteFieldRowRequest = useSelector(state => state.docbase.requests.field_data.deleteFieldRow)
    const tableLoading = useLoading([getFieldDataRequest, addFieldRowRequest, deleteFieldRowRequest])

    const [isLoading, setIsLoading] = useState(true)
    const [prevFocusedDocumentId, setPrevFocusedDocumentId] = useState('')
    const [prevFocusedId, setPrevFocusedId] = useState('')
    // const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        // if (!tableDatapoint) return
        // // const { field_data_set } = tableDatapoint
        // // setDataSource(field_data_set)
        // if (isLoading) {
        //     setIsLoading(false)
        // }
    }, [tableDatapoint])

    const onAddRow = () => {
        // dispatch(addFieldRow({ org_id, folder_id, submission_id, parent: field_data_id }))
    }

    const onDeleteRow = (id: String) => {
        // dispatch(deleteFieldRow({ org_id, folder_id, submission_id, field_data_id: id }))
    }

    const onFocusCell = (documentId: String, datapointId: String, activeDatapoint: any) => {
        // dispatch(setActiveFieldData(activeDatapoint))
        // setPrevFocusedDocumentId(documentId)
        // setPrevFocusedId(datapointId)
        // dispatch(setShowActiveBox(true))
    }

    const onMouseDownCell = (datapointId: String) => {
        // if (!isReadOnly && prevFocusedId && prevFocusedId !== datapointId) {
        //     onValidate(prevFocusedDocumentId, prevFocusedId)
        // }
    }

    const renderCell = (data: any, index: any, dataKey: String) => {
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
                />
            )
        }
        if (dataKey === 'gender') {
            return (
                <GenderCellItem
                    datapoint={data[index]}
                    inputCellRefs={inputRefs}
                    isReadOnly={isReadOnly}
                    flatData={focusDatapoints}
                    onFocusCell={onFocusCell}
                    onKeyDownCell={onDatapointKeyDown}
                    onMouseDownCell={onMouseDownCell}
                    debounced={debounced}
                />
            )
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
            />
        )
    }

    const cols = dataSource.length
        ? dataSource[0].field_data_set.map((col: any, index: Number) => {
            const { id, submission_field } = col
            const { name, required, label } = submission_field
            return {
                title: <ColTitle required={required}>{name}</ColTitle>,
                key: id,
                dataIndex: 'field_data_set',
                render: data => renderCell(data, index, label),
            }
        })
        : []

    const columns = isSoDoVCB
        ? [...cols]
        : [
            ...cols,
            {
                title: '',
                key: 'delete',
                render: (_, record) => {
                    if (isReadOnly) {
                        return null
                    }
                    return (
                        <Tooltip title='Xóa hàng'>
                            <DeleteButton onClick={() => onDeleteRow(record.id)}>
                                <MdDelete style={{ fontSize: 16, verticalAlign: 'middle' }} />
                            </DeleteButton>
                        </Tooltip>
                    )
                },
                width: 48,
                fixed: 'right',
            },
        ]

    const reloadTableData = () => {
        dispatch(getFieldData({ org_id, folder_id, submission_id, field_data_id, force: true, type: 'table' }))
    }

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
                <>
                    {isSoDoVCB ? (
                        <SoDoVCBTable dataSource={dataSource} columns={columns} reloadTableData={reloadTableData} ma_tinh={ma_tinh} />
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
                </>
            )}
            {!isReadOnly && !isSoDoVCB && (
                <div >
                    <Button type='dashed' size='small' style={{ height: 26, fontSize: 13 }} onClick={onAddRow}>
                        + Thêm hàng
                    </Button>
                </div>
            )}
        </FooterTable1>
    )
}

export default TableNormal;