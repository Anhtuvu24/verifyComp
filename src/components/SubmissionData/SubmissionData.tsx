import React, { useEffect, useState, createRef, useRef, Fragment } from 'react'
import { useDebouncedCallback } from 'use-debounce';

import { Button, Dropdown, Spin, Table, Tooltip } from 'antd';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';

// Components
import CustomSpin from '../CustomSpin';
import TopbarComp from '../TopbarComp';
import RightSidebarMiddleComp from '../RightSidebarMiddleComp';
import TableNormal from "../TableNormal";

// Styles
import {
    DocumentValidationWrapper,
    DocumentValidationContainer,
    Middle,
    RightSidebar,
    DocumentWrapper,
    ZoomWrapper,
    Document,
} from './index.styles';

// Utils
import useRefsArray from "../../utils/useRefsArray";
import useImagesLoaded from "../../utils/useImagesLoadead";
import RenderPageImage from "../RenderPageImage";

const focus = (ref: any) => ref && ref.current && ref.current.focus()

interface SubmissionDataProps {
    submission?: any;
    fields?: any[];
    datapoints?: any;
    images?: any[];
    getSubmissionLoading?: boolean;
    rightLoading?: boolean;
    tableLoading?: boolean;
    onClose?: () => void;
    onAddRow?: (table_id: string) => void;
    onRemoveRow?: (row_id: string) => void;
    onValidateSubmission?: () => void;
    onChangeSubmission?: (type: string) => void;
    onValidateDatapoint?: ({document_id, datapoint_id}: { document_id: string, datapoint_id: string }) => void;
    onUpdateField?: ({ field_data_id, datapoint_id, value }: { field_data_id: string, datapoint_id?: any, value: any }) => void;
}

