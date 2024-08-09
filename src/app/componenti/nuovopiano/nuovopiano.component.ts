import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MongoService } from '../../servizi/mongo.service';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-nuovopiano',
  templateUrl: './nuovopiano.component.html',
  styleUrl: './nuovopiano.component.css'
})
export class NuovopianoComponent {
  primoIndex: number = 3
  secondoIndex: number = 4
  terzoIndex: number = 5
  compIndex: number = 6

  anno: string = ""
  regolamento: any
  primo : any[] = []
  secondo : any[] = []
  terzo : any[] = []
  comp : any[] = []

  sottoscrizione: any
  submongo: any

  constructor(private route: ActivatedRoute, private mongo: MongoService){}

  ngOnInit(): void {
    this.sottoscrizione = this.route.paramMap.subscribe((params: ParamMap)=>{
      this.anno = params.get('id')!
       this.submongo = this.mongo.getRegolamento(this.anno).subscribe((data: any) => {
        this.regolamento = Object.values(data)
        
        this.getPrimo()
        this.getSecondo()
        this.getTerzo()
        this.getComp()
        
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

  examForm: FormGroup = new FormGroup({
    examList: new FormArray([this.getExamFields()])
  })

  getExamFields(){
    return new FormGroup({
      exam_name: new FormControl(''),
      exam_code: new FormControl(''),
      exam_cfu: new FormControl('')
    })
  }

  examListArray(){
   return this.examForm.get('examList') as FormArray
  }

  addExam(){
    this.examListArray().push(this.getExamFields())
  }

  removeExam(i: number){
    this.examListArray().removeAt(i)
  }
}
