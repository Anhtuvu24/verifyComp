import React, { useState, useEffect, MouseEvent } from 'react';
import {
    Input,
    Form,
    Select,
    Tag,
} from 'antd';

// Components
import SelectSourceData from "./SelectSourceData";
import { ConfidenceScore } from "../../Common/common";

// Styles
import { Datapoint, Title } from "../index.styles";

// Utils
import useGetIndex from "../../../utils/useGetIndex";
import { formatVND } from "../../../utils/format";

interface DatapointItemProps {
    datapoint: any;
    activeFieldData: any;
    fieldDataValues: any;
    inputRefs: any;
    isReadOnly: boolean;
    focusDatapoints: any;
    onDatapointKeyDown: (e: React.KeyboardEvent, document_id: string, datapoint_id: string, index: number) => void;
    onFocusDatapoint: (document_id: string, datapoint_id: string, data: any) => void;
    debounced: (field_data_id: string, value: string) => void;
    onMapData: (field_data_id: string, source_id: string) => void;
    onMouseDownDatapoint: (datapoint_id: string) => void;
    onChangeFieldDataValue: (datapoint_id: string, value: any) => void;
}

const DatapointItem: React.FC<DatapointItemProps> = ({
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

    const { id: field_data_id, submission_field, data_source, data: selected_id, value: origin_value } = field_data;
    const { name, data_type, required, label } = submission_field;
    const isNumberField = data_type === 'number';
    const isJsonValue =
        [
            'thong_tin_thu_tin_dung__loai_lc',
            'thong_tin_thu_tin_dung__f39a_dung_sai',
            'ghtd_cho_vay',
            'gioi_han_cap_bao_lanh',
            'gioi_han_lc',
            'gioi_han_chiet_khau',
            'gioi_han_bao_thanh_toan',
            'gioi_han_the_tin_dung',
            'new_diagnose_code__type_1',
            'new_diagnose_code__type_2',
            'new_diagnose_code__type_3',
            'danh_sach_ngay_ap_dung',
            'stamp',
        ].includes(label) || name === 'Lý do / nội dung';

    const is_valid_seals_fields = label === 'valid_seals';
    const is_seals_fields = label === 'seals';
    const is_stamp = label === 'stamp';

    const value = origin_value;

    const [selectedData, setSelectedData] = useState(data_source?.find((data: any) => data.id === selected_id));
    const { id: datapoint_id, document: document_id, confidence_score, status } = selectedData || {};

    const array = useGetIndex(focusDatapoints, field_data_id, 'not_validated');
    const [index] = array;
    const datapointRef = inputRefs[index];

    const fieldDataValue = fieldDataValues ? fieldDataValues[field_data_id]?.value : '';
    const active_field_data_id = activeFieldData?.field_data_id;
    useEffect(() => {
        form.setFieldsValue({
            [field_data_id]: isNumberField ? formatVND(value) : value,
        });
    }, [field_data_id, fieldDataValues, value, data_type, form]);

    useEffect(() => {
        if (fieldDataValue === undefined) return;
        form.setFieldsValue({
            [field_data_id]: fieldDataValue,
        });
    }, [fieldDataValues, form]);

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
            origin_value: origin_value,
            is_json_value: isJsonValue,
        });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        onChangeFieldDataValue(field_data_id, value)
        // dispatch(changeFieldDataValue(field_data_id, value));
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

    const onSelect = (source: any) => {
        setSelectedData(source);
        onMapData(field_data_id, source.id);
    };

    const onPreventMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }

    return (
        <Datapoint name={`datapoint-${field_data_id}`}>
            {/*{statusIconOptions[syncStatus || status]}*/}
            <Title required={required}>{name}</Title>
            <SelectSourceData sources={data_source} selectedId={selected_id} onSelect={onSelect} />
            <span style={{ margin: '0 4px' }}>:</span>
            <Form form={form} component={false}>
                <Form.Item
                    name={field_data_id}
                    style={{ flex: 1, marginBottom: 0 }}
                    rules={[{ required: required, message: `Vui lòng nhập ${name}!` }]}
                >
                    {['chu_ky', 'info_signature_unit_head__left_signature', 'info_signature_unit_head__right_signature'].includes(
                        label) || data_type == 'image'? (
                        value ? (
                            <img alt='img' src={`data:image/png;base64,${value}`} style={{ maxWidth: '200px' }} />
                        ) : null
                    ) : isJsonValue ? (
                        <Select
                            ref={datapointRef}
                            onKeyDown={onKeyDown}
                            onMouseDown={onMouseDown}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            disabled={true}
                            style={{
                                fontSize: 13,
                                boxShadow: 'none',
                                transition: 'all 0.1s',
                                // height: 36,
                                borderColor: active_field_data_id === field_data_id ? '#EC1C2A' : '#f0f0f0',
                                // paddingRight: 0,
                            }}
                            mode='multiple'
                            open={false}
                            tagRender={props => {
                                const { label } = props

                                return (
                                    <Tag
                                        onMouseDown={onPreventMouseDown}
                                        closable={false}
                                        style={{ marginRight: 3, borderRadius: 4, fontSize: 13, lineHeight: '24px' }}
                                    >
                                        {label}
                                    </Tag>
                                )
                            }}
                        />
                    ) : (
                        <Input
                            onChange={isNumberField ? onChangeNumber : onChange}
                            ref={datapointRef}
                            onKeyDown={onKeyDown}
                            onMouseDown={onMouseDown}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            readOnly={isReadOnly}
                            // readOnly={isReadOnly || status === 'verified'}
                            style={{
                                fontSize: 13,
                                boxShadow: 'none',
                                transition: 'all 0.1s',
                                // height: 36,
                                borderColor: active_field_data_id === field_data_id ? '#EC1C2A' : '#f0f0f0',
                                // paddingRight: 0,
                            }}
                        />
                    )}
                </Form.Item>
            </Form>
            <ConfidenceScore score={confidence_score} />
        </Datapoint>
    )
}

export default React.memo(DatapointItem)