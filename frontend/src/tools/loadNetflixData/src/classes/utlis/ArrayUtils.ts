export class ArrayUtils {


    public static countLongestColum = (array2D: any[][]): number => {
        let maxColumLength: number = 0;
        array2D.forEach((array, index) => {
            if(array.length > maxColumLength){
                maxColumLength = array.length;
            }
        });
        return maxColumLength;
    }

    public static generate2DArray = (row: number, colum: number, fillUp: any): string[][] | null[][] => {
        return Array(row).fill(null).map(() => Array(colum).fill(fillUp))

    }

    public static changeRowWithColum = (array2D: string[][]): string[][] | null[][] => {
        let changedArray: string[][] | null[][] = ArrayUtils.generate2DArray(
            ArrayUtils.countLongestColum(array2D), array2D.length, null
        );
        array2D.forEach((array, index1) => {
            array.forEach((element, index2) => {
                changedArray[index2][index1] = element;
            })
        })

        return changedArray;
    }

    public static countDuplicate = (arr: string[] | null[]): any => {
        let counts: any = {};
        if(arr === undefined) arr = [];
        for (const key of arr) {
            if (key === null) {
                //console.error("Arr has null values: ", key);
                continue;
            }
            counts[key] = (counts[key] || 0) + 1;
        }
        return counts;
    }
}