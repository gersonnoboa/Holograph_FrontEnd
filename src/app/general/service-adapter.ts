export class ServiceAdapter {
    static parseActiveTimeInformation(information, type: ActiveTimeVisualizationType) {
        var newInfo = [];
        information.forEach(element => {
            let info = {};

            if (type == ActiveTimeVisualizationType.Average) {
                info = {
                    "name": element.resource,
                    "value": element.average_active_time
                }
            }
            else if (type == ActiveTimeVisualizationType.Total) {
                info = {
                    "name": element.resource,
                    "value": element.active_time
                }
            }
            newInfo.push(info);
        });

        return newInfo;
    }

    static parseTraceInformation(information) {
        let info = {
            "name": information.name,
            "value": information.averageTimeWith
        };

        return info;
    }
}

export enum ActiveTimeVisualizationType {
    Average = "Average time",
    Total = "Total time"
    
}