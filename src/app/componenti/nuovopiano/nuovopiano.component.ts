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

        for(let i of this.primo[0]){
          this.add1Exam(i.exam_name,i.exam_code,i.exam_cfu)
        }
        for(let i of this.secondo[0]){
          this.add2Exam(i.exam_name,i.exam_code,i.exam_cfu)
        }
        for(let i of this.terzo[0]){
          this.add3Exam(i.exam_name,i.exam_code,i.exam_cfu)
        }
        for(let i of this.comp[0]){
          this.addcExam(i.exam_name,i.exam_code,i.exam_cfu)
        }

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

  exam1Form: FormGroup = new FormGroup({
    exam1List: new FormArray([])
  })

  exam2Form: FormGroup = new FormGroup({
    exam2List: new FormArray([])
  })

  exam3Form: FormGroup = new FormGroup({
    exam3List: new FormArray([])
  })

  examcForm: FormGroup = new FormGroup({
    examcList: new FormArray([])
  })

  getExamFields(){
    return new FormGroup({
      exam_name: new FormControl(''),
      exam_code: new FormControl(''),
      exam_cfu: new FormControl(''),
      conseguito: new FormControl(false)
    })
  }
  getFullFields(a: string, b: string, c: string, p: boolean){
    return new FormGroup({
      exam_name: new FormControl(a),
      exam_code: new FormControl(b),
      exam_cfu: new FormControl(c),
      pianificato: new FormControl(p),
      conseguito: new FormControl(false)
    })
  }

  exam1ListArray(){
    return this.exam1Form.get('exam1List') as FormArray
   }
  add1Exam(a: string, b: string, c: string){
    this.exam1ListArray().push(this.getFullFields(a,b,c,true))
  }

  exam2ListArray(){
  return this.exam2Form.get('exam2List') as FormArray
  }
  add2Exam(a: string, b: string, c: string){
    this.exam2ListArray().push(this.getFullFields(a,b,c,true))
  }

  exam3ListArray(){
  return this.exam3Form.get('exam3List') as FormArray
  }
  add3Exam(a: string, b: string, c: string){
    this.exam3ListArray().push(this.getFullFields(a,b,c,true))
  }

  examcListArray(){
  return this.examcForm.get('examcList') as FormArray
  }
  addcExam(a: string, b: string, c: string){
    this.examcListArray().push(this.getFullFields(a,b,c,false))
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

  // invia(){
  //   this.mongo.insertRegolamento(this.selectVal.toString(), [this.exam1Form.value, this.exam2Form.value, this.exam3Form.value, this.exam4Form.value]).subscribe((data: any) => {
  //     console.log(data)
  //   })
  // }

  getAllFormData(){
    console.log(this.examForm.value)
    console.log(this.exam1Form.value)
    console.log(this.exam2Form.value)
    console.log(this.exam3Form.value)
    console.log(this.examcForm.value)
  }

  fixPianificato(i: number){
    if(this.examcListArray().at(i).value.conseguito)
      this.examcListArray().at(i).value.pianificato = true
    console.log(this.examcListArray().at(i).value)
  }
  fixConseguito(i: number){
    if(!this.examcListArray().at(i).value.pianificato)
      this.examcListArray().at(i).value.conseguito = false
    console.log(this.examcListArray().at(i).value)
  }

  pianificatoCheck(i: number){
    return this.examcListArray().at(i).value.pianificato
  }
  conseguitoCheck(i: number){
    return this.examcListArray().at(i).value.conseguito
  }
  randomMatricola(){
    return Math.floor(Math.random() * 999999)
  }

  invia(){
    this.mongo.insertPiano(this.randomMatricola().toString(), [
      this.exam1Form.value, 
      this.exam2Form.value, 
      this.exam3Form.value, 
      this.examcForm.value, 
      this.examForm.value
    ]).subscribe((data: any) => {
      console.log(data)
      //alert('Il piano è stato inviato con successo')
      //this.router.navigate(['/start'])
    })
  }
}
