import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , tap, map, catchError, of, delay} from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/chache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore : CacheStore= {
    byCapital: {term:'', countries:[]},
    byCountries: {term:'', countries:[]},
    byRegion: {region:'', countries:[]},
  }

  constructor(private http: HttpClient) {

    this.loadFromLocalStorage();
   }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }


  private loadFromLocalStorage(){
if(!localStorage.getItem('cacheStore')) return;

this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)

  }



  private getCountriesRequest(url : string): Observable<Country[]>{

    return this.http.get<Country[]>( url ).pipe(
      catchError(() => of([])),
      delay(2000),
    ) ;
  }

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
    return this.getCountriesRequest(url).pipe(
      tap(countries => this.cacheStore.byCapital = { term: term, countries: countries}),
      tap(() => this.saveToLocalStorage()),

    );
    //  return this.http.get<Country[]>(url).pipe(
    //   // tap(countries => console.log('paso por el tap ', countries)),
    //   // map(countries => [])
    //   catchError (error => { // al no usar error podria hacer así: () =>
    //     return of([])
    //   })
    //   //La linea de catch es que si detencta un error me devuelva un array vacion
    //  );
  }

  searchCountry(term: string): Observable<Country[]> {
    console.log('desde buscando capital')
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap(countries => this.cacheStore.byCountries = { term, countries}),
      tap(() => this.saveToLocalStorage()), // en typescript si se llaman igual puedo ponerlo directamente { term, countries}

    );

  }

  searchRegion(region: Region): Observable<Country[]> {
    console.log('desde buscando capital')
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap(countries => this.cacheStore.byRegion = { region: region, countries: countries}),
      tap(() => this.saveToLocalStorage()),

    );
  }

     //TODO: IMPORTANTE: Este metodo tiene comentarios importantes , si estas aqui es que has venido a mirar como se hace
    //  searchRegion(region: string): Observable<Country[]> {
    //   console.log('desde buscando capital')
    //   const url = `${this.apiUrl}/region/${region}`;
    //    return this.http.get<Country[]>(url).pipe(
    //     // tap(countries => console.log('paso por el tap ', countries)),
    //     // map(countries => [])
    //     catchError (error => { // al no usar error podria hacer así: () =>
    //       return of([])
    //     })
    //     //La linea de catch es que si detencta un error me devuelva un array vacion
    //    );
  //}

}
