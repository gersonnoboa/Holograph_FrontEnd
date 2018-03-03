import { VariantSelectInfo } from "./general";

export class Utils {
    static selectFromArray(array: Array<any>, property: string){
        let newArray = [];
        array.forEach(element => {
            newArray.push(element[property]);
        });
        return newArray;
    }

    static getVariantInfoForSelect(data) {
        let variants = [];

        let activityList = Utils.selectFromArray(data, "activity_list");

        for (let index = 0; index < activityList.length; index++) {
            let variantNumber = index + 1;
            let activitiesCount = activityList[index].length;
            let activitiesText = (activitiesCount == 1) ? "activity" : "activities";
            let text = `Variant ${variantNumber} (${activitiesCount} ${activitiesText})`;

            let info = new VariantSelectInfo(index, text);
            variants.push(info);
        }

        return variants
    }
}