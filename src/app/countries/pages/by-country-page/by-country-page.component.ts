import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/counties.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public initialValue: string = '';
  public countries: Country[] = [];

  constructor( private countriesService: CountriesService){}


  ngOnInit(): void {
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
    this.countries = this.countriesService.cacheStore.byCountries.countries;

  }

  searchByCountry( term: string){

    this.countriesService.searchCountry(term).subscribe( countries => {
      this.countries = countries;
    }
    )

  }

}
