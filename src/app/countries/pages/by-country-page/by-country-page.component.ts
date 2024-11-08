import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/counties.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {


  public countries: Country[] = [];

  constructor( private countriesService: CountriesService){}

  searchByCountry( term: string){

    this.countriesService.searchCountry(term).subscribe( countries => {
      this.countries = countries;
    }
    )

  }

}