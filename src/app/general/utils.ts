import { VariantSelectInfo, SelectInfo } from "./general";
import { element } from "protractor";

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
            let activities = activityList[index];
            let activitiesCount = activities.length;
            let activitiesText = (activitiesCount == 1) ? "activity" : "activities";
            let text = `Variant ${variantNumber} (${activitiesCount} ${activitiesText})`;

            let info = new VariantSelectInfo(index, text, activities);
            variants.push(info);
        }

        return variants;
    }

    static getActivityInfoForSelect(data) {
        let activities = [];

        data.forEach((element, i) => {
            let info = new SelectInfo(i, element["activity"]);
            activities.push(info);
        });

        return activities;
    }

    static getInfoForSelect(data, field) {
        let elements = [];
        
        data.forEach((element, i) => {
            let info = new SelectInfo(i, element[field]);
            elements.push(info);
        });

        return elements;
    }

    static generateSelectFromStrings(information) {
        let elements = [];

        information.forEach((element, i) => {
            let info = new SelectInfo(element, element);
            elements.push(info);
        });

        return elements;
    }

    static getUniques(array) {
        return Array.from(new Set(array));
    }   

    static getSafeFirst(array) {
        if (array == undefined || array == null || array.length == 0) return null;
        return array[0];
    }
}