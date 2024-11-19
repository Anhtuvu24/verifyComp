import React, { useState, useEffect } from 'react';
import { Input, Form } from 'antd';

// Components

// Styles
import { CellDatapoint } from "./index.styles";

// Utils
import { formatVND } from "../../utils/format";
import useGetIndex from "../../utils/useGetIndex";

interface CellItemProps {
    datapoint: any;
    fieldDataValues: any;
    inputCellRefs: any;
    isReadOnly: boolean;
    flatData: any;
    onFocusCell: (document_id: string, datapoint_id: string, data: any) => void;
    onKeyDownCell: (e: React.KeyboardEvent, document_id: string, datapoint_id: string, index: number) => void;
    onMouseDownCell: (datapoint_id: string) => void;
    debounced: (field_data_id: string, value: string) => void;
    onChangeFieldDataValue: (datapointId: string, value: any) => void;
}

const CellItem: React.FC<CellItemProps> = ({
    datapoint: field_data,
    fieldDataValues,
    inputCellRefs,
    isReadOnly,
    flatData,
    onFocusCell,
    onKeyDownCell,
    onMouseDownCell,
    debounced,
    onChangeFieldDataValue,
}) => {
    const [form] = Form.useForm();

    const { id: field_data_id, submission_field, value, data: selected_id, data_source } = field_data;
    const isNumberField = submission_field.data_type === 'number';

    const [selectedData, setSelectedData] = useState(data_source?.find((data: any) => data.id === selected_id));
    const { id: datapoint_id, document: document_id, confidence_score, status } = selectedData || {};

    const [index] = useGetIndex(flatData, field_data_id, 'not_validated');
    const datapointRef = inputCellRefs[index];

    const fieldDataValue = fieldDataValues[field_data_id];

    useEffect(() => {
        form.setFieldsValue({
            [field_data_id]: isNumberField ? formatVND(value) : value,
        });
    }, [field_data_id, submission_field, value, form]);

    useEffect(() => {
        if (fieldDataValue === undefined) return;
        form.setFieldsValue({
            [field_data_id]: fieldDataValue,
        });
    }, [fieldDataValue, field_data_id, form]);

    const onKeyDown = (e: React.KeyboardEvent) => {
        onKeyDownCell(e, document_id, datapoint_id, index);
    };

    const onMouseDown = (e: React.MouseEvent) => {
        onMouseDownCell(datapoint_id);
    };

    const onFocus = (e: React.FocusEvent) => {
        e.preventDefault();
        onFocusCell(document_id, datapoint_id, {
            ...selectedData,
            value,
            field_data_id: field_data_id,
            name: submission_field.name,
            data_type: submission_field.data_type,
            is_cell: true,
        });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // dispatch(changeFieldDataValue(field_data_id, value));
        onChangeFieldDataValue(field_data_id, value)
        debounced(field_data_id, value);
    };

    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formatted = formatVND(value);
        form.setFieldsValue({ [field_data_id]: formatted });
        // dispatch(changeFieldDataValue(field_data_id, formatted));
        onChangeFieldDataValue(field_data_id, formatted)
        debounced(field_data_id, formatted.replaceAll('.', ''));
    };

    const onBlur = () => {
        if (isNumberField) {
            const value = form.getFieldValue(field_data_id);
            if (value && value.charAt(value.length - 1) === ',') {
                const valueTemp = value.slice(0, -1);
                form.setFieldsValue({ [field_data_id]: valueTemp });
                // dispatch(changeFieldDataValue(field_data_id, valueTemp));
                onChangeFieldDataValue(field_data_id, valueTemp)
                debounced(field_data_id, valueTemp.replaceAll('.', ''));
            }
        }
    };

    return (
        <CellDatapoint>
            <Form form={form} component={false}>
                <Form.Item name={field_data_id} style={{ marginBottom: 0, flex: 1 }}>
                    <Input
                        onChange={isNumberField ? onChangeNumber : onChange}
                        ref={datapointRef}
                        onKeyDown={onKeyDown}
                        readOnly={isReadOnly}
                        onMouseDown={onMouseDown}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        style={{
                            padding: '4px 17px 4px 4px',
                            borderRadius: 0,
                            boxShadow: 'none',
                        }}
                    />
                </Form.Item>
            </Form>
            {/*<div style={{ position: 'absolute', right: '1px' }}>{statusIconOptions[syncStatus || status]}</div>*/}
        </CellDatapoint>
    );
};

export default React.memo(CellItem);
