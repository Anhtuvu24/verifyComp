import React from 'react';
import { IoMdCheckmark } from "react-icons/io";

// Components
import { ConfidenceScore } from "../../Common/common";

interface DataSourceItemProps {
    item: any;
    isActive: boolean;
    onSelectSource: () => void;
}

const DataSourceItem: React.FC<DataSourceItemProps> = ({ item, isActive, onSelectSource }) => {
    const { document: documentId, confidence_score, id, value, document } = item;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                background: isActive ? '#f0f7ff' : '#fff',
                padding: '4px 12px',
                fontWeight: isActive ? '500' : '400',
            }}
            onClick={onSelectSource}
        >
            <div>
                <IoMdCheckmark style={{ color: isActive ? '#00B497' : 'transparent' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12 }} className='ellipsisText'>
                    {value ? value : '(trống)'}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.64)' }}>{document?.name}</div>
            </div>
            <ConfidenceScore score={confidence_score} />
        </div>
    );
};

export default React.memo(DataSourceItem);
