export class AlertState {
    shouldShow: Boolean;
    type: AlertType;
    message: string;

    constructor() {
        this.shouldShow = false;
    }

    showAlert(type: AlertType, message: string) {
        this.shouldShow = true;
        this.type = type;
        this.message = message;
    }

    hideAlert() {
        this.shouldShow = false;
        this.type = null;
        this.message = null;
    }
}

export enum AlertType {
    Success = "alert-success",
    Info = "alert-info",
    Warning = "alert-warning",
    Danger = "alert-danger"

}