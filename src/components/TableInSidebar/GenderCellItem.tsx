import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

// Styles
import { CellDatapoint } from './index.styles';

// Utils
import useGetIndex from "../../utils/useGetIndex";

const { Option } = Select;
const style = {
    fontSize: 16,
    verticalAlign: 'middle',
};

// const statusIconOptions = {
//     for_review: <IoMdCheckmark style={{ ...style, color: 'rgba(0,0,0,0.1)' }} />,
//     for_verify: <IoMdCheckmark style={{ ...style, color: '#00B497', transition: 'all 0.1s' }} />,
//     verified: <IoMdCheckmark style={{ ...style, color: '#00B497' }} />,
//     rejected: <FcCancel style={style} />,
//     undefined: <IoMdCheckmark style={{ ...style, color: 'transparent' }} />,
// };

interface GenderCellItemProps {
    datapoint: any;
    fieldDataValues: any;
    activeFieldData: any;
    inputCellRefs: any;
    isReadOnly: boolean;
    flatData: any;
    onFocusCell: (document_id: string, datapoint_id: string, data: any) => void;
    onKeyDownCell: (e: React.KeyboardEvent, document_id: string, datapoint_id: string, index: number, nextIndex: number | undefined) => void;
    onMouseDownCell: (datapoint_id: string) => void;
    debounced: (field_data_id: string, value: string) => void;
    onChangeFieldDataValue: (datapointId: string, value: any) => void;
}

const GenderCellItem: React.FC<GenderCellItemProps> = ({
    datapoint: field_data,
    fieldDataValues,
    activeFieldData,
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

    const [index, nextIndex] = useGetIndex(flatData, field_data_id, 'not_validated');
    const datapointRef = inputCellRefs[index];

    const fieldDataValue = fieldDataValues[field_data_id];
    const active_field_data_id = activeFieldData?.field_data_id;

    useEffect(() => {
        form.setFieldsValue({
            [field_data_id]: value,
        });
    }, [field_data_id, submission_field, value, form]);

    useEffect(() => {
        if (fieldDataValue === undefined) return;
        form.setFieldsValue({
            [field_data_id]: fieldDataValue,
        });
    }, [fieldDataValue, field_data_id, form]);

    const onKeyDown = (e: React.KeyboardEvent) => {
        onKeyDownCell(e, document_id, datapoint_id, index, nextIndex);
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

    const onChange = (value: string) => {
        // dispatch(changeFieldDataValue(field_data_id, value));
        onChangeFieldDataValue(field_data_id, value)
        debounced(field_data_id, value);
    };

    return (
        <CellDatapoint>
            <Form form={form} component={false}>
                <Form.Item name={field_data_id} style={{ marginBottom: 0, flex: 1 }}>
                    <Select
                        onChange={onChange}
                        ref={datapointRef}
                        onMouseDown={onMouseDown}
                        onFocus={onFocus}
                        onKeyDown={onKeyDown}
                        open={!isReadOnly && undefined}
                        style={{
                            padding: '0',
                            borderRadius: 0,
                            boxShadow: 'none',
                            outline: 'none',
                        }}
                        suffixIcon={<CaretDownOutlined />}
                    >
                        <Option value={'Nam'} style={{ fontSize: 12 }}>
                            Nam
                        </Option>
                        <Option value={'Nữ'} style={{ fontSize: 12 }}>
                            Nữ
                        </Option>
                        <Option value={'Khác'} style={{ fontSize: 12 }}>
                            Khác
                        </Option>
                    </Select>
                </Form.Item>
            </Form>
            {/*<div style={{ position: 'absolute', right: '1px' }}>{statusIconOptions[syncStatus || status]}</div>*/}
        </CellDatapoint>
    );
};

export default React.memo(GenderCellItem);
