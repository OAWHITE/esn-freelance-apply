import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  constructor() { }


  objectToBase64(obj: any): string {
    const jsonString = JSON.stringify(obj); // Convert object to JSON
    return btoa(jsonString); // Encode JSON string to Base64
  }
}
