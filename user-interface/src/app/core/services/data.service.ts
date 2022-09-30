import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get department data from teh GovData API
   *
   * @returns an Observable wrapping a Department array
   */
  // public getDepartments(): Observable<Department[]> {
  //   return this.httpClient
  //     .get<Department[]>(this.GovDataAPI)
  //     .pipe(
  //       tap((_) => console.log(`fetched Departments`)),
  //       catchError(this.handleError<Department[]>('getDepartments'))
  //     );
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @private
   * @template T
   * @param {string} [operation='operation'] - name of the operation that failed
   * @param {T} [result] - optional value to return as the observable result
   * @returns
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
