import React, { useState } from 'react';
import { Popover } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

// Components
import DataSourceItem from "./DataSourceItem";

// Styles
import { PopoverStyled } from '../index.styles';

interface SelectSourceDataProps {
    sources: any[];
    selectedId: string;
    onSelect: (source: any) => void;
}

const SelectSourceData: React.FC<SelectSourceDataProps> = ({ sources = [], selectedId, onSelect }) => {
    const [visibleSelect, setVisibleSelect] = useState(false);
    const hasMultiSource = sources.length > 1;

    const onSelectSource = (source: any) => {
        onSelect(source);
        setVisibleSelect(false);
    };

    const content = (
        <>
            {sources.map((source, index) => (
                <DataSourceItem
                    key={index}
                    item={source}
                    isActive={source.id === selectedId}
                    onSelectSource={() => onSelectSource(source)}
                />
            ))}
        </>
    );

    return (
        <PopoverStyled>
            <Popover
                arrowPointAtCenter
                content={content}
                onOpenChange={() => setVisibleSelect(visible => !visible)}
                placement='top'
                trigger='click'
                open={hasMultiSource && visibleSelect}
                getPopupContainer={triggerNode => triggerNode}
            >
                <InfoCircleOutlined style={{ color: hasMultiSource ? '#000' : '#fff' }} />
            </Popover>
        </PopoverStyled>
    );
};

export default React.memo(SelectSourceData);
