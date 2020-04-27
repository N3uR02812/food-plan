import { Container } from "@angular/compiler/src/i18n/i18n_ast";
import { Observable, of } from "rxjs";
import {
  ODataQuery,
  ODataService,
  ODataResponse,
  HttpOptions
} from "odata-v4-ng";
import { Injectable } from "@angular/core";
import { map, switchMap } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";

export interface IODataBasicService {
  get(key: string): Observable<any>;

  getList(): Observable<any[]>;

  post(entity: any): Observable<any>;

  put(body: any, key: string): Observable<any>;

  patch(body: any, key: string): Observable<any>;

  delete(key: string): Observable<any>;
}

@Injectable()
export class ODataBasicService<T> implements IODataBasicService {
  public _setName: string = "";

  constructor(public odataService: ODataService) {}

  private get query() {
    return new ODataQuery(
      this.odataService,
      "https://localhost:44309/odata/"
    ).entitySet(this._setName);
  }

  public set setName(setName: string) {
    this._setName = setName;
  }

  public get(key: string): Observable<T> {
    return this.query
      .entityKey("'" + key + "'")
      .get()
      .pipe(map(data => data.toComplexValue<T>()));
  }

  public getList(): Observable<T[]> {
    return this.query.get().pipe(map(data => data.toComplexCollection<T>()));
  }

  public getFilter(filter): Observable<T[]> {
    return this.query
      .filter(filter)
      .get()
      .pipe(map(data => data.toComplexCollection<T>()));
  }

  public post(entity: any): Observable<T> {
    return this.query.post(entity).pipe(map(data => data.toComplexValue<T>()));
  }

  public put(body: any, key: string): Observable<T> {
    return this.query
      .entityKey("'" + key + "'")
      .put(body, key)
      .pipe(map(data => data.toComplexValue<T>()));
  }

  public patch(body: any, key: string): Observable<T> {
    return this.query
      .entityKey("'" + key + "'")
      .patch(body, key)
      .pipe(map(data => data.toComplexValue<T>()));
  }

  public delete(key: string): Observable<any> {
    return this.query.entityKey("'" + key + "'").delete(key);
  }
}
