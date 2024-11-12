import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output,ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject<string>
  private debouncerSubscriptrion? : Subscription;
  @Input()
  public initialValue: string = '';
  @Input()
  public placeholder: string = '';

  @Output()
  public onValue : EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public onDebounce : EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscriptrion = this.debouncer
    .pipe(
      debounceTime(300) //cuando el usuario deja de emitir valores por un segundo manda el valor al suscribe
    )
    .subscribe( value => {
      this.onDebounce.emit(value)
    })
  }

  //Lo suyo es destruir siempre una suscripcion. (exepto las de http get que se hacen en el service para eso usar take)
  //porque en este caso nunca sabes cuando el usuario dejara de estar suscrito
  //solo lo sabes en el ondestroy. y el ondestroy por si mismo no destruye las suscripciones
  //por lo que lo suyo es hacerlo manualment ecomo aqui declarando esto: this.debouncerSubscriptrion
  ngOnDestroy(): void {
    this.debouncerSubscriptrion?.unsubscribe();
    console.log('destruido')
  }


  emmitValue( value : string): void{

    this.onValue.emit(value)
  }
  onKeyPress( searchTerm: string ){
    this.debouncer.next(searchTerm);
    // console.log(searchTerm);

  }
}
