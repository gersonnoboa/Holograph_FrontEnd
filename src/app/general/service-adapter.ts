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

    static parseFlowsInformation(information, activity, visualizationType) {
        /*var newInfo = [];

        let parameter = "";

        if (visualizationType == FlowsVisualizationType.TimeBefore) {
            parameter = "time_before";
        }
        else if (visualizationType == FlowsVisualizationType.TimeTaken) {
            parameter = "time_taken";
        }
        else {
            parameter = "time_after";
        }

        information.forEach(element => {
            let currentActivity = element[activity];
            let info = {
                "name": currentActivity.resource,
                "value": currentActivity[parameter]
            };
            newInfo.push(info);
        });

        return newInfo;*/

        var newInfo = [];

        let parameter = "";

        if (visualizationType == FlowsVisualizationType.TimeBefore) {
            parameter = "time_before";
        }
        else if (visualizationType == FlowsVisualizationType.TimeTaken) {
            parameter = "time_taken";
        }
        else {
            parameter = "time_after";
        }

        console.log(information);
        let currentActivity = information[activity];

        currentActivity.resources.forEach(element => {

            let info = {
                "name": element.resource,
                "value": element[parameter] / element.occurrences
            }

            newInfo.push(info);
        });

        return newInfo;
        
    }

    static parseIndividualInformation(information) {
        var newInfo = [];
        information.resources.forEach(element => {
            let info = {
                "name": element.resource,
                "value":element.time_taken
            };

            newInfo.push(info);
        });

        return newInfo;
    }
}

export enum ActiveTimeVisualizationType {
    Average = "Average time",
    Total = "Total time"
    
}

export enum FlowsVisualizationType {
    TimeBefore = "Time before",
    TimeTaken = "Time taken",
    TimeAfter = "Time after"
}