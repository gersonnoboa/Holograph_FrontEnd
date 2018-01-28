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
}

export enum ActiveTimeVisualizationType {
    Average = "Average time",
    Total = "Total time"
    
}