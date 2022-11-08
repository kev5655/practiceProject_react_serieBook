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

    public static generate2DArray = (row: number, colum: number, fillUp: any): any[][] => {
        // let array2D: any[][] = new Array(row)
        // array2D.forEach((array, index) => {
        //     array[index] = new Array(colum);
        // })
        return Array(row).fill(null).map(() => Array(colum).fill(fillUp))

    }

    public static changeRowAndColum = (array2D: string[][]): string[][] => {
        //let changedArray: string[][] = new Array(ArrayUtils.countLongestColum(array2D));
        let changedArray = ArrayUtils.generate2DArray(
            ArrayUtils.countLongestColum(array2D), array2D.length, null
        );
        array2D.forEach((array, index1) => {
            array.forEach((element, index2) => {
                changedArray[index2][index1] = element;
            })
        })

        return changedArray;
    }


}