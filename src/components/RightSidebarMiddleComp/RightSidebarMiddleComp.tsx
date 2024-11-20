import React, { useEffect, useState } from 'react';
import { Empty, Collapse } from 'antd';
// @ts-ignore
import { Events, scroller } from 'react-scroll';
import { MdCalendarViewMonth } from "react-icons/md";
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';

// Components
import CustomSpin from '../CustomSpin'
import GenderDatapointItem from "./ChildComps/GenderSourceItem";
import YearPickerDatapointItem from "./ChildComps/YearPickerDatapointItem";
import DatePickerDatapointItem from "./ChildComps/DataPickerDatapointItem";
import DatapointItem from "./ChildComps/DatapointItem";
import TableData from "../TableInSidebar";

// Styles
import { SectionTitle, TableItemWrapper, RightSidebarMiddle } from "../SubmissionData/index.styles";
import {arrayToObject} from "../../utils/helper";

const { Panel } = Collapse

interface RightSidebarMiddleCompProps {
    fields?: any[];
    datapoints: any;
    submission: any;
    fieldDataValues: any;
    activeFieldData: any;
    focusDatapoints: any;
    setShowActiveBox: (type: boolean) => void;
    setActiveFieldData: (data: any) => void;
    setDatapoints: (data: any) => void;
    // setFieldDatas: (data: any) => void;
    setFocusDatapoints: (datapoints: any) => void;
    setFieldDataValues: (temp: any) => void;
    inputRefs: any;
    onDatapointKeyDown: (e: React.KeyboardEvent, document_id: string, datapoint_id: string, index: number) => void;
    prevFocusedId: string;
    onValidate: (documentId: string, datapointId: string) => void;
    prevFocusedDocumentId: string;
    onOpenTable: (tableData: any) => void;
    debounced: (field_data_id: string, value: string | string[]) => void;
    isReadOnly: boolean;
    rightLoading?: boolean;
    onFocusField: (documentId: string, datapointId: string) => void;
    onChangeFieldDataValue: (datapointId: string, value: any) => void;
    onUpdateField?: ({ field_data_id, datapoint_id, value }: { field_data_id: string, datapoint_id: string, value: any }) => void;
}

