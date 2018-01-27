export class ServiceAdapter {
    static parseActiveTimeInformation(information) {
        var newInfo = [];
        information.forEach(element => {
            let info = {
                "name": element.resource,
                "value": element.active_time
            }
            newInfo.push(info);
        });

        return newInfo;
    }
}