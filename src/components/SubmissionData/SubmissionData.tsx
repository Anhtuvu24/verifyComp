import React, { useEffect, useState, createRef, useRef, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import {
    useRefsArray,
    useGetPageImages,
    useImagesLoaded,
    useCustomStopwatch,
} from 'src/library/hooks'
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useDebouncedCallback } from 'use-debounce'
import { useDispatch, useSelector } from 'react-redux'
import { validateDatapoint } from 'src/redux/docbase/actions/datapoint'
import {
    DocumentValidationWrapper,
    DocumentValidationContainer,
    Middle,
    RightSidebar,
    DocumentWrapper,
    ZoomWrapper,
    Document,
    ColTitle,
    DeleteButton,
    FooterTable1,
    TableWrapper,
    TableLoadingWrapper
} from './index.styles';
import CustomSpin from '../CustomSpin'
import TopbarComp from './TopbarComp'
import DocumentImages from './DocumentImages'
import { setCurrentDocuments, setShowActiveBox } from 'src/redux/docbase/actions/submission'
import RightSidebarMiddleComp, { SoDoVCBTable, CellItem } from './RightSidebarMiddleComp';
import { StringParam, useQueryParams } from 'use-query-params'
import {
    addFieldRow,
    deleteFieldRow,
    getFieldData,
    setActiveFieldData,
    updateFieldData
} from 'src/redux/docbase/actions/field_data';
import { Button, Dropdown, Spin, Table, Tooltip } from 'antd';
import { MdDelete, MdOutlineMoreHoriz, MdClose } from 'react-icons/md';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons'
import { downloadFile } from 'src/redux/docbase/actions/file'
import FileOrigin from './FileOrigin'
import DobCellItem from 'src/components/DobCellItem';
import GenderCellItem from 'src/components/GenderCellItem';

const focus = ref => ref && ref.current && ref.current.focus()

