import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Court, Fields, Geom, Geometry } from '../../models/data/court';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourtService {
  courts: Court[] = [
    new Court(
      '',
      '',
      new Fields(
        [],
        '',
        '',
        '',
        '',
        new Geom([], ''),
        '',
        '',
        '',
        '',
        '',
        '',
        []
      ),
      new Geometry('', []),
      ''
    ),
  ];
  courts$: BehaviorSubject<Court[]> = new BehaviorSubject(this.courts);

  constructor(private httpClient: HttpClient) {
    this.getCourts().subscribe(courts => {
      this.courts = courts;
      this.courts$.next(courts);
    });
  }

  /**
   * Loads a local JSON file with all the courts in Rhineland-Palatinate and parses them into custom court objects
   *
   * @returns An observable of an array of Court objects.
   */
  private getCourts(): Observable<Court[]> {
    return this.httpClient.get<Court[]>(environment.courtDataApi).pipe(
      tap(_ => console.log(`fetched Courts`)),
      catchError(this.handleError<Court[]>('getCourts'))
    );
  }

  /**
   * Find a court in the court data by its name
   *
   * @param {string} courtName - string - the name of the court you want to find
   * @returns The first court that matches the courtName.
   */
  public findCourtByName(courtName: string): Court | undefined {
    return this.courts.find((currCourt: Court) =>
      currCourt.fields.gericht.includes(courtName)
    );
  }

  public getCourtsObservable(): BehaviorSubject<Court[]> {
    return this.courts$;
  }

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
