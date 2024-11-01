import React from 'react';
import {
    Button,
    Input,
    Form,
    Empty,
    Popover,
    DatePicker,
    Select,
    Collapse,
    Table,
    Tooltip,
    Checkbox,
    AutoComplete,
    Tag,
} from 'antd'
import CustomSpin from '../CustomSpin'
export default function RightSidebarMiddleComp({
    focusDatapoints,
    setFocusDatapoints,
    inputRefs,
    onDatapointKeyDown,
    prevFocusedId,
    onValidate,
    prevFocusedDocumentId,
    onOpenTable,
    debounced,
    isReadOnly,
    onFocusField,
}) {
    return (
        <>
            {rightLoading ? (
                <CustomSpin />
            ) : (
                <>
                    {fields ? (
                        <>
                            <RightSidebarMiddle id='scroll-container'>
                                <Collapse ghost activeKey={activeKey} onChange={key => setActiveKey(key)}>
                                    {fields
                                        .filter(f => f.submission_field?.label !== 'ma_tinh')
                                        .map(f => {
                                            const { id, category } = f
                                            if (category === 'section') {
                                                if (isPhieuLaoDong) {
                                                    return (
                                                        <SectionCheckbox
                                                            key={id}
                                                            datapoint={f}
                                                            inputRefs={inputRefs}
                                                            isReadOnly={isReadOnly}
                                                            focusDatapoints={focusDatapoints}
                                                            onDatapointKeyDown={onDatapointKeyDown}
                                                            onFocusDatapoint={onFocusDatapoint}
                                                            debounced={debounced}
                                                            onMapData={onMapData}
                                                            onMouseDownDatapoint={onMouseDownDatapoint}
                                                        />
                                                    )
                                                }
                                                return (
                                                    <Panel header={<SectionTitle>{f.submission_field.name}</SectionTitle>} key={id}>
                                                        {f.field_data_set.map(datapoint => {
                                                            if (datapoint.submission_field.label === 'gender') {
                                                                return (
                                                                    <GenderDatapointItem
                                                                        key={datapoint.id}
                                                                        datapoint={datapoint}
                                                                        inputRefs={inputRefs}
                                                                        isReadOnly={isReadOnly}
                                                                        focusDatapoints={focusDatapoints}
                                                                        onDatapointKeyDown={onDatapointKeyDown}
                                                                        onFocusDatapoint={onFocusDatapoint}
                                                                        debounced={debounced}
                                                                        onMapData={onMapData}
                                                                        onMouseDownDatapoint={onMouseDownDatapoint}
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
                                                                        inputRefs={inputRefs}
                                                                        isReadOnly={isReadOnly}
                                                                        focusDatapoints={focusDatapoints}
                                                                        onDatapointKeyDown={onDatapointKeyDown}
                                                                        onFocusDatapoint={onFocusDatapoint}
                                                                        debounced={debounced}
                                                                        onMapData={onMapData}
                                                                        onMouseDownDatapoint={onMouseDownDatapoint}
                                                                    />
                                                                )
                                                            }
                                                            if (datapoint.submission_field.data_type === 'date') {
                                                                return (
                                                                    <DatePickerDatapointItem
                                                                        key={datapoint.id}
                                                                        datapoint={datapoint}
                                                                        inputRefs={inputRefs}
                                                                        isReadOnly={isReadOnly}
                                                                        focusDatapoints={focusDatapoints}
                                                                        onDatapointKeyDown={onDatapointKeyDown}
                                                                        onFocusDatapoint={onFocusDatapoint}
                                                                        debounced={debounced}
                                                                        onMapData={onMapData}
                                                                        onMouseDownDatapoint={onMouseDownDatapoint}
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
                                                                            {datapoint.field_data_set.map(child => {
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
                                                                                                {child.field_data_set.map(smallChild => {
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
                                                                                                                    {smallChild.field_data_set.map(xsChild => {
                                                                                                                        return (
                                                                                                                            <DatapointItem
                                                                                                                                key={xsChild.id}
                                                                                                                                datapoint={xsChild}
                                                                                                                                inputRefs={inputRefs}
                                                                                                                                isReadOnly={isReadOnly}
                                                                                                                                focusDatapoints={focusDatapoints}
                                                                                                                                onDatapointKeyDown={onDatapointKeyDown}
                                                                                                                                onFocusDatapoint={onFocusDatapoint}
                                                                                                                                debounced={debounced}
                                                                                                                                onMapData={onMapData}
                                                                                                                                onMouseDownDatapoint={onMouseDownDatapoint}
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
                                                                                                                    <TableData
                                                                                                                        tableId={smallChild.id}
                                                                                                                        table={smallChild}
                                                                                                                        isReadOnly={isReadOnly}
                                                                                                                        focusDatapoints={focusDatapoints}
                                                                                                                        debounced={debounced}
                                                                                                                        onValidate={onValidate}
                                                                                                                        inputRefs={inputRefs}
                                                                                                                        onDatapointKeyDown={onDatapointKeyDown}
                                                                                                                        isSoDoVCB={isSoDoVCB && smallChild.submission_field.label==='goc_ranh'}
                                                                                                                        ma_tinh={ma_tinh}
                                                                                                                    />
                                                                                                                </Panel>
                                                                                                            </Collapse>
                                                                                                        )

                                                                                                    return (
                                                                                                        <DatapointItem
                                                                                                            key={smallChild.id}
                                                                                                            datapoint={smallChild}
                                                                                                            inputRefs={inputRefs}
                                                                                                            isReadOnly={isReadOnly}
                                                                                                            focusDatapoints={focusDatapoints}
                                                                                                            onDatapointKeyDown={onDatapointKeyDown}
                                                                                                            onFocusDatapoint={onFocusDatapoint}
                                                                                                            debounced={debounced}
                                                                                                            onMapData={onMapData}
                                                                                                            onMouseDownDatapoint={onMouseDownDatapoint}
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
                                                                                                <TableData
                                                                                                    tableId={child.id}
                                                                                                    table={child}
                                                                                                    isReadOnly={isReadOnly}
                                                                                                    focusDatapoints={focusDatapoints}
                                                                                                    debounced={debounced}
                                                                                                    onValidate={onValidate}
                                                                                                    inputRefs={inputRefs}
                                                                                                    onDatapointKeyDown={onDatapointKeyDown}
                                                                                                    isSoDoVCB={isSoDoVCB && child.submission_field.label==='goc_ranh'}
                                                                                                    ma_tinh={ma_tinh}
                                                                                                />
                                                                                            </Panel>
                                                                                        </Collapse>
                                                                                    )
                                                                                }

                                                                                return (
                                                                                    <DatapointItem
                                                                                        key={child.id}
                                                                                        datapoint={child}
                                                                                        inputRefs={inputRefs}
                                                                                        isReadOnly={isReadOnly}
                                                                                        focusDatapoints={focusDatapoints}
                                                                                        onDatapointKeyDown={onDatapointKeyDown}
                                                                                        onFocusDatapoint={onFocusDatapoint}
                                                                                        debounced={debounced}
                                                                                        onMapData={onMapData}
                                                                                        onMouseDownDatapoint={onMouseDownDatapoint}
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
                                                                            <TableData
                                                                                tableId={datapoint.id}
                                                                                table={datapoint}
                                                                                isReadOnly={isReadOnly}
                                                                                focusDatapoints={focusDatapoints}
                                                                                debounced={debounced}
                                                                                onValidate={onValidate}
                                                                                inputRefs={inputRefs}
                                                                                onDatapointKeyDown={onDatapointKeyDown}
                                                                                isSoDoVCB={isSoDoVCB && datapoint.submission_field.label==='goc_ranh'}
                                                                                ma_tinh={ma_tinh}
                                                                            />
                                                                        </Panel>
                                                                    </Collapse>
                                                                )
                                                            }
                                                            return (
                                                                <DatapointItem
                                                                    key={datapoint.id}
                                                                    datapoint={datapoint}
                                                                    inputRefs={inputRefs}
                                                                    isReadOnly={isReadOnly}
                                                                    focusDatapoints={focusDatapoints}
                                                                    onDatapointKeyDown={onDatapointKeyDown}
                                                                    onFocusDatapoint={onFocusDatapoint}
                                                                    debounced={debounced}
                                                                    onMapData={onMapData}
                                                                    onMouseDownDatapoint={onMouseDownDatapoint}
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
                                                                    onOpenTable({
                                                                        tableId: id,
                                                                        name: f.submission_field.name || '',
                                                                        isSoDoVCB: isSoDoVCB && f.submission_field.label==='goc_ranh',
                                                                        ma_tinh,
                                                                    })}}
                                                            >
                                                                {f.field_data_set?.length || 0}<MdCalendarViewMonth fontSize={24} color={'#637381'}/>
                                                            </div>
                                                        </TableItemWrapper>
                                                    </Panel>
                                                )
                                            }
                                            if (category === 'datapoint') {
                                                // if (isSoKhaiSinh && f.submission_field?.label?.includes('nationality')) {
                                                //   return null
                                                // }
                                                if (isSoKhaiSinh && Object.keys(SKS_DATA_MAP).includes(f.submission_field?.label)) {
                                                    return (
                                                        <SoKhaiSinhDatapointItem
                                                            key={id}
                                                            datapoint={f}
                                                            inputRefs={inputRefs}
                                                            isReadOnly={isReadOnly}
                                                            focusDatapoints={focusDatapoints}
                                                            onDatapointKeyDown={onDatapointKeyDown}
                                                            onFocusDatapoint={onFocusDatapoint}
                                                            debounced={debounced}
                                                            onMapData={onMapData}
                                                            onMouseDownDatapoint={onMouseDownDatapoint}
                                                            data={
                                                                ['chaLoaiCuTru', 'meLoaiCuTru'].includes(f.submission_field.label)
                                                                    ? SKS_ADDRESS_TYPE
                                                                    : SKS_DATA_MAP[f.submission_field.label]
                                                            }
                                                            showSearch={f.submission_field?.label?.includes('ethnicity')}
                                                        />
                                                    )
                                                }
                                                if (isSoKhaiTu && Object.keys(SKT_DATA_MAP).includes(f.submission_field?.label)) {
                                                    return (
                                                        <SoKhaiSinhDatapointItem
                                                            key={id}
                                                            datapoint={f}
                                                            inputRefs={inputRefs}
                                                            isReadOnly={isReadOnly}
                                                            focusDatapoints={focusDatapoints}
                                                            onDatapointKeyDown={onDatapointKeyDown}
                                                            onFocusDatapoint={onFocusDatapoint}
                                                            debounced={debounced}
                                                            onMapData={onMapData}
                                                            onMouseDownDatapoint={onMouseDownDatapoint}
                                                            data={SKT_DATA_MAP[f.submission_field.label]}
                                                            showSearch={f.submission_field?.label?.includes('ethnicity')}
                                                        />
                                                    )
                                                }
                                                if (isSoKetHon && Object.keys(SKH_DATA_MAP).includes(f.submission_field?.label)) {
                                                    return (
                                                        <SoKhaiSinhDatapointItem
                                                            key={id}
                                                            datapoint={f}
                                                            inputRefs={inputRefs}
                                                            isReadOnly={isReadOnly}
                                                            focusDatapoints={focusDatapoints}
                                                            onDatapointKeyDown={onDatapointKeyDown}
                                                            onFocusDatapoint={onFocusDatapoint}
                                                            debounced={debounced}
                                                            onMapData={onMapData}
                                                            onMouseDownDatapoint={onMouseDownDatapoint}
                                                            data={SKH_DATA_MAP[f.submission_field.label]}
                                                            showSearch={f.submission_field?.label?.includes('ethnicity')}
                                                        />
                                                    )
                                                }
                                                if (isPhieuKiemKe && Object.keys(PKK_DATA_MAP).includes(f.submission_field?.label)) {
                                                    return (
                                                        <SoKhaiSinhDatapointItem
                                                            key={id}
                                                            datapoint={f}
                                                            inputRefs={inputRefs}
                                                            isReadOnly={isReadOnly}
                                                            focusDatapoints={focusDatapoints}
                                                            onDatapointKeyDown={onDatapointKeyDown}
                                                            onFocusDatapoint={onFocusDatapoint}
                                                            debounced={debounced}
                                                            onMapData={onMapData}
                                                            onMouseDownDatapoint={onMouseDownDatapoint}
                                                            data={PKK_DATA_MAP[f.submission_field.label]}
                                                            showSearch={true}
                                                        />
                                                    )
                                                }
                                                if (
                                                    (isSoKhaiSinh || isSoKhaiTu || isSoKetHon) &&
                                                    auto_complete_fields.includes(f.submission_field.label)
                                                ) {
                                                    return (
                                                        <AutoCompleteItem
                                                            key={id}
                                                            datapoint={f}
                                                            inputRefs={inputRefs}
                                                            isReadOnly={isReadOnly}
                                                            focusDatapoints={focusDatapoints}
                                                            onDatapointKeyDown={onDatapointKeyDown}
                                                            onFocusDatapoint={onFocusDatapoint}
                                                            debounced={debounced}
                                                            onMapData={onMapData}
                                                            onMouseDownDatapoint={onMouseDownDatapoint}
                                                            isSoKhaiSinh={isSoKhaiSinh}
                                                        />
                                                    )
                                                }
                                                return (
                                                    <DatapointItem
                                                        key={id}
                                                        datapoint={f}
                                                        inputRefs={inputRefs}
                                                        isReadOnly={isReadOnly}
                                                        focusDatapoints={focusDatapoints}
                                                        onDatapointKeyDown={onDatapointKeyDown}
                                                        onFocusDatapoint={onFocusDatapoint}
                                                        debounced={debounced}
                                                        onMapData={onMapData}
                                                        onMouseDownDatapoint={onMouseDownDatapoint}
                                                        isSoKhaiSinh={isSoKhaiSinh}
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