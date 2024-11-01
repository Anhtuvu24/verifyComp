// @ts-ignore
import React from 'react';
import useWindowSize from "../../utils/useWindowSize";
import { Drawer } from "antd";

export interface VerifySubmissionDataProps {
    title: string;
    visible: boolean;
    onClose: () => void;
}

const VerifySubmissionData: React.FC<VerifySubmissionDataProps> = (props) => {
    const { title, visible, onClose } = props;
    // const { folderId } = useParams();
    const { width } = useWindowSize();

    // const { openReviewSubmissionData, submissionId } = query;
    // const folder = useGetFolder(folderId);
    // const submission = useGetSubmission(folderId, submissionId, true);

    // const { submission_type, verification } = folder || {};
    // const { name, status } = submission || {};
    // useWebSocket({ submission_id: submissionId });

    // const onClose = () => setQuery({ openReviewSubmissionData: undefined, submissionId: undefined });
    // const component = getComponent(status, submission_type?.url_key_type, verification);

    return (
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
            {/*{component}*/}
        </Drawer>
    );
};

export default VerifySubmissionData;
