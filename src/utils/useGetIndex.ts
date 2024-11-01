type Status = 'for_review' | 'rejected' | 'for_verify';

interface Item {
    id: string;
    status: Status;
}

const isNotValidated = (obj: Item): boolean => obj.status === 'for_review' || obj.status === 'rejected';
const isNotVerified = (obj: Item): boolean => obj.status === 'for_review' || obj.status === 'for_verify';

const checkOptions: { [key: string]: (obj: Item) => boolean } = {
    not_validated: isNotValidated,
    not_verified: isNotVerified,
};

const check = (status: string, item: Item): boolean => {
    return checkOptions[status](item);
};

export default function useGetIndex(flatData: Item[], datapointId: string, status: string): [number, number | undefined, boolean, number[]] {
    const index = flatData?.findIndex(item => item.id === datapointId);
    const statusIndexArray = flatData
        .map((item, idx) => (item.id !== datapointId && check(status, item) ? idx : -1))
        .filter(idx => idx !== -1);
    const hasStatusIndex = statusIndexArray.length > 0;
    const nextIndex = statusIndexArray.find(idx => idx > index);

    return [index, nextIndex, hasStatusIndex, statusIndexArray];
}
