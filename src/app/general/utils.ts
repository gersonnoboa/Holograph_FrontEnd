export class Utils {
    static selectFromArray(array: Array<any>, property: string){
        let newArray = [];
        array.forEach(element => {
            newArray.push(element[property]);
        });
        return newArray;
    }
}