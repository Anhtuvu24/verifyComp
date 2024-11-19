import React from 'react';
import { PassiveBox } from '../index.styles';

interface PassiveBoxCompProps {
    box: number[];
    resize: number;
    passiveBoxRef: React.RefObject<HTMLDivElement>;
    isBCTC: boolean;
}

const PassiveBoxComp: React.FC<PassiveBoxCompProps> = ({ box, resize: r, passiveBoxRef, isBCTC }) => {
    const [x1, y1, x2, y2] = box;

    const x1r = x1 * r;
    const y1r = y1 * r;
    const x2r = x2 * r;
    const y2r = y2 * r;

    const width = x2r - x1r;
    const height = y2r - y1r;
    const top = y1r;
    const left = x1r;

    return (
        <PassiveBox style={{ width, height, top, left, background: isBCTC ? 'transparent' : undefined }} ref={passiveBoxRef} />
    );
};

export default React.memo(PassiveBoxComp);
