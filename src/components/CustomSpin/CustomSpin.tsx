import React, { ReactNode, CSSProperties } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface CustomSpinProps {
    size?: number;
    children?: ReactNode;
    spinning?: boolean;
    style?: CSSProperties;
}

const CustomSpin: React.FC<CustomSpinProps> = ({ size = 14, children, spinning = true, style }) => {
    return (
        <Spin
            spinning={spinning}
            size='large'
            style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', ...style }}
            indicator={<LoadingOutlined style={{ fontSize: size }} spin />}
        >
            {children}
        </Spin>
    );
};

export default CustomSpin;
