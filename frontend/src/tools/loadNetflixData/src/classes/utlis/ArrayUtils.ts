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
    //ToDo add Type for return
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