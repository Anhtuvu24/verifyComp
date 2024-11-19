import React, { useEffect, useState } from 'react';
import { Topbar } from './index.styles';
import { Space, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import ControlBarComp from './ControllBarComp';

interface TopbarCompProps {
    isReadOnly: boolean;
    // submissions: any[];
    // submission: any;
    name: string;
    ratio: number;
    setRatio: (ratio: (prevRatio: number) => number) => void;
    imagesLoaded: boolean;
    // moreAction: React.ReactNode;
    submitRef: React.RefObject<HTMLButtonElement>;
    submitFocused: boolean;
    onClose?: () => void;
    onValidateSubmission?: () => void;
    onChangeSubmission?: (type: string) => void;
    onSubmitKeyDown: (e: React.KeyboardEvent) => void;
}

const TopbarComp: React.FC<TopbarCompProps> = ({
    isReadOnly,
    // submissions,
    // submission,
    name,
    ratio,
    setRatio,
    imagesLoaded,
    // moreAction,
    submitRef,
    submitFocused,
    onClose,
    onValidateSubmission,
    onChangeSubmission,
    onSubmitKeyDown,
}) => {
    // const { folderId } = useParams<{ folderId: string }>();
    // const [query, setQuery] = useQueryParams({
    //     page: withDefault(NumberParam, 1),
    //     openSubmission: BooleanParam,
    //     openReviewSubmissionData: BooleanParam,
    // });
    // const { page } = query;
    // const index = submissions.findIndex((s: any) => s.id === submission.id);
    // // @ts-ignore
    // const { next, previous }: { next?: any; previous?: any } = {
    //     next: submissions[index + 1],
    //     previous: submissions[index - 1]
    // } || {};
    // const list = submissions.filter((s: any) => s.status === 'for_review');


    // const [loaded, setLoaded] = useState(false);
    // const [type, setType] = useState<string>('');

    // useDidUpdateEffect(() => {
    //     if (getSubmissionFieldRequest.status === 'success') {
    //         setLoaded(true);
    //     }
    // }, [getSubmissionFieldRequest.status]);

    const onNavigation = (type: 'next' | 'prev', validate?: boolean) => {
        if (onChangeSubmission) {
            onChangeSubmission(type);
        }
    };

    const onSubmit = () => {
        if (onValidateSubmission) {
            onValidateSubmission();
        }
        // dispatch(validateSubmission({ org_id, folder_id: folderId, submission_id: submissionId }));
    };

    return (
        <Topbar>
            <Space>
                <CloseOutlined
                    style={{ cursor: 'pointer' }}
                    // onClick={() => setQuery({ openReviewSubmissionData: undefined })}
                    onClick={onClose}
                />
                {onChangeSubmission && <Button
                    icon={<IoChevronBack className='ri-sm' />}
                    style={{ width: 36, height: 36 }}
                    // disabled={index === 0 && !previous}
                    onClick={() => onNavigation('prev')}
                    type='text'
                />}
                <div>{name}</div>
                {onChangeSubmission && <Button
                    icon={<IoChevronForward className='ri-sm' />}
                    style={{ width: 36, height: 36 }}
                    // disabled={index === list.length - 1 && !next}
                    onClick={() => onNavigation('next')}
                    type='text'
                />}
                {imagesLoaded && <ControlBarComp ratio={ratio} setRatio={setRatio} />}
                {/*{moreAction}*/}
            </Space>
            {/*{loaded && (*/}
            <Space>
                {!isReadOnly && (
                    <Button
                        type='primary'
                        onClick={onSubmit}
                        // loading={loading}
                        style={{ height: 36 }}
                        ref={submitRef}
                        className={submitFocused ? 'blinking' : ''}
                        onKeyDown={onSubmitKeyDown}
                    >
                        Xác nhận
                    </Button>
                )}
            </Space>
            {/*)}*/}
        </Topbar>
    );
};

export default React.memo(TopbarComp);
