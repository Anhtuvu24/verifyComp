import React, { useEffect, useState, RefObject } from 'react'
import { Form, DatePicker } from 'antd'
import { CellDatapoint } from './index.styles'
import { IoMdCheckmark } from 'react-icons/io'
import { FcCancel } from 'react-icons/fc'
import useGetIndex from '../../utils/useGetIndex'
import moment from 'moment'
import 'moment/locale/vi'
import locale from 'antd/es/date-picker/locale/vi_VN'

const style = {
    fontSize: 16,
    verticalAlign: 'middle',
}

const statusIconOptions = {
    for_review: <IoMdCheckmark style={{ ...style, color: 'rgba(0,0,0,0.1)' }} />,
    for_verify: <IoMdCheckmark style={{ ...style, color: '#00B497', transition: 'all 0.1s' }} />,
    verified: <IoMdCheckmark style={{ ...style, color: '#00B497' }} />,
    rejected: <FcCancel style={style} />,
    undefined: <IoMdCheckmark style={{ ...style, color: 'transparent' }} />,
}

interface DobCellItemProps {
    datapoint: any; // Replace 'any' with the specific type if known
    inputCellRefs: RefObject<HTMLInputElement>[];
    isReadOnly: boolean;
    flatData: any;
    onFocusCell: () => void;
    onKeyDownCell: () => void;
    onMouseDownCell: () => void;
    debounced: boolean;
}

const DobCellItem: React.FC<DobCellItemProps> = ({
    datapoint: field_data,
    inputCellRefs,
    isReadOnly,
    flatData,
    onFocusCell,
    onKeyDownCell,
    onMouseDownCell,
    debounced,
}) => {
    // const dispatch = useDispatch()
    const [form] = Form.useForm()

    const { id: field_data_id, submission_field, value, data: selected_id, data_source } = field_data
    const isNumberField = submission_field.data_type === 'number'

    const [selectedData, setSelectedData] = useState(data_source?.find((data: any) => data.id === selected_id))
    const { id: datapoint_id, document: document_id, confidence_score, status } = selectedData || {}

    const [index, nextIndex] = useGetIndex(flatData, field_data_id, 'not_validated')
    const datapointRef = inputCellRefs[index]

    // const syncStatus = useSelector(state => state.docbase.entities.datapoint.all[datapoint_id]?.status)
    // const fieldDataValue = useSelector(state => state.docbase.entities.datapoint.values[field_data_id])
    const fieldDataValue = {}
    // const active_field_data_id = useSelector(state => state.docbase.entities.field_data.activeFieldData?.field_data_id)

    useEffect(() => {
        if (value && moment(value, 'DD/MM/YYYY').isValid()) {
            form.setFieldsValue({
                [field_data_id]: moment(value, 'DD/MM/YYYY'),
            })
        }
    }, [field_data_id, submission_field, value, form])

    useEffect(() => {
        if (fieldDataValue === undefined) return
        if (fieldDataValue && moment(fieldDataValue, 'DD/MM/YYYY').isValid()) {
            form.setFieldsValue({
                [field_data_id]: moment(fieldDataValue, 'DD/MM/YYYY'),
            })
        }
    }, [fieldDataValue, field_data_id, form])

    const onKeyDown = (e: any) => {
        // onKeyDownCell(e, document_id, datapoint_id, index, nextIndex)
    }

    const onMouseDown = (e: any) => {
        // onMouseDownCell(datapoint_id)
    }

    const onFocus = (e: any) => {
        e.preventDefault()
        // onFocusCell(document_id, datapoint_id, {
        //     ...selectedData,
        //     value,
        //     field_data_id: field_data_id,
        //     name: submission_field.name,
        //     data_type: submission_field.data_type,
        //     is_cell: true,
        // })
    }

    const onChange = (date: any, dateString: (string | string[])) => {
        // dispatch(changeFieldDataValue(field_data_id, dateString))
        // debounced(field_data_id, dateString)
    }

    return (
        <CellDatapoint>
            <Form form={form} component={false}>
                <Form.Item name={field_data_id} style={{ marginBottom: 0, flex: 1 }}>
                    <DatePicker
                        onChange={onChange}
                        ref={datapointRef}
                        onMouseDown={onMouseDown}
                        onFocus={onFocus}
                        onKeyDown={onKeyDown}
                        format='DD/MM/YYYY'
                        placeholder='dd/mm/yyyy'
                        showToday={false}
                        showNow={false}
                        locale={locale}
                        inputReadOnly={isReadOnly}
                        allowClear={false}
                        open={!isReadOnly && undefined}
                        style={{
                            padding: '4px 14px 4px 4px',
                            borderRadius: 0,
                            boxShadow: 'none',
                            width: '100%',
                            height: 28.85,
                        }}
                    />
                </Form.Item>
            </Form>
        </CellDatapoint>
    )
}
