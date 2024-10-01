import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatistudenteService {

  public nome: string = ""
  public cognome: string = ""
  public email: string = ""
  public fresh: boolean = false

  constructor() { }
}
