import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MongoService {

  mongoEndPoint = "https://eu-central-1.aws.data.mongodb-api.com/app/application-0-fzaqcoj/endpoint/"

  constructor(private http: HttpClient) { }

  // insertEsame(url: string, body: {}){
  //   this.http.post(url,body)
  // }

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
}