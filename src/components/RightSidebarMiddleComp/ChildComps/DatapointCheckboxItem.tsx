import React, { useState, useEffect } from 'react';
import { Form, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

// Utils
import useGetIndex from "../../../utils/useGetIndex";

interface DatapointCheckboxItemProps {
    datapoint: any;
    inputRefs: any;
    isReadOnly: boolean;
    focusDatapoints: any;
    onDatapointKeyDown: (e: React.KeyboardEvent, document_id: string, datapoint_id: string, index: number) => void;
    onFocusDatapoint: (document_id: string, datapoint_id: string, data: any) => void;
    debounced: (field_data_id: string, value: string) => void;
    onMapData: (field_data_id: string, source_id: string) => void;
    onMouseDownDatapoint: (datapoint_id: string) => void;
}

const DatapointCheckboxItem: React.FC<DatapointCheckboxItemProps> = ({
    datapoint: field_data,
    inputRefs,
    isReadOnly,
    focusDatapoints,
    onDatapointKeyDown,
    onFocusDatapoint,
    debounced,
    onMapData,
    onMouseDownDatapoint,
}) => {
    const [form] = Form.useForm();

    const { id: field_data_id, submission_field, data_source, data: selected_id, value } = field_data;
    const { name, data_type } = submission_field;

    const [selectedData, setSelectedData] = useState(data_source?.find((data: any) => data.id === selected_id));
    const { id: datapoint_id, document: document_id } = selectedData || {};

    const array = useGetIndex(focusDatapoints, field_data_id, 'not_validated');
    const [index] = array;
    const datapointRef = inputRefs[index];

    useEffect(() => {
        form.setFieldsValue({
            [field_data_id]: value === 'True' ? true : false,
        });
    }, [field_data_id, value, form]);

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
            is_checkbox: true,
        });
    };

    const onChange = (e: CheckboxChangeEvent) => {
        const value = e.target.checked ? 'True' : 'False';
        debounced(field_data_id, value);
    };

    return (
        <Form form={form} component={false}>
            <Form.Item name={field_data_id} className='phieulaodong-form-item' valuePropName='checked'>
                <Checkbox
                    onChange={onChange}
                    ref={datapointRef}
                    onKeyDown={onKeyDown}
                    // onMouseDown={onMouseDown}
                    onFocus={onFocus}
                    disabled={isReadOnly}
                >
                    {name}
                </Checkbox>
            </Form.Item>
        </Form>
    );
};

export default React.memo(DatapointCheckboxItem);
