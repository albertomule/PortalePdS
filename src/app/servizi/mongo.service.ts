import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MongoService {

  mongoEndPoint = "https://eu-central-1.aws.data.mongodb-api.com/app/application-0-fzaqcoj/endpoint/"

  constructor(private http: HttpClient) { }

  insertPiano(matricola: string, anno: string, body: {}){
    var str = "?m=" + matricola + "&a=" + anno
    return this.http.post(this.mongoEndPoint + 'insertpiano' + str, JSON.stringify(body))
  }

  insertRegolamento(anno: string, body: {}){
    var str = "?a=" + anno
    return this.http.post(this.mongoEndPoint + 'insertregolamento' + str, JSON.stringify(body))
  }

  getRegolamento(anno: string){
    var str = "?a=" + anno
    console.log(str)
    return this.http.get(this.mongoEndPoint + 'getregolamento' + str)
  }

  removeRegolamento(anno: string){
    var str = "?a=" + anno
    console.log(str)
    return this.http.get(this.mongoEndPoint + 'removeregolamento' + str)
  }

  insertEsame(nome: string, code: string, cfu: string){
    var str = "?n=" + nome + "&c=" + code + "&cfu=" + cfu
    console.log(str)
    return this.http.get(this.mongoEndPoint + 'insertesame' + str)
  }

  removeEsame(code: string){
    var str = "?c=" + code
    console.log(str)
    return this.http.get(this.mongoEndPoint + 'removeesame' + str)
  }

  getEsami(){
    return this.http.get(this.mongoEndPoint + 'esami')
  }

  getRegolamenti(){
    return this.http.get(this.mongoEndPoint + 'regolamenti')
  }

  getPianiinSospeso(){
    return this.http.get(this.mongoEndPoint + 'pianiinsospeso')
  }

  getPiano(matricola: string){
    var str = "?m=" + matricola
    console.log(str)
    return this.http.get(this.mongoEndPoint + 'getpiano' + str)
  }

  approvaPiano(matricola: string){
    var str = "?m=" + matricola
    console.log(str)
    return this.http.get(this.mongoEndPoint + 'approvapiano' + str)
  }
}
