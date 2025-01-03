import { Component, OnInit } from '@angular/core';
import { MongoService } from '../../servizi/mongo.service';

@Component({
  selector: 'app-pianiinsospeso',
  templateUrl: './pianiinsospeso.component.html',
  styleUrl: './pianiinsospeso.component.css',
  standalone: false
})
export class PianiinsospesoComponent implements OnInit{
  
  pianiinsospeso: any
  submongo: any

  constructor(private mongo: MongoService){}

  ngOnInit(): void {
    this.submongo = this.mongo.getPianiinSospeso().subscribe((data: any) => {
      this.pianiinsospeso = Object.keys(data).map((key) => { 
        data[key]['id'] = key
        return data[key]
      })
      console.log(this.pianiinsospeso)
    })
  }

  ngOnDestroy(): void {
    this.submongo.unsubscribe()
  }
}
