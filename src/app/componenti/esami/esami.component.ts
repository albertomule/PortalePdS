import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MongoService } from '../../servizi/mongo.service';

@Component({
  selector: 'app-esami',
  templateUrl: './esami.component.html',
  styleUrl: './esami.component.css',
  standalone: false
})
export class EsamiComponent implements OnInit{

  esami: any
  submongo: any

  constructor(private mongo: MongoService){}

  ngOnInit(): void {
    this.submongo = this.mongo.getEsami().subscribe((data: any) => {
      this.esami = Object.keys(data).map((key) => { 
        data[key]['id'] = key
        return data[key]
      })
      console.log(this.esami)
    })
  }

  ngOnDestroy(): void {
    this.submongo.unsubscribe()
  }

  examRForm: FormGroup = new FormGroup({
    exam_name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{1,}$')])
  })

  examForm: FormGroup = new FormGroup({
    examList: new FormArray([this.getExamFields()])
  })

  getExamFields(){
    return new FormGroup({
      exam_name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{1,}$')]),
      exam_code: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{5}$')]),
      exam_cfu: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,2}$')])
    })
  }

  examListArray(){
   return this.examForm.get('examList') as FormArray
  }

  addExam(){
    var nome = this.examListArray().at(0).value.exam_name
    var code = this.examListArray().at(0).value.exam_code
    var cfu = this.examListArray().at(0).value.exam_cfu

    console.log(nome)
    console.log(code)
    console.log(cfu)
    
    this.mongo.insertEsame(nome,code,cfu).subscribe((data: any) => {
      console.log(data)
      alert('L\'esame è stato inserito con successo')
      window.location.reload()
    })
  }

  removeExam(){
    var name = this.examRForm.value.exam_name
    console.log(name)
    if(confirm('Sei sicuro di voler eliminare questo esame?')){
      this.mongo.removeEsame(name).subscribe((data: any) => {
        console.log(data)
        alert('L\'esame è stato eliminato con successo')
        window.location.reload()
      })
    }
  }

  submitRemove(form: FormGroupDirective) {
    if (form.valid) {
      this.removeExam()
    }
  }

  submitAdd(form: FormGroupDirective) {
    if (form.valid) {
      this.addExam()
    }
  }

  get exam_nameR() { return this.examRForm.get("exam_name") }
  get exam_name() { return this.examForm.get("exam_name") }
  get exam_code() { return this.examForm.get("exam_code") }
  get exam_cfu() { return this.examForm.get("exam_cfu") }

  // getFormData(l: number){
  //  console.log(this.examForm.value)
  // }

}
