export enum LogType {
    ActiveTime = "Has active time only",
    StartAndEndDate = "Has start and end date",
    Timestamp = "Has timestamp only"
}

export class VariantSelectInfo {
    value: number;
    text: string;

    constructor(value: number, text: string) {
        this.value = value;
        this.text = text;
    }
}