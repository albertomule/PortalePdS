import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MongoService } from '../../servizi/mongo.service';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-regolamento',
  templateUrl: './regolamento.component.html',
  styleUrl: './regolamento.component.css'
})
export class RegolamentoComponent implements OnInit, OnDestroy{

  anno: string = ""
  regolamento: any
  primo : any[] = []

  sottoscrizione: any
  submongo: any

  constructor(private route: ActivatedRoute, private mongo: MongoService){}

  ngOnInit(): void {
    this.sottoscrizione = this.route.paramMap.subscribe((params: ParamMap)=>{
      this.anno = params.get('id')!
       this.submongo = this.mongo.getRegolamento(this.anno).subscribe((data: any) => {
        // this.regolamento = data
        // console.log(this.regolamento)
        this.regolamento = Object.values(data)
        console.log(this.regolamento)
        // console.log(this.getPrimo())
        this.getPrimo()
        console.log(this.primo)
       // console.log(Object.keys(this.primo))
       // console.log(Object.values(this.primo))
        //console.log(this.primo)
      })
    })
    console.log(this.anno)
    // setTimeout(() => {  console.log(this.regolamento); }, 5000);
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
    var str = this.regolamento[3]
    console.log(str)
    // str = str.replace(/\\/g, '')
    // console.log(str)
    this.primo = Object.values(JSON.parse(str))
    // console.log(json)
    // const arr = Object.keys(str).map((key) => [key, str[key]])
    // console.log(arr)
    // return arr
  }
}
