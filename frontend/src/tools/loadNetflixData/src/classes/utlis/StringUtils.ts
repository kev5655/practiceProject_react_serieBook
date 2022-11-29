

export class StringUtils {

    static extractNumberFromString = (data: string) => {
        let strNumber: string = data.replace(/\D/gm, '');
        if (strNumber === '') return 0;
        return parseInt(strNumber);
    }

}