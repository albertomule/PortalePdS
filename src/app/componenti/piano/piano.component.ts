import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MongoService } from '../../servizi/mongo.service';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrl: './piano.component.css'
})
export class PianoComponent implements OnInit, OnDestroy{

  annoIndex: number = 2
  primoIndex: number = 3
  secondoIndex: number = 4
  terzoIndex: number = 5
  compIndex: number = 6
  esamiIndex: number = 7

  matricola: string = ""
  a: boolean = false
  piano: any
  anno: any
  primo : any[] = []
  secondo : any[] = []
  terzo : any[] = []
  comp : any[] = []
  esami : any[] = []

  sottoscrizione: any
  submongo: any

  constructor(private route: ActivatedRoute, private mongo: MongoService){}

  ngOnInit(): void {
    this.sottoscrizione = this.route.paramMap.subscribe((params: ParamMap)=>{
      this.matricola = params.get('id')!
      if(this.matricola.includes("a")){
        this.matricola = this.matricola.replace("a","")
        this.a = true
      }
       this.submongo = this.mongo.getPiano(this.matricola).subscribe((data: any) => {
        this.piano = Object.values(data)
        
        this.anno = this.piano[this.annoIndex]
        console.log("ANNO: " + this.anno)
        this.getPrimo()
        this.getSecondo()
        this.getTerzo()
        this.getComp()
        
        console.log(this.piano)
        console.log(this.primo)
        console.log(this.secondo)
        console.log(this.terzo)
        console.log(this.comp)
      })
    })
    console.log(this.matricola)
  }

  ngOnDestroy(): void {
    this.sottoscrizione.unsubscribe()
    this.submongo.unsubscribe()
  }

  getA() { return this.a }

  // getAnno(){
  //   var str = this.piano[this.annoIndex]
  //   console.log(str)
  //   this.anno = Object.values(JSON.parse(str))
  // }
  getPrimo(){
    var str = this.piano[this.primoIndex]
    console.log(str)
    this.primo = Object.values(JSON.parse(str))
  }
  getSecondo(){
    var str = this.piano[this.secondoIndex]
    console.log(str)
    this.secondo = Object.values(JSON.parse(str))
  }
  getTerzo(){
    var str = this.piano[this.terzoIndex]
    console.log(str)
    this.terzo = Object.values(JSON.parse(str))
  }
  getComp(){
    var str = this.piano[this.compIndex]
    console.log(str)
    this.comp = Object.values(JSON.parse(str))
  }
  getEsami(){
    var str = this.piano[this.esamiIndex]
    console.log(str)
    this.esami = Object.values(JSON.parse(str))
  }
  nextYear(anno: string){
    var y = parseInt(anno)
    var ny = y+1
    return ny.toString()
  }
}
