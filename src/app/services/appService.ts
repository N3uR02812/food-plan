import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class AppService {

    reloadPressedSubject: Subject<void> = new Subject<void>();
    addPressedSubject: Subject<void> = new Subject<void>();
    searchPressedSubject: Subject<string> = new Subject<string>();

    constructor() {
    }

    get label(): Observable<string> {
      return this.searchPressedSubject.asObservable();
    }

    get searchPressed(): Observable<string> {
      return this.searchPressedSubject.asObservable();
    }

    get reloadPressed(): Observable<void> {
      return this.reloadPressedSubject.asObservable();
    }

    get addPressed(): Observable<void> {
      return this.addPressedSubject.asObservable();
    }
}
