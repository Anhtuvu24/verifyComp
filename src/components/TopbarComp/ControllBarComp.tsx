import React from 'react';
import { Space } from 'antd';
import { ControlBar, ZoomContainer, ZoomButton } from './index.styles';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

interface ControlBarCompProps {
    ratio: number;
    setRatio: (ratio: (prevRatio: number) => number) => void;
}

const ControlBarComp: React.FC<ControlBarCompProps> = ({ ratio, setRatio }) => {
    const onZoomIn = () => {
        if (ratio === 200) return;
        setRatio(ratio => ratio + 20);
    };

    const onZoomOut = () => {
        if (ratio === 20) return;
        setRatio(ratio => ratio - 20);
    };

    return (
        <ControlBar>
            <Space size={12}>
                <ZoomContainer>
                    <ZoomButton onClick={onZoomOut}>
                        <MinusCircleOutlined />
                    </ZoomButton>
                    <div>{ratio}%</div>
                    <ZoomButton onClick={onZoomIn}>
                        <PlusCircleOutlined />
                    </ZoomButton>
                </ZoomContainer>
            </Space>
        </ControlBar>
    );
};

export default React.memo(ControlBarComp);
