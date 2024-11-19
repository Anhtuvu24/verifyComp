import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { IoCheckmark, IoClose } from 'react-icons/io5'
import useGetIndex from "../../../utils/useGetIndex";
import {
    EditBoxIconCheck,
    ActiveBox,
    EditBox,
    EditBoxIcon,
    EditBoxIcons,
    EditBoxInput,
    EditBoxLabel,
    EditBoxWrapper,
    Wrapper,
} from '../index.styles';
// import useFitText from 'use-fit-text';
import { formatVND } from "../../../utils/format";

// Utility functions
function showTooltip() {
    const tooltip = document.querySelector('.editBoxContainer') as HTMLElement;
    const container = document.querySelector('.imageContainer') as HTMLElement;
    adjustTooltipPosition(tooltip, container);
}

function adjustTooltipPosition(tooltip: HTMLElement, container: HTMLElement) {
    const tooltipRect = tooltip.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    if (tooltipRect.left <= containerRect.left) {
        tooltip.style.left = '0';
        tooltip.style.right = 'unset';
    } else if (tooltipRect.right > containerRect.right) {
        tooltip.style.right = '0';
        tooltip.style.left = 'unset';
    }
}

// Types
interface ActiveBoxCompProps {
    item: any;
    fieldDataValues: any;
    focusDatapoints: any;
    onTab: (document_id: string, datapoint_id: string, index: number) => void;
    onDatapointKeyDown: (e: React.KeyboardEvent, document_id: string, datapoint_id: string, index: number) => void;
    setShowActiveBox: (type: boolean) => void;
    isReadOnly: boolean;
    isVerify: boolean;
    resize: number;
    debounced: (field_data_id: string, value: string) => void;
    onChangeFieldDataValue: (field_data_id: string, value: any) => void;
}

