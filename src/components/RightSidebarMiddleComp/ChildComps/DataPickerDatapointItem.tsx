import React, { useState, useEffect } from 'react';
import { Form, DatePicker } from 'antd';
import moment from "moment";
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';

// Components
import SelectSourceData from './SelectSourceData';
import { ConfidenceScore } from "../../Common/common";

// Styles
import { Datapoint, Title } from "../index.styles";

// Utils
import useGetIndex from "../../../utils/useGetIndex";

interface DatePickerDatapointItemProps {
    datapoint: any;
    activeFieldData: any;
    fieldDataValues: any;
    inputRefs: any;
    isReadOnly: boolean;
    focusDatapoints: any;
    onDatapointKeyDown: (e: React.KeyboardEvent, document_id: string, datapoint_id: string, index: number) => void;
    onFocusDatapoint: (document_id: string, datapoint_id: string, data: any) => void;
    debounced: (field_data_id: string, dateString: string | string[]) => void;
    onMapData: (field_data_id: string, source_id: string) => void;
    onMouseDownDatapoint: (datapoint_id: string) => void;
    onChangeFieldDataValue: (datapoint_id: string, value: any) => void;
}

const DatePickerDatapointItem: React.FC<DatePickerDatapointItemProps> = ({
     datapoint: field_data,
     activeFieldData,
     fieldDataValues,
     inputRefs,
     isReadOnly,
     focusDatapoints,
     onDatapointKeyDown,
     onFocusDatapoint,
     debounced,
     onMapData,
     onMouseDownDatapoint,
     onChangeFieldDataValue,
}) => {
    const [form] = Form.useForm();

    const { id: field_data_id, submission_field, data_source, data: selected_id, value } = field_data || {};
    const { name, data_type, required } = submission_field;
    const isNumberField = data_type === 'number';

    const [selectedData, setSelectedData] = useState(data_source?.find((data: any) => data.id === selected_id));
    const { id: datapoint_id, document: document_id, confidence_score, status } = selectedData || {};

    const array = useGetIndex(focusDatapoints, field_data_id, 'not_validated');
    const [index] = array;
    const datapointRef = inputRefs[index];

    const fieldDataValue = fieldDataValues && fieldDataValues[field_data_id];
    const active_field_data_id = activeFieldData?.field_data_id;

    useEffect(() => {
        if (value && moment(value, 'DD/MM/YYYY').isValid()) {
            form.setFieldsValue({
                [field_data_id]: moment(value, 'DD/MM/YYYY'),
            });
        } else {
            form.setFieldsValue({
                [field_data_id]: null,
            });
        }
    }, [field_data_id, value, data_type, form]);

    useEffect(() => {
        if (fieldDataValue === undefined) return;
        if (moment(fieldDataValue, 'DD/MM/YYYY').isValid()) {
            form.setFieldsValue({
                [field_data_id]: moment(fieldDataValue, 'DD/MM/YYYY'),
            });
        } else {
            form.setFieldsValue({
                [field_data_id]: null,
            });
        }
    }, [fieldDataValue, field_data_id, form]);

    const onKeyDown = (e: React.KeyboardEvent) => {
        onDatapointKeyDown(e, document_id, datapoint_id, index);
    };

    const onMouseDown = (e: React.MouseEvent) => {
        onMouseDownDatapoint(datapoint_id);
    };

    const onFocus = (e: React.FocusEvent) => {
        e.preventDefault();
        onFocusDatapoint(document_id, datapoint_id, {
            ...selectedData,
            value,
            field_data_id: field_data_id,
            name: name,
            data_type: data_type,
            is_select_field: true,
        });
    };

    const onChange = (date: any, dateString: string | string[]) => {
        // dispatch(changeFieldDataValue(field_data_id, dateString));
        onChangeFieldDataValue(field_data_id, dateString)
        debounced(field_data_id, dateString);
    };

    const onSelect = (source: any) => {
        setSelectedData(source);
        onMapData(field_data_id, source.id);
    };

    return (
        <Datapoint name={`datapoint-${field_data_id}`}>
            {/*{statusIconOptions[syncStatus || status]}*/}
            <Title required={required}>{name}</Title>
            <SelectSourceData sources={data_source} selectedId={selected_id} onSelect={onSelect} />
            <span style={{ margin: '0 4px' }}>:</span>
            <Form form={form} component={false}>
                <Form.Item name={field_data_id} style={{ flex: 1, marginBottom: 0 }}>
                    <DatePicker
                        ref={datapointRef}
                        onKeyDown={onKeyDown}
                        onFocus={onFocus}
                        onChange={onChange}
                        onMouseDown={onMouseDown}
                        format='DD/MM/YYYY'
                        placeholder='dd/mm/yyyy'
                        showToday={false}
                        showNow={false}
                        locale={locale}
                        inputReadOnly={isReadOnly}
                        allowClear={!isReadOnly}
                        open={!isReadOnly && undefined}
                        style={{
                            borderColor: active_field_data_id === field_data_id ? '#EC1C2A' : '#f0f0f0',
                        }}
                    />
                </Form.Item>
            </Form>
            <ConfidenceScore score={confidence_score} />
        </Datapoint>
    );
};

export default React.memo(DatePickerDatapointItem);
