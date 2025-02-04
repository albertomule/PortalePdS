import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MongoService } from '../../servizi/mongo.service';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-regolamento',
  templateUrl: './regolamento.component.html',
  styleUrl: './regolamento.component.css',
  standalone: false
})
export class RegolamentoComponent implements OnInit, OnDestroy{

  primoIndex: number = 3
  secondoIndex: number = 4
  terzoIndex: number = 5
  compIndex: number = 6
  maxcfuIndex: number = 7
  mincfuIndex: number = 8

  anno: string = ""
  regolamento: any
  primo : any[] = []
  secondo : any[] = []
  terzo : any[] = []
  comp : any[] = []
  maxcfu: string = ""
  mincfu: string = ""

  sottoscrizione: any
  submongo: any

  constructor(private route: ActivatedRoute, private mongo: MongoService, private router: Router){}

  ngOnInit(): void {
    this.sottoscrizione = this.route.paramMap.subscribe((params: ParamMap)=>{
      this.anno = params.get('id')!
       this.submongo = this.mongo.getRegolamento(this.anno).subscribe((data: any) => {
        this.regolamento = Object.values(data)
        
        this.getPrimo()
        this.getSecondo()
        this.getTerzo()
        this.getComp()
        this.maxcfu = this.regolamento[this.maxcfuIndex] 
        this.mincfu = this.regolamento[this.mincfuIndex] 
        
        console.log(this.regolamento)
        console.log(this.primo)
        console.log(this.secondo)
        console.log(this.terzo)
        console.log(this.comp)
      })
    })
    console.log(this.anno)
  }

  ngOnDestroy(): void {
    this.sottoscrizione.unsubscribe()
    this.submongo.unsubscribe()
  }

  nextYear(anno: string){
    var y = parseInt(anno)
    var ny = y+1
    return ny.toString()
  }

  getPrimo(){
    var str = this.regolamento[this.primoIndex]
    console.log(str)
    this.primo = Object.values(JSON.parse(str))
  }
  getSecondo(){
    var str = this.regolamento[this.secondoIndex]
    console.log(str)
    this.secondo = Object.values(JSON.parse(str))
  }
  getTerzo(){
    var str = this.regolamento[this.terzoIndex]
    console.log(str)
    this.terzo = Object.values(JSON.parse(str))
  }
  getComp(){
    var str = this.regolamento[this.compIndex]
    console.log(str)
    this.comp = Object.values(JSON.parse(str))
  }

  elimina(){
    if(confirm('Sei sicuro di voler eliminare questo regolamento?')){
      this.mongo.removeRegolamento(this.anno).subscribe((data: any) => {
        console.log(data)
        alert('Il regolamento è stato eliminato con successo')
        this.router.navigate(['/regolamenti'])
      })
    }
  }

  get cfumax() { return this.maxcfu}
  get cfumin() { return this.mincfu}
}
