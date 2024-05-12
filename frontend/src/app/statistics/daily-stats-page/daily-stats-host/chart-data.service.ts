import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  getChartData(type: string): Observable<any>{
    let mockData;
    switch(type){
      case 'speed': mockData = this.getSpeedData();
      break;
      case 'pace': mockData = this.getPaceData();
      break;
      case 'distance': mockData = this.getDistanceData();
      break;
      default: mockData = this.getDefaultData();
    }
    return of(mockData);
  }


  private getSpeedData(){
    return {
      data: [{ x:[1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+markers', name: 'Vitesse', marker: {color: 'red'}}], layout: {title: 'Vitesse'}
    };
  }

  private getPaceData(){
    return {
      data: [{ x: [1, 2, 3], y: [3, 1, 4], type: 'scatter', mode: 'lines+markers', name: 'Allure', fill: 'tozeroy', marker: {color: 'blue'}}], layout: {title: 'Allure'}
    };
  }

  private getDistanceData(){
    return {
      data: [{ x: [1, 2, 3], y: [5, 3, 2], type: 'bar', name: 'Distance', marker: {color: 'green'}}], layout: {title: 'Distance'}
    };
  }

  private getDefaultData(){
    return {
      data: [], layout: {title: 'Sélectionnez un type de données pour visionner son graphe'}
    };
  }
}
