import styled from "styled-components";

interface ConfidenceProps {
    score: number;
}

export const Confidence = styled.span<ConfidenceProps>`
  color: ${({ score }) => (score > 0.9 ? '#00B497' : '#E9A700')};
  margin-left: 8px;
  opacity: ${({ score }) => (score ? 1 : 0)};
  font-size: 10px;
  width: 27px;
`;
