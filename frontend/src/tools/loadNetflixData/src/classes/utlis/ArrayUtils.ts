export class ArrayUtils {


    public static countLongestColum = (array2D: any[][]): number => {
        let maxColumLength: number = 0;
        array2D.forEach((array, index) => {
            if (array.length > maxColumLength) {
                maxColumLength = array.length;
            }
        });
        return maxColumLength;
    }

    public static generate2DArray = (row: number, colum: number, fillUp: any): string[][] | null[][] => {
        return Array(row).fill(null).map(() => Array(colum).fill(fillUp))

    }

    public static changeRowWithColum = (array2D: any[][]): unknown[][] | null[][] => {
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

    public static countDuplicate = (arr: (string|null)[]): any => {
        let counts: any = {};
        if (arr === undefined) arr = [];
        for (const key of arr) {
            if (key === null) {
                //console.error("Arr has null values: ", key);
                continue;
            }
            counts[key] = (counts[key] || 0) + 1;
        }
        return counts;
    }

    public static countDuplicateMap = (arr: string[] | null[]): Map<string, number> => {
        let counts: Map<string, number> = new Map<string, number>;
        if (arr === undefined) arr = [];
        for (const key of arr) {
            if (key === null) {
                //console.error("Arr has null values: ", key);
                continue;
            }
            counts.set(key, (counts.get(key) || 0) + 1);
            //counts[key] = (counts[key] || 0) + 1;
        }
        return counts;
    }

    //deepCounter: number = 0;
    //public static convertArrayToMap = (arr2D: string[][]): any => {
    //    let counter: Map<string, number> =
    //        ArrayUtils.countDuplicateMap(ArrayUtils.changeRowWithColum(arr2D)[0]);
    //    let n: number = 0;
    //    for (let value of counter.values()) {
    //        if (value > 1) {
    //            break
    //        } else {
    //            n++;
    //            if (counter.size === n) {
    //                return null;
    //            }
    //        }
    //    }
    //    let globalMap = new Map<string, Array<Array<string>>>;
    //    for (let i = 0; i < arr2D.length; i++) {
    //        let key: string = arr2D[i][0];
    //        let mapArray: string[][] | undefined = globalMap.get(key);
    //        let dataArray: string[] = arr2D[i].slice(1);
    //        if (mapArray === undefined) mapArray = [dataArray];
    //        else mapArray.push(dataArray);
    //        globalMap.set(key, mapArray);
    //    }
    //    for (const array of globalMap.values()) {
    //        ArrayUtils.convertArrayToMap(array);
    //    }
    //    console.log(globalMap);
    //    return globalMap;
    //}

    public static countLastEpisode = (arr2D: (string | Date)[][]): any => {
        let arr: (unknown)[][] = ArrayUtils.changeRowWithColum(arr2D);
        let lastEpisode: string[] = ArrayUtils.findFistDateIndex(arr);
        let haveDuplicated: boolean = false;

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (lastEpisode[i] === arr[i][j]) {
                    haveDuplicated = true;
                }

            }
            if(! haveDuplicated){
                console.log(arr, arr[i].length  + 1)
                return arr[i].length  + 1;
            }
            haveDuplicated = false;
            for (let j = 0; j < arr[i].length; j++) { // Remove Element
                if (lastEpisode[i] !== arr[i][j]) {
                    for (let k = 0; k < arr.length; k++) {
                        arr[k].splice(j, 1);
                    }
                    //console.log("Arr: ", arr);
                }
            }
        }
        console.log(arr)

    }

    private static findFistDateIndex = (arr: (unknown)[][]): string[] => {

        console.log(arr);
        let lastIndex: number = arr.length - 1;
        let columIndex: number = Infinity;
        let minDate: Date = new Date(0);

        for (let i = 0; i < arr[lastIndex].length; i++) {
            let date: unknown = arr[lastIndex][i];
            if (date instanceof Date) {
                if (minDate.getTime() < date.getTime()) {
                    minDate = date;
                    columIndex = i;
                }
            } else if (date === null) {
                i--;
                lastIndex--;
            } else { // date ist type of string
                i--;
                lastIndex++;
            }
        }

        let newestEpisode: string[] = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][columIndex] === null) continue;
            if (arr[i][columIndex] instanceof Date) continue;
            newestEpisode.push((arr[i][columIndex] as string));
            arr[i].splice(columIndex, 1);
        }
        return newestEpisode;
    }


}

/*
// @ts-ignore
                let key: string = arr[arrI-1][eleI];

                let dataArr: string[] | undefined = map.get(key);
                if(dataArr === undefined) { // @ts-ignore
                    dataArr = [arr[arrI][eleI]];
                }
                else { // @ts-ignore
                    dataArr.push(arr[arrI][eleI]);
                }

                // @ts-ignore
                let ele = map.get(...dataArr);
                if(ele !== undefined){
                    let tempMap: Map<string, string[]> = new Map<string, string[]>;
                    // @ts-ignore
                    tempMap.set(...dataArr, map.get(...dataArr))
                    // @ts-ignore
                    dataMap.set(key, tempMap);
                    continue;
                }

                // @ts-ignore


                // @ts-ignore
                map.set(key, dataArr);
 */

/*
const map = new Map([
            ["A", {
                values: null,
                map: new Map([
                    ["B", {
                        values: ["G"],
                        map: new Map([
                            ["C", {
                                values: ["D", "F"],
                                map: null
                            }]
                        ])
                    }],
                    ["H", {
                        values: ["I"],
                        map: null
                    }]
                ])
            }],
            ["B", {
                values: ["J"],
                map: null,
            }]
        ]);
        console.log(map);
        // @ts-ignore
        console.log(map.get("A").map.get("B").map.get("C").values)
 */