import { AfterViewInit, Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-nuovoregolamento',
  templateUrl: './nuovoregolamento.component.html',
  styleUrl: './nuovoregolamento.component.css'
})
export class NuovoregolamentoComponent{


  yearStart = 2000
  yearsAfter = 5
  currentYear: number
  years: number[] = []
  selectVal: number = 0

  constructor(){
    this.currentYear = new Date().getFullYear()
    for(let year = this.yearStart; year <= this.currentYear + this.yearsAfter; year++) {
      this.years.push(year);
    }
  }

  exam1Form: FormGroup = new FormGroup({
    exam1List: new FormArray([this.getExamFields()])
  })
  exam2Form: FormGroup = new FormGroup({
    exam2List: new FormArray([this.getExamFields()])
  })
  exam3Form: FormGroup = new FormGroup({
    exam3List: new FormArray([this.getExamFields()])
  })
  exam4Form: FormGroup = new FormGroup({
    exam4List: new FormArray([this.getExamFields()])
  })

  getExamFields(){
    return new FormGroup({
      exam_name: new FormControl(''),
      exam_code: new FormControl(''),
      exam_cfu: new FormControl('')
    })
  }

  examListArray(l: number){
    switch(l){
      case 1: return this.exam1Form.get('exam1List') as FormArray
      case 2: return this.exam2Form.get('exam2List') as FormArray
      case 3: return this.exam3Form.get('exam3List') as FormArray
      default: return this.exam4Form.get('exam4List') as FormArray
    }
    
  }

  addExam(l: number){
    this.examListArray(l).push(this.getExamFields())
  }

  removeExam(l: number, i: number){
    this.examListArray(l).removeAt(i)
  }

  getFormData(l: number){
    switch(l){
      case 1: console.log(this.exam1Form.value); break;
      case 2: console.log(this.exam2Form.value); break;
      case 3: console.log(this.exam3Form.value); break;
      default: console.log(this.exam4Form.value); break;
    }
  }

  getAllFormData(){
    console.log(this.selectVal)
    console.log(this.exam1Form.value)
    console.log(this.exam2Form.value)
    console.log(this.exam3Form.value)
    console.log(this.exam4Form.value)
  }
}
