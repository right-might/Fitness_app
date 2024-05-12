export class Event {
   text: string;
   startDate: Date;
   endDate?: Date;
   allDay?: boolean;

   constructor(text: string, startDate: Date){
      this.text = text;
      this.startDate = startDate;
      this.allDay = true; 
   }
 }