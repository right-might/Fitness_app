import { Component, OnDestroy, OnInit  } from '@angular/core';
import { DxSchedulerModule } from 'devextreme-angular';
import { ActivityService } from "../../../activity/activity.service"; 
import { Activity } from "../../../activity/model/activity"
import { Subscription } from "rxjs";
import { Event } from './event/Event.model';
@Component({
  selector: 'app-page-principale-corps',
  standalone: true,
  imports: [DxSchedulerModule],
  templateUrl: './page-principale-corps.component.html',
  styleUrl: './page-principale-corps.component.css',
  providers: []
})

export class PagePrincipaleCorpsComponent implements OnInit, OnDestroy { 
  calendarData: Event[] = [];
  currentDate: Date = new Date();
  activityData: Activity[] = [];
  activitySubcription: Subscription; 

  constructor(private activityService: ActivityService) {  
   
    this.activitySubcription = this.activityService.getActivities().subscribe((activities) => { 
    this.activityData = activities;
    for(const elem of activities)
      {
        this.calendarData.push(new Event(elem.type_activity,new Date(elem.date)));
      }
    }) 
  } 
  
  ngOnInit(): void {
    if(!this.activityData.length){
      this.activityService.fetchActivities();  
    }
  }

  ngOnDestroy(): void {
    if(this.activitySubcription){ 
      this.activitySubcription.unsubscribe(); 
    } 
  }

}