const SubmissionData: React.FC<SubmissionDataProps> = ({
    submission,
    fields,
    datapoints,
    images,
    getSubmissionLoading,
    rightLoading,
    tableLoading,
    onClose,
    onAddRow,
    onRemoveRow,
    onValidateSubmission,
    onChangeSubmission,
    onValidateDatapoint,
    onUpdateField
}) => {

    const { reviewing_by, documents, name, files } = submission || {};
    const isReadOnly = false;

    const imagesFile = React.useMemo(() => {
        const _imageFiles = images?.map((item) => item.imageFile)
        return _imageFiles
    }, [images]);
    const imagesLoaded = useImagesLoaded(imagesFile);

    // const [fieldDatas, setFieldDatas] = useState(fields || [])
    const [datapointDatas, setDatapointDatas] = useState(datapoints)
    const [activeFieldData, setActiveFieldData] = useState(null)
    const [showActiveBox, setShowActiveBox] = useState(false)
    const [focusDatapoints, setFocusDatapoints] = useState<any[]>([]);
    const [inputRefs] = useRefsArray(focusDatapoints.length);
    const [submitRef] = useState(createRef<HTMLButtonElement>());
    const [submitFocused, setSubmitFocused] = useState(false);

    const bigLoading = !imagesLoaded || getSubmissionLoading;

    const [fieldDataValues, setFieldDataValues] = useState(null)
    const [tableSelect, setTableSelect] = useState<any>(null);

    const [prevFocusedDocumentId, setPrevFocusedDocumentId] = useState('');
    const [prevFocusedId, setPrevFocusedId] = useState('');
    const [ratio, setRatio] = useState(100);
    // const [getOrigin, moreAction] = useMoreAction({ org_id, folder_id, submission_id, files })
    // useEffect(() => {
    //     if (Array.isArray(fields)) {
    //         setFieldDatas(fields)
    //     }
    // }, [fields])

    const onValidate = (document_id: string, datapoint_id: string) => {
        setTimeout(() => {
            if (onValidateDatapoint) {
                onValidateDatapoint({ document_id, datapoint_id })
            }
        }, 400);
    };

    const onTab = (document_id: string, datapoint_id: string, index: number) => {
        if (!isReadOnly) {
            onValidate(document_id, datapoint_id);
        }
        if (index + 1 === inputRefs.length) {
            if (submitRef.current) {
                focus(submitRef)
                setSubmitFocused(true);
                setShowActiveBox(false);
                setActiveFieldData(null);
            } else {
                focus(inputRefs[0])
            }
        }
        for (let i = index + 1; i < inputRefs.length; i++) {
            const element = inputRefs[i];
            if (element.current) {
                focus(element)
                return;
            }
        }
    };

    const onDatapointKeyDown = (e: React.KeyboardEvent, document_id: string, datapoint_id: string, index: number) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            onTab(document_id, datapoint_id, index);
        }
    };

    const onSubmitKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            setSubmitFocused(false);
            focus(inputRefs[0])
        }
    };

    const debounced = useDebouncedCallback((field_data_id: string, value: any) => {
        if (onUpdateField) {
            onUpdateField({ field_data_id, value });
        }
    }, 400);

    const onFocusField = (documentId: string, datapointId: string) => {
        setPrevFocusedDocumentId(documentId);
        setPrevFocusedId(datapointId);
        setShowActiveBox(true);
    };

    const onOpenTable = (data: any) => {
        setTableSelect(data);
    };

    const onCloseTable = () => {
        setTableSelect(null);
    };

    const onChangeFieldDataValue = (datapointId: string, value: any) => {
        setFieldDataValues((prev: any) => {
            return {
                ...prev,
                [datapointId]: {
                    ...prev[datapointId],
                    value: value
                }
            }
        })
    }

    return (
        <>
            <DocumentValidationWrapper>
                <TopbarComp
                    isReadOnly={isReadOnly}
                    // submission={submission}
                    // submissions={submissions}
                    name={name}
                    ratio={ratio}
                    setRatio={setRatio}
                    imagesLoaded={imagesLoaded}
                    // moreAction={moreAction}
                    submitRef={submitRef}
                    submitFocused={submitFocused}
                    onClose={onClose}
                    onValidateSubmission={onValidateSubmission}
                    onChangeSubmission={onChangeSubmission}
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
                                            {/*{getOrigin ? (*/}
                                            {/*    <Fragment>*/}
                                            {/*        {files?.map(file => (*/}
                                            {/*            <FileOrigin key={file.id} id={file.id} />*/}
                                            {/*        ))}*/}
                                            {/*    </Fragment>*/}
                                            {/*) : (*/}
                                            {/*    <Fragment>*/}
                                                {images?.map((image, index) => {
                                                    return (
                                                        <RenderPageImage
                                                            key={image.id}
                                                            tableSelect={tableSelect}
                                                            pageId={image.id}
                                                            image={image}
                                                            activeFieldData={activeFieldData}
                                                            fieldDataValues={fieldDataValues}
                                                            onTab={onTab}
                                                            onChangeFieldDataValue={onChangeFieldDataValue}
                                                            onDatapointKeyDown={onDatapointKeyDown}
                                                            setShowActiveBox={setShowActiveBox}
                                                            showActiveBox={showActiveBox}
                                                            isReadOnly={isReadOnly}
                                                            focusDatapoints={focusDatapoints}
                                                            debounced={debounced}
                                                            ratio={ratio}
                                                            isVerify={false}
                                                        />
                                                    )
                                                })}
                                                {/*</Fragment>*/}
                                            {/*// )}*/}
                                        </Fragment>
                                    )}
                                </Document>
                            </ZoomWrapper>
                        </DocumentWrapper>
                    </Middle>
                    {!tableSelect ? (
                        <RightSidebar>
                            {bigLoading ? (
                                <CustomSpin size={32} />
                            ) : (
                                <RightSidebarMiddleComp
                                    fields={fields}
                                    datapoints={datapointDatas}
                                    submission={submission}
                                    activeFieldData={activeFieldData}
                                    focusDatapoints={focusDatapoints}
                                    fieldDataValues={fieldDataValues}
                                    setDatapoints={setDatapointDatas}
                                    setShowActiveBox={setShowActiveBox}
                                    setActiveFieldData={setActiveFieldData}
                                    setFieldDataValues={setFieldDataValues}
                                    setFocusDatapoints={setFocusDatapoints}
                                    // setFieldDatas={setFieldDatas}
                                    inputRefs={inputRefs}
                                    onDatapointKeyDown={onDatapointKeyDown}
                                    prevFocusedId={prevFocusedId}
                                    onValidate={onValidate}
                                    onOpenTable={onOpenTable}
                                    onUpdateField={onUpdateField}
                                    onChangeFieldDataValue={onChangeFieldDataValue}
                                    prevFocusedDocumentId={prevFocusedDocumentId}
                                    debounced={debounced}
                                    isReadOnly={isReadOnly}
                                    rightLoading={rightLoading}
                                    onFocusField={onFocusField}
                                />
                            )}
                        </RightSidebar>
                    ) : null}
                </DocumentValidationContainer>
                {tableSelect ? (
                    <TableNormal
                        fields={fields}
                        isReadOnly={isReadOnly}
                        tableLoading={tableLoading}
                        activeFieldData={activeFieldData}
                        focusDatapoints={focusDatapoints}
                        debounced={debounced}
                        onValidate={onValidate}
                        onAddRow={onAddRow}
                        onRemoveRow={onRemoveRow}
                        inputRefs={inputRefs}
                        onDatapointKeyDown={onDatapointKeyDown}
                        tableSelect={tableSelect}
                        onCloseTable={onCloseTable}
                        setShowActiveBox={setShowActiveBox}
                        setActiveFieldData={setActiveFieldData}
                        onChangeFieldDataValue={onChangeFieldDataValue}
                    />
                ) : null}
            </DocumentValidationWrapper>
        </>
    )
}

export default React.memo(SubmissionData)
