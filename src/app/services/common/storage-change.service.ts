import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  private LSSource = new BehaviorSubject(true);
  currentLS = this.LSSource.asObservable();

  constructor() { }

  changeLS(LS: boolean) {
    this.LSSource.next(LS);
  }
  
}