export default function SubmissionData() {
    const dispatch = useDispatch()
    const org_id = useGetOrgId()
    const [role] = useGetRole()
    const { time, start, reset } = useCustomStopwatch()

    const { folderId: folder_id } = useParams()
    const [query, setQuery] = useQueryParams({
        submissionId: StringParam,
    })
    const { submissionId: submission_id } = query
    const submission = useSelector(state => state.docbase.entities.submission.all[submission_id])
    const { reviewing_by, documents, name, files } = submission || {}
    const currentUserId = useSelector(state => state.docbase.entities.auth.user.id)
    const isReadOnly = role === 'viewer' ? true : reviewing_by ? currentUserId !== reviewing_by.user_id : false

    const images = useGetPageImages(documents)
    const imagesLoaded = useImagesLoaded(images)

    const [focusDatapoints, setFocusDatapoints] = useState([])
    const [inputRefs] = useRefsArray(focusDatapoints.length)
    const [submitRef] = useState(createRef())
    const [submitFocused, setSubmitFocused] = useState(false)

    useEffect(() => {
        if (!submission) return
        const { documents } = submission
        dispatch(setCurrentDocuments(documents))
    }, [submission])

    const getSubmissionRequest = useSelector(state => state.docbase.requests.submission.getSubmission)
    const getSubmissionLoading = useLoading(getSubmissionRequest)
    const bigLoading = getSubmissionLoading || !imagesLoaded

    const [tableSelect, setTableSelect] = useState(null)
    const [prevFocusedDocumentId, setPrevFocusedDocumentId] = useState('')
    const [prevFocusedId, setPrevFocusedId] = useState('')
    const [ratio, setRatio] = useState(100)
    const [getOrigin, moreAction] = useMoreAction({ org_id, folder_id, submission_id, files })

    const onValidate = (document_id, datapoint_id) => {
        setTimeout(() => {
            dispatch(validateDatapoint({ org_id, folder_id, submission_id, document_id, datapoint_id, time }))
            reset()
        }, 400)
    }

    const onTab = (document_id, datapoint_id, index) => {
        if (!isReadOnly) {
            onValidate(document_id, datapoint_id)
        }
        if (index + 1 === inputRefs.length) {
            if (submitRef.current) {
                focus(submitRef)
                setSubmitFocused(true)
                dispatch(setShowActiveBox(false))
                dispatch(setActiveFieldData({}))
            } else {
                focus(inputRefs[0])
            }
        }
        for (let i = index + 1; i < inputRefs.length; i++) {
            const element = inputRefs[i]
            if (element.current) {
                focus(element)
                return
            }
        }
    }

    const onDatapointKeyDown = (e, document_id, datapoint_id, index) => {
        if (e.key === 'Tab') {
            e.preventDefault()
            onTab(document_id, datapoint_id, index)
        }
    }

    const onSubmitKeyDown = e => {
        if (e.key === 'Tab') {
            e.preventDefault()
            setSubmitFocused(false)
            focus(inputRefs[0])
        }
    }

    const debounced = useDebouncedCallback((field_data_id, value) => {
        dispatch(updateFieldData({ org_id, folder_id, submission_id, field_data_id, value }))
    }, 400)

    const onFocusField = (documentId, datapointId) => {
        setPrevFocusedDocumentId(documentId)
        setPrevFocusedId(datapointId)
        dispatch(setShowActiveBox(true))
        start()
    }

    const onOpenTable = (data) => {
        setTableSelect(data)
    }

    const onCloseTable = () => {
        setTableSelect(null)
    }

    return (
        <>
            <DocumentValidationWrapper>
                <TopbarComp
                    isReadOnly={isReadOnly}
                    name={name}
                    ratio={ratio}
                    setRatio={setRatio}
                    imagesLoaded={imagesLoaded}
                    moreAction={moreAction}
                    submitRef={submitRef}
                    submitFocused={submitFocused}
                    onSubmitKeyDown={onSubmitKeyDown}
                />
                <DocumentValidationContainer>
                    <Middle isTableSelect={!!tableSelect}>
                        <DocumentWrapper style={{ marginBottom: 0, transition: 'all 0.3s' }}>
                            <ZoomWrapper>
                                <Document id='document-scroll-container'>
                                    {bigLoading ? (
                                        <CustomSpin size={48} />
                                    ) : (
                                        <Fragment>
                                            {getOrigin ? (
                                                <Fragment>
                                                    {files?.map(file => (
                                                        <FileOrigin key={file.id} id={file.id} />
                                                    ))}
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    {documents?.map((document, index) => {
                                                        return (
                                                            <DocumentImages
                                                                key={document.id}
                                                                document={document}
                                                                tableSelect={tableSelect}
                                                                onTab={onTab}
                                                                onDatapointKeyDown={onDatapointKeyDown}
                                                                isReadOnly={isReadOnly}
                                                                focusDatapoints={focusDatapoints}
                                                                debounced={debounced}
                                                                ratio={ratio}
                                                            />
                                                        )
                                                    })}
                                                </Fragment>
                                            )}
                                        </Fragment>
                                    )}
                                </Document>
                            </ZoomWrapper>
                        </DocumentWrapper>
                    </Middle>
                    {!tableSelect ? (
                        <RightSidebar>
                            {bigLoading ? (
                                <CustomSpin />
                            ) : (
                                <RightSidebarMiddleComp
                                    focusDatapoints={focusDatapoints}
                                    setFocusDatapoints={setFocusDatapoints}
                                    inputRefs={inputRefs}
                                    onDatapointKeyDown={onDatapointKeyDown}
                                    prevFocusedId={prevFocusedId}
                                    onValidate={onValidate}
                                    onOpenTable={onOpenTable}
                                    prevFocusedDocumentId={prevFocusedDocumentId}
                                    debounced={debounced}
                                    isReadOnly={isReadOnly}
                                    onFocusField={onFocusField}
                                />
                            )}
                        </RightSidebar>
                    ) : null}
                </DocumentValidationContainer>
                {tableSelect ? (
                    <TableNormal
                        isReadOnly={isReadOnly}
                        focusDatapoints={focusDatapoints}
                        debounced={debounced}
                        onValidate={onValidate}
                        inputRefs={inputRefs}
                        onDatapointKeyDown={onDatapointKeyDown}
                        tableSelect={tableSelect}
                        onCloseTable={onCloseTable}
                    />
                ) : null}
            </DocumentValidationWrapper>
        </>
    )
}

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
        if (!tableDatapoint) return
        // const { field_data_set } = tableDatapoint
        // setDataSource(field_data_set)
        if (isLoading) {
            setIsLoading(false)
        }
    }, [tableDatapoint])

    const onAddRow = () => {
        dispatch(addFieldRow({ org_id, folder_id, submission_id, parent: field_data_id }))
    }

    const onDeleteRow = id => {
        dispatch(deleteFieldRow({ org_id, folder_id, submission_id, field_data_id: id }))
    }

    const onFocusCell = (documentId, datapointId, activeDatapoint) => {
        dispatch(setActiveFieldData(activeDatapoint))
        setPrevFocusedDocumentId(documentId)
        setPrevFocusedId(datapointId)
        dispatch(setShowActiveBox(true))
    }

    const onMouseDownCell = datapointId => {
        if (!isReadOnly && prevFocusedId && prevFocusedId !== datapointId) {
            onValidate(prevFocusedDocumentId, prevFocusedId)
        }
    }

    const renderCell = (data, index, dataKey) => {
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
        ? dataSource[0].field_data_set.map((col, index) => {
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

export function useMoreAction({ org_id, folder_id, submission_id, files }) {
    const [getOrigin, setGetOrigin] = useState(false)
    const dispatch = useDispatch()

    const onClick = ({ key }) => {
        if (key === '1') {
            setGetOrigin(state => !state)
        }
        if (key === '2') {
            files.forEach(file => {
                dispatch(downloadFile({ org_id, folder_id, submission_id, file }))
            })
        }
    }

    const items = [
        { label: `Xem file ${getOrigin ? 'đã xử lý' : 'gốc'}`, key: '1', icon: <EyeOutlined /> },
        { label: 'Tải file gốc', key: '2', icon: <DownloadOutlined /> },
    ]

    const button = (
        <>
            {files?.length ? (
                <Dropdown menu={{ items, onClick }} placement='bottomRight' trigger={['click']}>
                    <Button type='text'>
                        <MdOutlineMoreHoriz style={{ fontSize: 20 }} />
                    </Button>
                </Dropdown>
            ) : null}
        </>
    )

    return [getOrigin, button]
}
