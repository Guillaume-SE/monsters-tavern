import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorService {

  apiError = new Subject<string>();

  constructor() { }

  sendError(tag: string) {
    this.apiError.next(tag);
  }
}
