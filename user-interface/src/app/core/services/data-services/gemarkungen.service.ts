import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GeoJSON } from 'ol/format';

@Injectable({
  providedIn: 'root',
})
export class GemarkungenService {
  constructor(private httpClient: HttpClient) {}

  public getRLPData(extent: number[]): Observable<GeoJSON> {
    const api =
      environment.apiRLPwfsVerwaltungsgrenzen +
      '?service=WFS&' +
      'version=1.1.0&' +
      'request=GetFeature&' +
      'typename=vermkv:fluren_rlp&' +
      'outputFormat=geojson&' +
      'srsname=EPSG:3857&' +
      'bbox=' +
      extent.join(',') +
      ',EPSG:3857';

    return this.httpClient.get<GeoJSON>(api).pipe(
      tap(_ => console.log(`fetched data`)),
      catchError(this.handleError<GeoJSON>('getRLPData'))
    );
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
