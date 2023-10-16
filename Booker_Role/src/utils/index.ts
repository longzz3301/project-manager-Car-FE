import { v4 as uuidv4 } from 'uuid';
import parsePhoneNumber from 'libphonenumber-js';
import { format, intervalToDuration, parse } from 'date-fns';
import { Obj } from 'global/interface';

const uuid = () => {
    return uuidv4() as unknown as string;
}
const formatPhoneNumber = (phone: string) => {
    const phoneNumber = parsePhoneNumber(phone);
    return phoneNumber?.formatInternational()
}
const phoneNumberFormatBase = (phone: string) => {
    let str = Array.from(phone);
    let countStandBy = 0;
    for (let i = 0; i < phone.length; i++) {
        if (i === 4) {
            str.splice(i, 0, '.');
        } else if (i > 4) {
            countStandBy++;
            if (countStandBy === 4) {
                str.splice(i, 0, '.');
                countStandBy = 0;
            }
        }
    }
    return str.join('');
}
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
const formatNumber = (val: number | string | undefined | null, digit?: number | undefined) => {
    if (typeof val === 'string' || !val) {
        return 0;
    } else {
        let parseNumber = digit ? val.toFixed(digit) : val;
        let sign = 1;
        if (Number(parseNumber) < 0) {
            sign = -1;
            parseNumber = -parseNumber;
        }
        let num = parseNumber.toString().includes('.') ? parseNumber.toString().split('.')[0] : parseNumber.toString();
        let len = num.toString().length;
        let result = '';
        let count = 1;

        for (let i = len - 1; i >= 0; i--) {
            result = num.toString()[i] + result;
            if (count % 3 === 0 && count !== 0 && i !== 0) {
                result = ',' + result;
            }
            count++;
        }
        if (parseNumber.toString().includes('.')) {
            result = result + '.' + parseNumber.toString().split('.')[1];
        }
        return sign < 0 ? '-' + result : result;
    }
}
const formatDateToString = (date: Date, formatStringOutPut?: string) => {
    return format(date as Date, formatStringOutPut || 'dd-MM-yyyy') || ''
}
const calculatorAge = (dob: string) => {
    const birthDate = parse(dob, "dd/MM/yyyy", new Date());
    const { years, months, days } = intervalToDuration({ start: birthDate, end: new Date() });
    return { years, months, days };
};
function dataPagination(array: Array<Obj>, pageSize: number, crrPage: number) {
    return array.slice((crrPage - 1) * pageSize, crrPage * pageSize);
}

const calculatePagesCount = (pageSize: number, lengthArray: number) => {
    return lengthArray < pageSize ? 1 : Math.ceil(lengthArray / pageSize);
};

export {
    uuid,
    formatPhoneNumber,
    scrollToTop,
    formatNumber,
    formatDateToString,
    phoneNumberFormatBase,
    calculatorAge,
    dataPagination,
    calculatePagesCount
};