const RightSidebarMiddleComp: React.FC<RightSidebarMiddleCompProps> = ({
    fields,
    activeFieldData,
    submission,
    fieldDataValues,
    focusDatapoints,
    setDatapoints,
    setActiveFieldData,
    setShowActiveBox,
    setFocusDatapoints,
    setFieldDataValues,
    inputRefs,
    onDatapointKeyDown,
    prevFocusedId,
    onValidate,
    prevFocusedDocumentId,
    onOpenTable,
    debounced,
    isReadOnly,
    rightLoading,
    onFocusField,
    onChangeFieldDataValue,
    onUpdateField,
}) => {
    // const folder = useGetFolder(folder_id);
    // const isBCTD = folder?.submission_type?.url_key_type === 'credit_report';
    // const hasSectionDataList = ['van_ban_phap_quy', 'hop_dong_cho_vay', 'so_do_vcb'].includes(
    //     folder?.submission_type?.url_key_type
    // );
    // const isPhieuLaoDong = folder?.submission_type?.url_key_type === 'laborer_info';
    // const isSoKhaiSinh = folder?.submission_type?.url_key_type?.includes('civil_registration');
    // const isSoKhaiTu = folder?.submission_type?.url_key_type === 'death_certificate';
    // const isSoKetHon = folder?.submission_type?.url_key_type === 'marriage_certificate';
    // const isSoDoVCB = folder?.submission_type?.url_key_type === 'so_do_vcb';
    // const isLabelPrudential = folder?.submission_type?.url_key_type === 'label_prudential';
    // const isPhieuKiemKe = folder?.submission_type?.url_key_type === 'phieu_kiem_ke';
    // const isLabelClaim = folder?.submission_type?.url_key_type === 'label_claim';

    // const fields = useSelector((state: any) => state.docbase.entities.field_data.fields[submission_id]);
    // const ma_tinh = fields?.find((f: any) => f.submission_field?.label === 'ma_tinh')?.value;

    const [activeKey, setActiveKey] = useState<string[]>([]);

    useEffect(() => {
        // dispatch(getSubmissionField({ org_id, folder_id, submission_id }));
        // dispatch(resetValues());
        setActiveFieldData({})
    }, [submission]);

    useEffect(() => {
        if (!fields || !Array.isArray(fields)) return;
        const activeKey = fields
            .filter((item: any) => item.category === 'section' || item.category === 'table')
            .map((item: any) => item.id);
        setActiveKey(activeKey);

        let temp = fields;
        while (temp.find((item: any) => ['section', 'table'].includes(item.category))) {
            temp = temp.flatMap((item: any) =>
                item.category === 'section'
                    ? item.field_data_set
                    : item.category === 'table'
                        ? item.field_data_set.flatMap((row: any) => row.field_data_set)
                        : item
            );
        }

        setFieldDataValues(arrayToObject(temp))
        setDatapoints((prevState: any) => {
            const data = temp.filter((f: any) => f.category !== 'table').flatMap((f: any) => (f.data_source ? f.data_source : []));
            return data
        })
        setFocusDatapoints(temp);
    }, [fields]);

    useEffect(() => {
        if (!fields) return;
        // @ts-ignore
        focus(inputRefs[0]);
    }, [fields, inputRefs]);

    const scrollToRightContainer = (dataId: string) => {
        let goToContainer = new Promise((resolve, reject) => {
            Events.scrollEvent.register('begin', () => {
                // @ts-ignore
                resolve();
                Events.scrollEvent.remove('begin');
            });

            scroller.scrollTo('scroll-container', {
                duration: 0,
                delay: 0,
                smooth: 'easeInOutQuart',
                ignoreCancelEvents: true,
            });
        });

        goToContainer.then(() =>
            scroller.scrollTo(`datapoint-${dataId}`, {
                duration: 500,
                delay: 0,
                smooth: 'easeInOutQuart',
                containerId: 'scroll-container',
                ignoreCancelEvents: true,
                offset: -300,
            })
        );
    };

    const scrollToDocumentContainer = (datapointId: string) => {
        let goToContainer = new Promise((resolve, reject) => {
            Events.scrollEvent.register('end', () => {
                // @ts-ignore
                resolve();
                Events.scrollEvent.remove('end');
            });

            scroller.scrollTo('document-scroll-container', {
                duration: 0,
                delay: 0,
                smooth: 'easeInOutQuart',
            });
        });

        goToContainer.then(() =>
            scroller.scrollTo(`active-box-${datapointId}`, {
                duration: 500,
                delay: 0,
                smooth: 'easeInOutQuart',
                containerId: 'document-scroll-container',
                offset: -300,
            })
        );
    };

    const onFocusDatapoint = (documentId: string, datapointId: string, activeDatapoint: any) => {
        setActiveFieldData(activeDatapoint);
        setShowActiveBox(true)
        onFocusField(documentId, datapointId);
        // setFieldDataValue(activeDatapoint.value)
        // if (!isLabelPrudential) {
        scrollToRightContainer(activeDatapoint.field_data_id);
        scrollToDocumentContainer(datapointId);
        // }
    };

    const onMouseDownDatapoint = (datapointId: string) => {
        if (!isReadOnly && prevFocusedId && prevFocusedId !== datapointId) {
            onValidate(prevFocusedDocumentId, prevFocusedId);
        }
    };

    const onMapData = (field_data_id: string, datapoint_id: string) => {
        if (onUpdateField) {
            onUpdateField({field_data_id, datapoint_id, value: null})
        }
    };

    return (
        <>
            {rightLoading ? (
                <CustomSpin size={32} />
            ) : (
                <>
                    {fields ? (
                        <>
                            <RightSidebarMiddle id='scroll-container'>
                                <Collapse ghost activeKey={activeKey} onChange={key => setActiveKey(key)}>
                                    {Array.isArray(fields) && fields
                                        .filter((f: any) => f.submission_field?.label !== 'ma_tinh')
                                        .map((f: any) => {
                                            const { id, category } = f
                                            if (category === 'section') {
                                                // if (isPhieuLaoDong) {
                                                //     return (
                                                //         <SectionCheckbox
                                                //             key={id}
                                                //             datapoint={f}
                                                //             inputRefs={inputRefs}
                                                //             isReadOnly={isReadOnly}
                                                //             focusDatapoints={focusDatapoints}
                                                //             onDatapointKeyDown={onDatapointKeyDown}
                                                //             onFocusDatapoint={onFocusDatapoint}
                                                //             debounced={debounced}
                                                //             onMapData={onMapData}
                                                //             onMouseDownDatapoint={onMouseDownDatapoint}
                                                //         />
                                                //     )
                                                // }
                                                return (
                                                    <Panel header={<SectionTitle>{f.submission_field.name}</SectionTitle>} key={id}>
                                                        {f.field_data_set.map((datapoint: any) => {
                                                            if (datapoint.submission_field.label === 'gender') {
                                                                return (
                                                                    <GenderDatapointItem
                                                                        key={datapoint.id}
                                                                        datapoint={datapoint}
                                                                        activeFieldData={activeFieldData}
                                                                        fieldDataValues={fieldDataValues}
                                                                        inputRefs={inputRefs}
                                                                        isReadOnly={isReadOnly}
                                                                        focusDatapoints={focusDatapoints}
                                                                        onDatapointKeyDown={onDatapointKeyDown}
                                                                        onFocusDatapoint={onFocusDatapoint}
                                                                        debounced={debounced}
                                                                        onMapData={onMapData}
                                                                        onMouseDownDatapoint={onMouseDownDatapoint}
                                                                        onChangeFieldDataValue={onChangeFieldDataValue}
                                                                    />
                                                                )
                                                            }
                                                            if (
                                                                datapoint.submission_field.label === 'father_dob' ||
                                                                datapoint.submission_field.label === 'mother_birth_year' ||
                                                                datapoint.submission_field.label === 'graduation_year'
                                                            ) {
                                                                return (
                                                                    <YearPickerDatapointItem
                                                                        key={datapoint.id}
                                                                        datapoint={datapoint}
                                                                        activeFieldData={activeFieldData}
                                                                        fieldDataValues={fieldDataValues}
                                                                        inputRefs={inputRefs}
                                                                        isReadOnly={isReadOnly}
                                                                        focusDatapoints={focusDatapoints}
                                                                        onDatapointKeyDown={onDatapointKeyDown}
                                                                        onFocusDatapoint={onFocusDatapoint}
                                                                        debounced={debounced}
                                                                        onMapData={onMapData}
                                                                        onMouseDownDatapoint={onMouseDownDatapoint}
                                                                        onChangeFieldDataValue={onChangeFieldDataValue}
                                                                    />
                                                                )
                                                            }
                                                            if (datapoint.submission_field.data_type === 'date') {
                                                                return (
                                                                    <DatePickerDatapointItem
                                                                        key={datapoint.id}
                                                                        datapoint={datapoint}
                                                                        activeFieldData={activeFieldData}
                                                                        fieldDataValues={fieldDataValues}
                                                                        inputRefs={inputRefs}
                                                                        isReadOnly={isReadOnly}
                                                                        focusDatapoints={focusDatapoints}
                                                                        onDatapointKeyDown={onDatapointKeyDown}
                                                                        onFocusDatapoint={onFocusDatapoint}
                                                                        debounced={debounced}
                                                                        onMapData={onMapData}
                                                                        onMouseDownDatapoint={onMouseDownDatapoint}
                                                                        onChangeFieldDataValue={onChangeFieldDataValue}
                                                                    />
                                                                )
                                                            }
                                                            if (datapoint.category === 'section') {
                                                                return (
                                                                    <Collapse
                                                                        ghost
                                                                        defaultActiveKey={datapoint.id}
                                                                    >
                                                                        <Panel header={<div style={{ fontSize: 12 }}>{datapoint.value}</div>} key={datapoint.id}>
                                                                            {datapoint.field_data_set.map((child: any) => {
                                                                                if (child.category === 'section') {
                                                                                    return (
                                                                                        <Collapse
                                                                                            ghost
                                                                                            defaultActiveKey={child.id}
                                                                                        >
                                                                                            <Panel
                                                                                                header={
                                                                                                    <div style={{ fontSize: 12 }}>{child.submission_field.name}</div>
                                                                                                }
                                                                                                key={child.id}
                                                                                            >
                                                                                                {child.field_data_set.map((smallChild: any) => {
                                                                                                    if (smallChild.category === 'section') {
                                                                                                        return (
                                                                                                            <Collapse
                                                                                                                ghost
                                                                                                                defaultActiveKey={smallChild.id}
                                                                                                            >
                                                                                                                <Panel
                                                                                                                    header={
                                                                                                                        <div style={{ fontSize: 12 }}>{smallChild.value}</div>
                                                                                                                    }
                                                                                                                    key={smallChild.id}
                                                                                                                >
                                                                                                                    {smallChild.field_data_set.map((xsChild: any) => {
                                                                                                                        return (
                                                                                                                            <DatapointItem
                                                                                                                                key={xsChild.id}
                                                                                                                                datapoint={xsChild}
                                                                                                                                activeFieldData={activeFieldData}
                                                                                                                                fieldDataValues={fieldDataValues}
                                                                                                                                inputRefs={inputRefs}
                                                                                                                                isReadOnly={isReadOnly}
                                                                                                                                focusDatapoints={focusDatapoints}
                                                                                                                                onDatapointKeyDown={onDatapointKeyDown}
                                                                                                                                onFocusDatapoint={onFocusDatapoint}
                                                                                                                                debounced={debounced}
                                                                                                                                onMapData={onMapData}
                                                                                                                                onMouseDownDatapoint={onMouseDownDatapoint}
                                                                                                                                onChangeFieldDataValue={onChangeFieldDataValue}
                                                                                                                            />
                                                                                                                        )
                                                                                                                    })}
                                                                                                                </Panel>
                                                                                                            </Collapse>
                                                                                                        )
                                                                                                    }
                                                                                                    if (smallChild.category === 'table')
                                                                                                        return (
                                                                                                            <Collapse
                                                                                                                ghost
                                                                                                                defaultActiveKey={smallChild.id}
                                                                                                            >
                                                                                                                <Panel header={<div style={{ fontSize: 12 }}>{smallChild.submission_field.name}</div>} key={smallChild.id}>
                                                                                                                    {/*<TableData*/}
                                                                                                                    {/*    tableId={smallChild.id}*/}
                                                                                                                    {/*    activeFieldData={activeFieldData}*/}
                                                                                                                    {/*    fieldDataValues={fieldDataValues}*/}
                                                                                                                    {/*    table={smallChild}*/}
                                                                                                                    {/*    isReadOnly={isReadOnly}*/}
                                                                                                                    {/*    focusDatapoints={focusDatapoints}*/}
                                                                                                                    {/*    debounced={debounced}*/}
                                                                                                                    {/*    onValidate={onValidate}*/}
                                                                                                                    {/*    inputRefs={inputRefs}*/}
                                                                                                                    {/*    setActiveFieldData={setActiveFieldData}*/}
                                                                                                                    {/*    setShowActiveBox={setShowActiveBox}*/}
                                                                                                                    {/*    onDatapointKeyDown={onDatapointKeyDown}*/}
                                                                                                                    {/*    onChangeFieldDataValue={onChangeFieldDataValue}*/}
                                                                                                                    {/*/>*/}
                                                                                                                    <TableItemWrapper>
                                                                                                                        <p className={'label'}>{smallChild.submission_field.name || ''}</p>
                                                                                                                        <div
                                                                                                                            onClick={() => {
                                                                                                                                // @ts-ignore
                                                                                                                                onOpenTable({
                                                                                                                                    table: smallChild,
                                                                                                                                    tableId: smallChild.id,
                                                                                                                                    name: smallChild.submission_field.name || '',
                                                                                                                                })}}
                                                                                                                        >
                                                                                                                            {smallChild.field_data_set?.length || 0}<MdCalendarViewMonth fontSize={24} color={'#637381'}/>
                                                                                                                        </div>
                                                                                                                    </TableItemWrapper>
                                                                                                                </Panel>
                                                                                                            </Collapse>
                                                                                                        )

                                                                                                    return (
                                                                                                        <DatapointItem
                                                                                                            key={smallChild.id}
                                                                                                            datapoint={smallChild}
                                                                                                            activeFieldData={activeFieldData}
                                                                                                            fieldDataValues={fieldDataValues}
                                                                                                            inputRefs={inputRefs}
                                                                                                            isReadOnly={isReadOnly}
                                                                                                            focusDatapoints={focusDatapoints}
                                                                                                            onDatapointKeyDown={onDatapointKeyDown}
                                                                                                            onFocusDatapoint={onFocusDatapoint}
                                                                                                            debounced={debounced}
                                                                                                            onMapData={onMapData}
                                                                                                            onMouseDownDatapoint={onMouseDownDatapoint}
                                                                                                            onChangeFieldDataValue={onChangeFieldDataValue}
                                                                                                        />)
                                                                                                })}
                                                                                            </Panel>
                                                                                        </Collapse>
                                                                                    )
                                                                                }
                                                                                if (child.category === 'table') {
                                                                                    return (
                                                                                        <Collapse
                                                                                            ghost
                                                                                            defaultActiveKey={child.id}
                                                                                        >
                                                                                            <Panel header={<div style={{ fontSize: 12 }}>{child.submission_field.name}</div>} key={child.id}>
                                                                                                {/*<TableData*/}
                                                                                                {/*    tableId={child.id}*/}
                                                                                                {/*    activeFieldData={activeFieldData}*/}
                                                                                                {/*    fieldDataValues={fieldDataValues}*/}
                                                                                                {/*    table={child}*/}
                                                                                                {/*    isReadOnly={isReadOnly}*/}
                                                                                                {/*    focusDatapoints={focusDatapoints}*/}
                                                                                                {/*    debounced={debounced}*/}
                                                                                                {/*    onValidate={onValidate}*/}
                                                                                                {/*    inputRefs={inputRefs}*/}
                                                                                                {/*    setActiveFieldData={setActiveFieldData}*/}
                                                                                                {/*    setShowActiveBox={setShowActiveBox}*/}
                                                                                                {/*    onDatapointKeyDown={onDatapointKeyDown}*/}
                                                                                                {/*    onChangeFieldDataValue={onChangeFieldDataValue}*/}
                                                                                                {/*/>*/}
                                                                                                <TableItemWrapper>
                                                                                                    <p className={'label'}>{child.submission_field.name || ''}</p>
                                                                                                    <div
                                                                                                        onClick={() => {
                                                                                                            // @ts-ignore
                                                                                                            onOpenTable({
                                                                                                                table: child,
                                                                                                                tableId: child.id,
                                                                                                                name: child.submission_field.name || '',
                                                                                                            })}}
                                                                                                    >
                                                                                                        {child.field_data_set?.length || 0}<MdCalendarViewMonth fontSize={24} color={'#637381'}/>
                                                                                                    </div>
                                                                                                </TableItemWrapper>
                                                                                            </Panel>
                                                                                        </Collapse>
                                                                                    )
                                                                                }

                                                                                return (
                                                                                    <DatapointItem
                                                                                        key={child.id}
                                                                                        datapoint={child}
                                                                                        activeFieldData={activeFieldData}
                                                                                        fieldDataValues={fieldDataValues}
                                                                                        inputRefs={inputRefs}
                                                                                        isReadOnly={isReadOnly}
                                                                                        focusDatapoints={focusDatapoints}
                                                                                        onDatapointKeyDown={onDatapointKeyDown}
                                                                                        onFocusDatapoint={onFocusDatapoint}
                                                                                        debounced={debounced}
                                                                                        onMapData={onMapData}
                                                                                        onMouseDownDatapoint={onMouseDownDatapoint}
                                                                                        onChangeFieldDataValue={onChangeFieldDataValue}
                                                                                    />
                                                                                )
                                                                            })}
                                                                        </Panel>
                                                                    </Collapse>
                                                                )
                                                            }

                                                            if (datapoint.category === 'table') {
                                                                return (
                                                                    <Collapse
                                                                        ghost
                                                                        defaultActiveKey={datapoint.id}
                                                                    >
                                                                        <Panel header={<div style={{ fontSize: 12 }}>{datapoint.submission_field.name}</div>} key={datapoint.id}>
                                                                            {/*<TableData*/}
                                                                            {/*    tableId={datapoint.id}*/}
                                                                            {/*    activeFieldData={activeFieldData}*/}
                                                                            {/*    fieldDataValues={fieldDataValues}*/}
                                                                            {/*    table={datapoint}*/}
                                                                            {/*    isReadOnly={isReadOnly}*/}
                                                                            {/*    focusDatapoints={focusDatapoints}*/}
                                                                            {/*    debounced={debounced}*/}
                                                                            {/*    onValidate={onValidate}*/}
                                                                            {/*    inputRefs={inputRefs}*/}
                                                                            {/*    setActiveFieldData={setActiveFieldData}*/}
                                                                            {/*    setShowActiveBox={setShowActiveBox}*/}
                                                                            {/*    onDatapointKeyDown={onDatapointKeyDown}*/}
                                                                            {/*    onChangeFieldDataValue={onChangeFieldDataValue}*/}
                                                                            {/*/>*/}
                                                                            <TableItemWrapper>
                                                                                <p className={'label'}>{datapoint.submission_field.name || ''}</p>
                                                                                <div
                                                                                    onClick={() => {
                                                                                        // @ts-ignore
                                                                                        onOpenTable({
                                                                                            table: datapoint,
                                                                                            tableId: datapoint.id,
                                                                                            name: datapoint.submission_field.name || '',
                                                                                        })}}
                                                                                >
                                                                                    {datapoint.field_data_set?.length || 0}<MdCalendarViewMonth fontSize={24} color={'#637381'}/>
                                                                                </div>
                                                                            </TableItemWrapper>
                                                                        </Panel>
                                                                    </Collapse>
                                                                )
                                                            }
                                                            return (
                                                                <DatapointItem
                                                                    key={datapoint.id}
                                                                    datapoint={datapoint}
                                                                    activeFieldData={activeFieldData}
                                                                    fieldDataValues={fieldDataValues}
                                                                    inputRefs={inputRefs}
                                                                    isReadOnly={isReadOnly}
                                                                    focusDatapoints={focusDatapoints}
                                                                    onDatapointKeyDown={onDatapointKeyDown}
                                                                    onFocusDatapoint={onFocusDatapoint}
                                                                    debounced={debounced}
                                                                    onMapData={onMapData}
                                                                    onMouseDownDatapoint={onMouseDownDatapoint}
                                                                    onChangeFieldDataValue={onChangeFieldDataValue}
                                                                />
                                                            )
                                                        })}
                                                    </Panel>
                                                )
                                            }
                                            if (category === 'table') {
                                                return (
                                                    <Panel header={<SectionTitle>{f.submission_field.name}</SectionTitle>} key={id}>
                                                        {/*<TableData*/}
                                                        {/*  tableId={id}*/}
                                                        {/*  isReadOnly={isReadOnly}*/}
                                                        {/*  focusDatapoints={focusDatapoints}*/}
                                                        {/*  debounced={debounced}*/}
                                                        {/*  onValidate={onValidate}*/}
                                                        {/*  inputRefs={inputRefs}*/}
                                                        {/*  onDatapointKeyDown={onDatapointKeyDown}*/}
                                                        {/*  isSoDoVCB={isSoDoVCB && f.submission_field.label==='goc_ranh'}*/}
                                                        {/*  ma_tinh={ma_tinh}*/}
                                                        {/*/>*/}
                                                        <TableItemWrapper>
                                                            <p className={'label'}>{f.submission_field.name || ''}</p>
                                                            <div
                                                                onClick={() => {
                                                                    // @ts-ignore
                                                                    onOpenTable({
                                                                        table: f,
                                                                        tableId: f.id,
                                                                        name: f.submission_field.name || '',
                                                                    })}}
                                                            >
                                                                {f.field_data_set?.length || 0}<MdCalendarViewMonth fontSize={24} color={'#637381'}/>
                                                            </div>
                                                        </TableItemWrapper>
                                                    </Panel>
                                                )
                                            }
                                            if (category === 'datapoint') {
                                                if (f.submission_field.label === 'gender') {
                                                    return (
                                                        <GenderDatapointItem
                                                            key={f.id}
                                                            datapoint={f}
                                                            activeFieldData={activeFieldData}
                                                            fieldDataValues={fieldDataValues}
                                                            inputRefs={inputRefs}
                                                            isReadOnly={isReadOnly}
                                                            focusDatapoints={focusDatapoints}
                                                            onDatapointKeyDown={onDatapointKeyDown}
                                                            onFocusDatapoint={onFocusDatapoint}
                                                            debounced={debounced}
                                                            onMapData={onMapData}
                                                            onMouseDownDatapoint={onMouseDownDatapoint}
                                                            onChangeFieldDataValue={onChangeFieldDataValue}
                                                        />
                                                    )
                                                }
                                                return (
                                                    <DatapointItem
                                                        key={id}
                                                        datapoint={f}
                                                        activeFieldData={activeFieldData}
                                                        fieldDataValues={fieldDataValues}
                                                        inputRefs={inputRefs}
                                                        isReadOnly={isReadOnly}
                                                        focusDatapoints={focusDatapoints}
                                                        onDatapointKeyDown={onDatapointKeyDown}
                                                        onFocusDatapoint={onFocusDatapoint}
                                                        debounced={debounced}
                                                        onMapData={onMapData}
                                                        onMouseDownDatapoint={onMouseDownDatapoint}
                                                        onChangeFieldDataValue={onChangeFieldDataValue}
                                                    />
                                                )
                                            }
                                        })}
                                </Collapse>
                            </RightSidebarMiddle>
                        </>
                    ) : (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description='Không có dữ liệu'
                            style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                        />
                    )}
                </>
            )}
        </>
    )
}

export default React.memo(RightSidebarMiddleComp)