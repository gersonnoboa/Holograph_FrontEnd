import { Input, KeyValueDiffers, DoCheck, OnInit } from "@angular/core";

export class BaseInformationComponent implements OnInit{
    @Input("parameters") parameters: any;
    @Input("isCurrentActiveTab") isCurrentActiveTab = false;
    show = false;

    data: any;
    differ: any;

    visualizationData = [];

    isLoading = true;
    private differs: KeyValueDiffers;
    initialLoadingFunction: any;

    constructor(differs: KeyValueDiffers) { 
        this.differs = differs;
    }

    ngOnInit() {
        this.differ = this.differs.find({}).create();
    }

    ngOnChanges(changes: any) {
        if (changes.isCurrentActiveTab.currentValue == true && this.isLoading == false) {
            this.show = true;
        }
    }

    ngDoCheck() {
        var changes = this.differ.diff(this.parameters);
        if (changes) {
            this.initialLoadingFunction();
        }
    }

    showChart(data: any) {
        this.visualizationData = data;
        if (this.isCurrentActiveTab == true) {
            this.show = true;
        }
    }
}