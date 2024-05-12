import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormService {

  constructor() { }

  isEmptyText(value: any): boolean {
    return value === null || value === undefined || value.trim() === '';
  }
  
  isEmptyNumber(value: any): boolean {
    return value === null || value === undefined;
  }
  
  isInvalidText(value: string): boolean {
    return value.trim().length < 3;
  }

  isInvalidNumber(value: number): boolean {
    return isNaN(value) || !Number.isInteger(value) || value <= 0;
  }

  isInvalidFloat(value: number): boolean {
    return isNaN(value) || value <= 0;
  }

  isReasonableAmbientTemperature(value: number): boolean {
    return !isNaN(value) && Number.isFinite(value) && value >= -20 && value <= 40;
  }  
  
  isInvalidDate(value: string): boolean {
    const currentDate = new Date();
    const selectedDate = new Date(value);
    return selectedDate >= currentDate;
  }

}
