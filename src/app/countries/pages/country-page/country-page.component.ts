import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/counties.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent  implements OnInit{

  public country?: Country;
  constructor( private activatedRoute: ActivatedRoute ,
    private countriesService : CountriesService,
    private router: Router,
  ){}

  // desestructuración
  // ngOnInit(): void {
  //   this.activatedRoute.params
  //     .subscribe( (params ) => {
  //       console.log( {params: params['id']} );

  //     })
  // }

  //El swirtchmap lo que hace es cambiar el resultado. antes del subscribe ay tenemos el id porque nos lo ha devuelo
  //Pues aprovechamos para cambairle el observable al de buscar pais
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe( switchMap( ({id}) => this.countriesService.seachCountryByAlphaCode( id) ),
    )
      .subscribe( country  => {
        if(!country)
          {
            return this.router.navigateByUrl('')
          }
          return this.country = country;

        });


  }


}
