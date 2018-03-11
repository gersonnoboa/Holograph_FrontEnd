export enum LogType {
    ActiveTime = "Has active time only",
    StartAndEndDate = "Has start and end date",
    Timestamp = "Has timestamp only"
}

export class SelectInfo {
    value: number;
    text: string;

    constructor(value: number, text: string) {
        this.value = value;
        this.text = text;
    }
}

export class VariantSelectInfo extends SelectInfo {
    
    activities: Array<string>;

    constructor(value: number, text: string, activities: Array<string>) {
        super(value, text);
        this.activities = activities;
    }
}