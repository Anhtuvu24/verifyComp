export function formatNumber(value: number | string): string | number {
    if (value === 0) return 0;
    if (!value || value === '0') return '';
    value = value.toString().replace(/,/g, '');
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

export function stringToInt(string: string): number | string {
    // loại bỏ chữ
    string = string.replace(/[^0-9]/g, '');

    if (string === '0') {
        return 0;
    }
    if (string === '00') {
        return '00';
    }
    if (!string) {
        return '';
    }
    return parseFloat(string);
}

export function formatCredit(string: string): string {
    const index = string.indexOf('.');
    const list = string.split('.');
    let v1 = stringToInt(list[0]);
    v1 = v1 === 0 ? 0 : formatNumber(v1);
    const v2 = list[1] ? list[1] : null;

    if (index > 0) {
        if (v2 !== null) {
            return `${v1}.${v2}`;
        }
        return `${v1}.`;
    }
    return `${v1}`;
}

export function formatNumber2(value: number | string): string | number {
    if (value === 0) return 0;
    if (!value || value === '0') return '';

    let result = '';
    value = value.toString();
    while (value.length > 3) {
        result = `.${value.slice(-3)}${result}`;
        value = value.slice(0, value.length - 3);
    }
    if (value) {
        result = value + result;
    }
    return `${result}`;
}

export function formatVND(string: string): string {
    if (!string) return '';
    const index = string.indexOf(',');
    const list = string.split(',');
    let v1 = stringToInt(list[0]);
    v1 = v1 === 0 ? 0 : formatNumber2(v1);
    let v2 = list[1] ? stringToInt(list[1]) : null;

    if (index > 0) {
        if (v2 !== null) {
            return `${v1},${v2}`;
        }
        return `${v1},`;
    }
    return `${v1}`;
}

export function formatTime(s: number): string {
    if (!s) return '';
    // const days = parseInt(s / (24 * 60 * 60));
    // let tmp = s - days * 24 * 60 * 60;

    const hours = parseInt((s / 3600).toString());
    let tmp = s - hours * 3600;

    const minutes = parseInt((tmp / 60).toString());
    tmp -= minutes * 60;

    const seconds = parseFloat((s - (hours * 3600 + minutes * 60)).toFixed(2));
    let result = '';
    let count = 0;
    // if (days > 0) {
    //   result += `${days}d `;
    //   count++;
    // }
    if (hours > 0) {
        result += `${hours}h `;
        count++;
    }

    if (count === 2) {
        return result;
    }

    if (minutes > 0) {
        result += `${minutes}m `;
        count++;
    }

    if (count === 2) {
        return result;
    }

    if (seconds > 0) {
        result += `${seconds}s `;
        count++;
    }

    return result;
}
