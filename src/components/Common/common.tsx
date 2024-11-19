import React from 'react';
import { Confidence } from "./common.styles";

interface ConfidenceScoreProps {
    score: number;
}

export const ConfidenceScore: React.FC<ConfidenceScoreProps> = ({ score }) => {
    // @ts-ignore
    return (
        <Confidence score={score}>{(score * 100).toFixed(1)}%</Confidence>
    );
};
