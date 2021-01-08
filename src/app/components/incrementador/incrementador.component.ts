import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef | any;
  @Input('nombre')  leyenda: string = 'leyenda';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {}
  
  ngOnInit(): void {
  }

  // -- Mejor opcion para trabar con value de varios inputs @ViewChild
  onChanges(newValue: number) {
    newValue >= 100 ? this.progreso = 100 : newValue <= 0 ? this.progreso = 0 : this.progreso = newValue;
    this.txtProgress.nativeElement.value = this.progreso;  // Segunda opcion usando @ViewChild
    this.cambioValor.emit(this.progreso);
  }

  // -- Otra opcion, pero es tedioso cuando queremos tomar valor de varios inputs VanillaJS
  // onChanges(newValue: number) {
  //   let elemHTML: any = document.getElementsByName('progreso')[0];
  //   if (newValue >= 100) {
  //     this.progreso = 100;
  //   } else if (newValue <= 0) {
  //     this.progreso = 0;
  //   } else {
  //     this.progreso = newValue;
  //   }
  //   elemHTML.value = this.progreso; // Primera opcion usando VanillaJS
  //   this.cambioValor.emit(this.progreso);
  // }

  cambiarValor(valor: number) {
    this.progreso += valor;
    this.progreso >= 100 ? this.progreso = 100 : this.progreso <= 0 ? this.progreso = 0 : this.progreso;
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }

}