const ActiveBoxComp: React.FC<ActiveBoxCompProps> = ({
    item,
    fieldDataValues,
    focusDatapoints,
    onTab,
    onChangeFieldDataValue,
    onDatapointKeyDown,
    setShowActiveBox,
    isReadOnly,
    isVerify,
    resize: r,
    debounced,
}) => {
    const [form] = Form.useForm();

    const {
        box,
        id: datapoint_id,
        value,
        document: document_id,
        field_data_id,
        name,
        data_type,
        is_cell,
        is_select_field,
        is_checkbox,
        is_auto_complete_field,
    } = item;

    const [rowAndCol, setRowAndCol] = useState({
        cols: `${value || ''}`.length > name.length ? `${value || ''}`.length : name.length < 20 ? 20 : name.length,
        rows: `${value || ''}`.length > 43 ? Math.ceil(`${value || ''}`.length / 43) : 1,
    });

    const isNumberField = data_type === 'number';
    const status = isVerify ? 'not_verified' : 'not_validated';
    const array = useGetIndex(focusDatapoints, field_data_id, status); // array = [index, nextIndex, hasStatusIndex, statusIndexArray]
    const [index, ...rest] = array;

    const [x1, y1, x2, y2] = box;

    const x1r = x1 * r;
    const y1r = y1 * r;
    const x2r = x2 * r;
    const y2r = y2 * r;

    const width = x2r - x1r;
    const height = y2r - y1r;
    const top = y1r;
    const left = x1r;

    const fieldDataValue = fieldDataValues ? fieldDataValues[field_data_id]?.value : '';

    const readOnly = isReadOnly || is_cell || is_select_field || is_auto_complete_field;

    useEffect(() => {
        form.setFieldsValue({
            [field_data_id]: isNumberField ? formatVND(value) : value,
        });
        const rows = `${value || ''}`.length > 43 ? Math.ceil(`${value || ''}`.length / 43) : 1;
        const cols = `${value || ''}`.length > name.length ? `${value || ''}`.length : name.length < 20 ? 20 : name.length;
        setRowAndCol({ cols, rows });
        showTooltip();
    }, [field_data_id, value, data_type]);

    useEffect(() => {
        if (fieldDataValue === undefined) return;
        form.setFieldsValue({
            [field_data_id]: fieldDataValue,
        });
        const rows = `${fieldDataValue || ''}`.length > 43 ? Math.ceil(`${fieldDataValue || ''}`.length / 43) : 1;
        const cols = `${fieldDataValue || ''}`.length > name.length ? `${fieldDataValue || ''}`.length : name.length < 20 ? 20 : name.length;
        setRowAndCol({ cols, rows });
    }, [fieldDataValue]);

    const onClear = () => {
        // dispatch(changeFieldDataValue(field_data_id, ''));
        onChangeFieldDataValue(field_data_id, '')
        debounced(field_data_id, '');
    };

    const onClose = () => {
        setShowActiveBox(false);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        onDatapointKeyDown(e, document_id, datapoint_id, index);
        if (e.shiftKey && e.key === 'Delete') {
            e.preventDefault();
            onClear();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        // dispatch(changeFieldDataValue(field_data_id, value));
        onChangeFieldDataValue(field_data_id, value);
        debounced(field_data_id, value);
        const rows = `${value || ''}`.length > 45 ? Math.ceil(`${value || ''}`.length / 45) : 1;
        const cols = `${value || ''}`.length > name.length ? `${value || ''}`.length : name.length < 20 ? 20 : name.length;
        setRowAndCol({ cols, rows });
    };

    const onChangeNumber = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        const formatted = formatVND(value);
        form.setFieldsValue({ [field_data_id]: formatted });
        // dispatch(changeFieldDataValue(field_data_id, formatted));
        onChangeFieldDataValue(field_data_id, formatted);
        debounced(field_data_id, formatted.replaceAll('.', ''));
        const rows = `${value || ''}`.length > 45 ? Math.ceil(`${value || ''}`.length / 45) : 1;
        const cols = `${value || ''}`.length > name.length ? `${value || ''}`.length : name.length < 20 ? 20 : name.length;
        setRowAndCol({ cols, rows });
    };

    const onBlur = () => {
        if (isNumberField) {
            const value = form.getFieldValue(field_data_id);
            if (value && value.charAt(value.length - 1) === ',') {
                const valueTemp = value.slice(0, -1);
                form.setFieldsValue({ [field_data_id]: valueTemp });
                onChangeFieldDataValue(field_data_id, valueTemp);
                debounced(field_data_id, valueTemp.replaceAll('.', ''));
            }
        }
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <ActiveBox style={{ width, height, top, left }} id={`active-box-${datapoint_id || field_data_id}`}  name={`active-box-${datapoint_id || field_data_id}`}>
                {!is_checkbox && (
                    <EditBox className={'editBoxContainer'} style={{ top: height }}>
                        <Wrapper>
                            <EditBoxWrapper>
                                <Form form={form} component={false}>
                                    <Form.Item name={field_data_id} style={{ marginBottom: 0 }}>
                                        <EditBoxInput
                                            cols={rowAndCol.cols}
                                            rows={rowAndCol.rows}
                                            onChange={isNumberField ? onChangeNumber : onChange}
                                            autoFocus={!readOnly}
                                            onKeyDown={onKeyDown}
                                            onBlur={onBlur}
                                            // ref={ref}
                                            className='scrollbar-hidden'
                                            readOnly={readOnly}
                                        />
                                    </Form.Item>
                                </Form>

                                <EditBoxLabel>{name}</EditBoxLabel>
                                {isReadOnly || is_cell ? null : (
                                    <EditBoxIcons>
                                        <EditBoxIcon onClick={onClear}>
                                            <IoClose className='ri' />
                                        </EditBoxIcon>
                                        <EditBoxIconCheck onClick={() => onTab(document_id, datapoint_id, index)}>
                                            <IoCheckmark className='ri' />
                                        </EditBoxIconCheck>
                                    </EditBoxIcons>
                                )}
                            </EditBoxWrapper>
                        </Wrapper>
                    </EditBox>
                )}
            </ActiveBox>
        </>
    )
}

export default React.memo(ActiveBoxComp)
