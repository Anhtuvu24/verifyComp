import { createRef, useEffect, useState, RefObject } from 'react';

export default function useRefsArray(arrLength: number): [RefObject<HTMLInputElement>[]] {
    const [refs, setRefs] = useState<RefObject<HTMLInputElement>[]>([]);

    useEffect(() => {
        setRefs(refs =>
            Array(arrLength)
                .fill(null)
                .map((_, i) => refs[i] || createRef<HTMLInputElement>())
        );
    }, [arrLength]);

    return [refs];
}
