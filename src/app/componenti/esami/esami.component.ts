import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MongoService } from '../../servizi/mongo.service';

@Component({
  selector: 'app-esami',
  templateUrl: './esami.component.html',
  styleUrl: './esami.component.css'
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
    // this.examListArray().push(this.getExamFields())
    // console.log(this.examListArray().controls[0].value)
    
    var nome = this.examListArray().at(0).value.exam_name
    var code = this.examListArray().at(0).value.exam_code
    var cfu = this.examListArray().at(0).value.exam_cfu

    console.log(nome)
    console.log(code)
    console.log(cfu)
    var str = "?n=" + nome + "&c=" + code + "&cfu=" + cfu
    console.log(str)
    
    this.mongo.insertEsame(str).subscribe((data: any) => {
      console.log(data)
    })

    window.location.reload()
  }

  // removeExam(i: number){
  //   this.examListArray().removeAt(i)
  // }

  // getFormData(l: number){
  //  console.log(this.examForm.value)
  // }

}
