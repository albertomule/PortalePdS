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

  insertEsame(url: string){
    return this.http.get(this.mongoEndPoint + 'insertesame' + url)
  }

  getEsami(){
    return this.http.get(this.mongoEndPoint + 'esami')
  }
}
