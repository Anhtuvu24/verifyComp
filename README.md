# Tài liệu tích hợp chức năng focus hiển thị vị trí box trên ảnh
1. **Render\logic images**
   - Cấu trúc render 1 image
   ```javascript
    return (
        // ratio: tỷ lệ phóng to\thu nhỏ ảnh 
        <ImageContainer className={'imageContainer'} style={{ minWidth: `${ratio}%`, maxWidth: `${ratio}%` }}>
            {loaded && showActiveBox && hasActiveBox && activeData?.box?.length > 0 && (
                // ActiveBoxComp: component hiển thị vị trí của field trên ảnh   
                <ActiveBoxComp
                    item={activeData}
                    resize={resize}
                />
            )}
            // imageRef: thực hiện logic scroll và điều chỉnh vùng hiển thị
            {image && <Image src={urlImage} alt='img' onLoad={onLoad} ref={imageRef} />}
        </ImageContainer>
    );
   ```
   - Thực hiên tính toán tỷ lệ giữa kích thước gốc và kích thước hiển thị
   ```javascript
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
   ```
   > **NOTE**:
   > Mỗi khi thay đổi tỷ lệ phóng to/thu nhỏ cần tạo lại ảnh để phâần tính toán tỷ lệ kích thước gốc
     và kích thước hiển thị được đúng
   > ```javascript
   > const urlImage = useMemo(() => {
   >     if (image && imageFile) {
   >         return URL.createObjectURL(imageFile);
   >     }
   > }, [image, tableSelect, ratio]);
   > ```
2. **Render box**
   - Cấu trúc mẫu
   ```javascript
   return  (
    <ActiveBox style={{ width, height, top, left }} id={`active-box-${datapoint_id || field_data_id}`}  name={`active-box-${datapoint_id || field_data_id}`} />
   ) 
   ``` 
   - Tính toán tỷ lệ để hiển thị vị trí box trên ảnh
   ```javascript
   // box: vị trí do bên AI trả về
   const [x1, y1, x2, y2] = box;
   
   // resize: tỷ lệ giữa kích thước gốc và kích thước hiển thị thực của ảnh 
   const x1r = x1 * resize;
   const y1r = y1 * resize;
   const x2r = x2 * resize;
   const y2r = y2 * resize;

   const width = x2r - x1r;
   const height = y2r - y1r;
   const top = y1r;
   const left = x1r; 
   ```
   
3. **Thực hiện scroll tới vị trí field/box tương ứng**
   - Xử lý scroll tới field
      > **NOTE**: Sử dụng React-scroll
      ```javascript
      const scrollToRightContainer = (dataId: string) => {
        let goToContainer = new Promise((resolve, reject) => {
            Events.scrollEvent.register('begin', () => {
                resolve();
                Events.scrollEvent.remove('begin');
            });
            // scroll-container: id box chứa các field
            scroller.scrollTo('scroll-container', {
                duration: 0,
                delay: 0,
                smooth: 'easeInOutQuart',
                ignoreCancelEvents: true,
            });
        });

        goToContainer.then(() =>
            // datapoint-${dataId}: id box chứa field
            scroller.scrollTo(`datapoint-${dataId}`, {
                duration: 500,
                delay: 0,
                smooth: 'easeInOutQuart',
                containerId: 'scroll-container',
                ignoreCancelEvents: true,
                offset: -300,
            })
        );
      };
      ```
   - Xử lý scroll box chứa images và scroll tới vị trí field nm trong ảnh
      ```javascript
      const scrollToDocumentContainer = (datapointId: string) => {
        let goToContainer = new Promise((resolve, reject) => {
            Events.scrollEvent.register('end', () => {
                resolve();
                Events.scrollEvent.remove('end');
            });
            // document-scroll-container: id box chứa images
            scroller.scrollTo('document-scroll-container', {
                duration: 0,
                delay: 0,
                smooth: 'easeInOutQuart',
            });
        });

        goToContainer.then(() =>
            // active-box-${datapointId}: id box (vị trí) của field trên ảnh
            scroller.scrollTo(`active-box-${datapointId}`, {
                duration: 500,
                delay: 0,
                smooth: 'easeInOutQuart',
                containerId: 'document-scroll-container',
                offset: -300,
            })
        );
      };
      ```  
   - Xử lý đưa view của box vào khoảng nhìn thấy với trường hợp ảnh lớn hơn khoảng view
      ```javascript
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
      ```
