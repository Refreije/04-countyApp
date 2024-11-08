import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , tap, map, catchError, of} from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }


  seachCountryByAlphaCode(code: string): Observable<Country | null>
  {
    const url = `${this.apiUrl}/alpha/${code}`;
     return this.http.get<Country[]>(url).pipe(
      map(countries => countries.length > 0 ? countries[0]: null),
      catchError (error => { // al no usar error podria hacer así: () =>
        return of(null)
      })
      //La linea de catch es que si detencta un error me devuelva un array vacion
     );

  }


  searchCapital (term: string): Observable<Country[]> {
    console.log('desde buscando capital')
    const url = `${this.apiUrl}/capital/${term}`;
     return this.http.get<Country[]>(url).pipe(
      // tap(countries => console.log('paso por el tap ', countries)),
      // map(countries => [])
      catchError (error => { // al no usar error podria hacer así: () =>
        return of([])
      })
      //La linea de catch es que si detencta un error me devuelva un array vacion
     );
  }

  searchCountry(term: string): Observable<Country[]> {
    console.log('desde buscando capital')
    const url = `${this.apiUrl}/name/${term}`;
     return this.http.get<Country[]>(url).pipe(
      // tap(countries => console.log('paso por el tap ', countries)),
      // map(countries => [])
      catchError (error => { // al no usar error podria hacer así: () =>
        return of([])
      })
      //La linea de catch es que si detencta un error me devuelva un array vacion
     );

  }

  searchRegion(region: string): Observable<Country[]> {
    console.log('desde buscando capital')
    const url = `${this.apiUrl}/region/${region}`;
     return this.http.get<Country[]>(url).pipe(
      // tap(countries => console.log('paso por el tap ', countries)),
      // map(countries => [])
      catchError (error => { // al no usar error podria hacer así: () =>
        return of([])
      })
      //La linea de catch es que si detencta un error me devuelva un array vacion
     );

  }

}
