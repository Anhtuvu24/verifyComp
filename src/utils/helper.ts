interface ArrayItem {
    id: string;
    [key: string]: any;
}

export function arrayToObject(arr: any[]): { [key: string]: ArrayItem } {
    if (!arr) return {};

    let obj: { [key: string]: ArrayItem } = {};
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i].id] = arr[i];
    }

    return obj;
}
