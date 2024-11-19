// @ts-ignore
import React from 'react';
import useWindowSize from "../../utils/useWindowSize";
import { ConfigProvider, Drawer } from "antd";

// Components
import SubmissionData from "../SubmissionData/SubmissionData";

export interface VerifySubmissionDataProps {
    submission: any;
    datapoints: any;
    title: string;
    colorPrimary?: string;
    visible: boolean;
    getSubmissionLoading?: boolean;
    rightLoading?: boolean;
    tableLoading?: boolean;
    submissions?: any[];
    fields: any[];
    images: [];
    onClose: () => void;
    onAddRow: (table_id: string) => void;
    onRemoveRow: (row_id: string) => void;
    onValidateSubmission: () => void;
    onChangeSubmission: (type: string) => void;
    onValidateDatapoint: ({document_id, datapoint_id}: { document_id: string, datapoint_id: string }) => void;
    onUpdateField: ({ field_data_id, datapoint_id, value }: { field_data_id: string, datapoint_id?: any, value: any }) => void;
}

const VerifySubmissionData: React.FC<VerifySubmissionDataProps> = (props) => {
    const {
        submissions,
        submission,
        fields,
        datapoints,
        images,
        title,
        colorPrimary,
        visible,
        getSubmissionLoading,
        rightLoading,
        tableLoading,
        onAddRow,
        onRemoveRow,
        onClose,
        onValidateSubmission,
        onChangeSubmission,
        onValidateDatapoint,
        onUpdateField
    } = props;
    const { width } = useWindowSize();

    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: colorPrimary || '#EC1C2A',
            }
        }}>
            <Drawer
                title={title}
                placement='right'
                onClose={onClose}
                open={visible}
                width={width}
                headerStyle={{ height: 56 }}
                bodyStyle={{ padding: 0 }}
                keyboard={false}
            >
                <SubmissionData
                    images={images}
                    submission={submission}
                    fields={fields}
                    datapoints={datapoints}
                    getSubmissionLoading={getSubmissionLoading}
                    rightLoading={rightLoading}
                    tableLoading={tableLoading}
                    onChangeSubmission={onChangeSubmission}
                    onAddRow={onAddRow}
                    onRemoveRow={onRemoveRow}
                    onClose={onClose}
                    onValidateSubmission={onValidateSubmission}
                    onValidateDatapoint={onValidateDatapoint}
                    onUpdateField={onUpdateField}
                />
            </Drawer>
        </ConfigProvider>
    );
};

export default VerifySubmissionData;
