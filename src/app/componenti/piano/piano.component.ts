import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MongoService } from '../../servizi/mongo.service';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrl: './piano.component.css'
})
export class PianoComponent implements OnInit, OnDestroy{

  matricola: string = ""
  a: boolean = false

  sottoscrizione: any
  //submongo: any

  constructor(private route: ActivatedRoute, private mongo: MongoService){}

  ngOnInit(): void {
    this.sottoscrizione = this.route.paramMap.subscribe((params: ParamMap)=>{
      this.matricola = params.get('id')!
      if(this.matricola.includes("a")){
        this.matricola = this.matricola.replace("a","")
        this.a = true
      }
      //  this.submongo = this.mongo.getRegolamento(this.anno).subscribe((data: any) => {
      //   this.regolamento = Object.values(data)
        
      //   this.getPrimo()
      //   this.getSecondo()
      //   this.getTerzo()
      //   this.getComp()
        
      //   console.log(this.regolamento)
      //   console.log(this.primo)
      //   console.log(this.secondo)
      //   console.log(this.terzo)
      //   console.log(this.comp)
      // })
    })
    console.log(this.matricola)
  }

  ngOnDestroy(): void {
    this.sottoscrizione.unsubscribe()
    //this.submongo.unsubscribe()
  }

  getA() { return this.a }
}
