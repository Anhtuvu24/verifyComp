// import React from 'react';
//
// // Components
// import SelectSourceData from "./SelectSourceData";
// import DatapointCheckboxItem from "./DatapointCheckboxItem";
//
// // Styles
// import { Datapoint, Title } from "../index.styles";
//
// interface SectionCheckboxProps {
//     datapoint: any;
//     inputRefs: any;
//     isReadOnly: boolean;
//     focusDatapoints: any;
//     onDatapointKeyDown: (e: React.KeyboardEvent, document_id: string, datapoint_id: string, index: number) => void;
//     onFocusDatapoint: (document_id: string, datapoint_id: string, data: any) => void;
//     debounced: (field_data_id: string, value: string) => void;
//     onMapData: (field_data_id: string, source_id: string) => void;
//     onMouseDownDatapoint: (datapoint_id: string) => void;
// }
//
// const SectionCheckbox: React.FC<SectionCheckboxProps> = ({
//     datapoint: field_data,
//     inputRefs,
//     isReadOnly,
//     focusDatapoints,
//     onDatapointKeyDown,
//     onFocusDatapoint,
//     debounced,
//     onMapData,
//     onMouseDownDatapoint,
// }) => {
//     const { submission_field, field_data_set } = field_data;
//
//     return (
//         <Datapoint style={{ alignItems: 'start' }}>
//             {/*{statusIconOptions[undefined]}*/}
//             <Title>{submission_field.name}</Title>
//             <SelectSourceData />
//             <span style={{ margin: '0 4px' }}>:</span>
//             <div style={{ flex: 1 }}>
//                 {field_data_set.map((f: any) => (
//                     <DatapointCheckboxItem
//                         key={f.id}
//                         datapoint={f}
//                         inputRefs={inputRefs}
//                         isReadOnly={isReadOnly}
//                         focusDatapoints={focusDatapoints}
//                         onDatapointKeyDown={onDatapointKeyDown}
//                         onFocusDatapoint={onFocusDatapoint}
//                         debounced={debounced}
//                         onMapData={onMapData}
//                         onMouseDownDatapoint={onMouseDownDatapoint}
//                     />
//                 ))}
//             </div>
//         </Datapoint>
//     );
// };
//
// export default React.memo(SectionCheckbox);
