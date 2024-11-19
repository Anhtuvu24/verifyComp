import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ImageContainer, Image } from './index.styles';
import ActiveBoxComp from './ChildComps/ActiveBox';

interface RenderPageImageProps {
    onTab: (document_id: string, datapoint_id: string, index: number) => void;
    tableSelect: any;
    onDatapointKeyDown: (e: React.KeyboardEvent, document_id: string, datapoint_id: string, index: number) => void;
    onChangeFieldDataValue: (id: string, value: any) => void;
    setShowActiveBox: (type: boolean) => void;
    showActiveBox: boolean;
    isReadOnly: boolean;
    isVerify: boolean;
    image: any;
    pageId: string;
    activeFieldData: any;
    fieldDataValues: any;
    focusDatapoints: any;
    debounced: any;
    ratio: number;
}

const RenderPageImage: React.FC<RenderPageImageProps> = ({
    onTab,
    tableSelect,
    onChangeFieldDataValue,
    onDatapointKeyDown,
    setShowActiveBox,
    showActiveBox,
    isReadOnly,
    isVerify,
    image,
    pageId,
    activeFieldData: activeData,
    fieldDataValues,
    focusDatapoints,
    debounced,
    ratio,
}) => {
    const { imageFile } = image;
    const imageRef = useRef<HTMLImageElement>(null);

    const [loaded, setLoaded] = useState(false);
    const [resize, setResize] = useState(1);
    const { page } = activeData || {};
    const hasActiveBox = page === pageId;

    const urlImage = useMemo(() => {
        if (image && imageFile) {
            return URL.createObjectURL(imageFile);
        }
    }, [image, tableSelect, ratio]);

    useEffect(() => {
        if (pageId === page && loaded && imageRef.current && activeData.box?.length) {
            imageRef.current.scrollIntoView({ behavior: 'smooth' });

            const fieldElement = document.querySelector(`#active-box-${activeData.id || activeData.field_data_id}`);
            if (fieldElement) {
                const containerRect = imageRef.current.getBoundingClientRect();
                const fieldRect = fieldElement.getBoundingClientRect();
                const isVisibleInContainer =
                    fieldRect.top >= containerRect.top &&
                    fieldRect.bottom <= containerRect.bottom;
                if (!isVisibleInContainer) {
                    const containerScrollTop = imageRef.current.scrollTop;
                    const containerScrollHeight = imageRef.current.scrollHeight;
                    const containerHeight = containerRect.height;

                    if (fieldRect.top < containerRect.top) {
                        imageRef.current.scrollTop = containerScrollTop + (fieldRect.top - containerRect.top);
                    } else if (fieldRect.bottom > containerRect.bottom) {
                        imageRef.current.scrollTop = containerScrollTop + (fieldRect.bottom - containerRect.bottom);
                    }

                    if (imageRef.current.scrollTop < 0) {
                        imageRef.current.scrollTop = 0;
                    } else if (imageRef.current.scrollTop + containerHeight > containerScrollHeight) {
                        imageRef.current.scrollTop = containerScrollHeight - containerHeight;
                    }
                }

                const parentDiv = document.querySelector('#document-scroll-container');
                if (parentDiv) {
                    const parentRect = parentDiv.getBoundingClientRect();
                    const parentScrollTop = parentDiv.scrollTop;
                    const parentHeight = parentRect.height;
                    const fieldHeight = fieldRect.height;
                    // Tính toán khoảng cách cần thiết để cuộn phần tử vào giữa parentDiv
                    const scrollOffset = fieldRect.top - parentRect.top - (parentHeight / 2) + (fieldHeight / 2);

                    // Cập nhật vị trí scrollTop của parentDiv để đặt fieldElement ở giữa
                    parentDiv.scrollTop = parentScrollTop + scrollOffset;
                    if (parentDiv.scrollTop < 0) {
                        parentDiv.scrollTop = 0;
                    } else if (parentDiv.scrollTop + parentHeight > parentDiv.scrollHeight) {
                        parentDiv.scrollTop = parentDiv.scrollHeight - parentHeight;
                    }
                }
            }
        }
    }, [pageId, activeData, page, loaded, imageRef]);

    const onLoad = ({ currentTarget }: React.SyntheticEvent<HTMLImageElement>) => {
        const { clientWidth, naturalWidth, complete } = currentTarget;
        const r = clientWidth / naturalWidth;
        if (r !== resize) {
            setResize(r);
        }
        if (complete) {
            setLoaded(true);
        }
    };
    return (
        <ImageContainer className={'imageContainer'} style={{ minWidth: `${ratio}%`, maxWidth: `${ratio}%` }}>
            {loaded && showActiveBox && hasActiveBox && activeData?.box?.length > 0 && (
                <ActiveBoxComp
                    item={activeData}
                    fieldDataValues={fieldDataValues}
                    focusDatapoints={focusDatapoints}
                    onTab={onTab}
                    onChangeFieldDataValue={onChangeFieldDataValue}
                    onDatapointKeyDown={onDatapointKeyDown}
                    setShowActiveBox={setShowActiveBox}
                    isReadOnly={isReadOnly}
                    isVerify={isVerify}
                    resize={resize}
                    debounced={debounced}
                />
            )}
            {image && <Image src={urlImage} alt='img' onLoad={onLoad} ref={imageRef} />}
        </ImageContainer>
    );
};

export default React.memo(RenderPageImage);
