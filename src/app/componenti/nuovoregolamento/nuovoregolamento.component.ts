import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, model, signal, viewChild } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { MongoService } from '../../servizi/mongo.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-nuovoregolamento',
  templateUrl: './nuovoregolamento.component.html',
  styleUrl: './nuovoregolamento.component.css',
  standalone: false
})
export class NuovoregolamentoComponent{

  yearStart = 2000
  yearsAfter = 5
  currentYear: number
  years: number[] = []
  selectVal: number = 0

 // annoIndex: number = 1
  primoIndex: number = 3
  secondoIndex: number = 4
  terzoIndex: number = 5
  compIndex: number = 6
  maxcfuIndex: number = 7
  mincfuIndex: number = 8

  regolamento: any
  primo : any[] = []
  secondo : any[] = []
  terzo : any[] = []
  comp : any[] = []

  regolamenti: any

  constructor(private fb: FormBuilder, private mongo: MongoService, private router: Router){
    this.currentYear = new Date().getFullYear()
    for(let year = this.yearStart; year <= this.currentYear + this.yearsAfter; year++) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.mongo.getRegolamenti().subscribe((data: any) => {
      this.regolamenti = Object.keys(data).map((key) => { 
        data[key]['id'] = key
        return data[key]
      })
      console.log(this.regolamenti)
    })
  }

  regolamentoForm: FormGroup = this.fb.group({
    exam1Form: this.fb.group({
      exam1List: this.fb.array([this.getExamFields()])
    }),
    exam2Form: this.fb.group({
      exam2List: this.fb.array([this.getExamFields()])
    }),
    exam3Form: this.fb.group({
      exam3List: this.fb.array([this.getExamFields()])
    }),
    exam4Form: this.fb.group({
      exam4List: this.fb.array([this.getExamFields()])
    }),
    cfuForm: this.fb.group({
      cfumin: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
      cfumax: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]]
    })
  })
  
  get cfumin() { return this.regolamentoForm.get("cfuForm.cfumin") }
  get cfumax() { return this.regolamentoForm.get("cfuForm.cfumax") }


  getExamFields(){
    return this.fb.group({
      exam_name: ['',[Validators.required, Validators.pattern('^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,}$')]],
      exam_code: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]{5}$')]],
      exam_cfu: ['',[Validators.required, Validators.pattern('^[0-9]{1,2}$')]]
    })
  }

  examListArray(l: number){
    switch(l){
      case 1: return this.regolamentoForm.get('exam1Form.exam1List') as FormArray
      case 2: return this.regolamentoForm.get('exam2Form.exam2List') as FormArray
      case 3: return this.regolamentoForm.get('exam3Form.exam3List') as FormArray
      default: return this.regolamentoForm.get('exam4Form.exam4List') as FormArray
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
      case 1: return this.regolamentoForm.get('exam1Form')!.value
      case 2: return this.regolamentoForm.get('exam2Form')!.value
      case 3: return this.regolamentoForm.get('exam3Form')!.value
      default: return this.regolamentoForm.get('exam4Form')!.value
    }
  }

  logFormData(l: number){
    switch(l){
      case 1: console.log(this.regolamentoForm.get('exam1Form')!.value); break;
      case 2: console.log(this.regolamentoForm.get('exam2Form')!.value); break;
      case 3: console.log(this.regolamentoForm.get('exam3Form')!.value); break;
      default: console.log(this.regolamentoForm.get('exam4Form')!.value); break;
    }
  }

  invia(){
    // this.mongo.insertRegolamento(this.selectVal.toString(), [this.exam1Form.value, this.exam2Form.value, this.exam3Form.value, this.exam4Form.value]).subscribe((data: any) => {
    //   console.log(data)
    //   alert('Il regolamento è stato inserito con successo')
    //   this.router.navigate(['/regolamenti'])
    // })
  }

  inviatest(form: FormGroupDirective){
    if (form.valid) {
      if(this.selectVal == 0){
        alert('ERRORE: Anno non selezionato')
        return
      }
      if(this.regolamentoExists(this.selectVal.toString())){
        if(!confirm('Esiste già un regolamento per l\'anno '+this.selectVal.toString()+'. Sovrascriverlo?')){
          return
        }
      }

      console.log(this.regolamentoForm.get("cfuForm.cfumax")!.value)
      this.logFormData(1)
      this.logFormData(2)
      this.logFormData(3)
      this.logFormData(4)
      this.mongo.insertRegolamento(
        this.selectVal.toString(), 
        this.regolamentoForm.get("cfuForm.cfumax")!.value.toString(),
        this.regolamentoForm.get("cfuForm.cfumin")!.value.toString(),
        [this.getFormData(1), 
        this.getFormData(2), 
        this.getFormData(3), 
        this.getFormData(4)]).subscribe((data: any) => {
          console.log(data)
          alert('Il regolamento è stato inserito con successo')
          //this.router.navigate(['/regolamenti'])
      })
    }
    else{
      alert('ERRORE: Alcuni campi non sono stati riempiti')
    }
    
  }

  readonly loadYear = signal('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {loadYear: this.loadYear()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.loadYear.set(result);
        console.log(this.loadYear())
        this.caricaRegolamento(this.loadYear())
      }
    });
  }

  caricaRegolamento(anno: string){
    this.mongo.getRegolamento(anno).subscribe((data: any) => {

      if(data == null){
        console.log("Regolamento non trovato")
        alert('Regolamento per l\'anno specificato non trovato')
        return
      }

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

      //this.selectVal = this.regolamento[this.annoIndex]

      this.removeExam(1,0)
      this.removeExam(2,0)
      this.removeExam(3,0)
      this.removeExam(4,0)

      for(let esame of this.primo[0]){
        this.addExam(1)
       // this.examForm.get('examList.'+index+'.selectValAltroValue')?.setValue(value)
        var index = this.examListArray(1).length-1
       // this.regolamentoForm.get('exam1Form')?.get('exam1List.'+index+'.exam_name')?.setValue(esame.exam_name)
        this.regolamentoForm.get('exam1Form.exam1List.'+index+'.exam_name')?.setValue(esame.exam_name)
        this.regolamentoForm.get('exam1Form.exam1List.'+index+'.exam_code')?.setValue(esame.exam_code)
        this.regolamentoForm.get('exam1Form.exam1List.'+index+'.exam_cfu')?.setValue(esame.exam_cfu)
        // this.examListArray(1).at(index).value.exam_name = esame.exam_name
        // this.examListArray(1).at(index).value.exam_code = esame.exam_code
        // this.examListArray(1).at(index).value.exam_cfu = esame.exam_cfu
        // console.log(esame[0].exam_name)
        // console.log(this.examListArray(1).at(index).value.exam_name)
        // console.log(this.regolamentoForm.get('exam1Form.exam1List.'+index+'.exam_name')?.value)
      }
      for(let esame of this.secondo[0]){
        this.addExam(2)
        var index = this.examListArray(2).length-1
       // console.log(index)
        this.regolamentoForm.get('exam2Form')?.get('exam2List.'+index+'.exam_name')?.setValue(esame.exam_name)
        //this.regolamentoForm.get('exam2Form.exam2List.'+index+'.exam_name')?.setValue(esame[0].exam_name)
        this.regolamentoForm.get('exam2Form.exam2List.'+index+'.exam_code')?.setValue(esame.exam_code)
        this.regolamentoForm.get('exam2Form.exam2List.'+index+'.exam_cfu')?.setValue(esame.exam_cfu)
      }
      for(let esame of this.terzo[0]){
        this.addExam(3)
        var index = this.examListArray(3).length-1
        //console.log(index)
        this.regolamentoForm.get('exam3Form.exam3List.'+index+'.exam_name')?.setValue(esame.exam_name)
        this.regolamentoForm.get('exam3Form.exam3List.'+index+'.exam_code')?.setValue(esame.exam_code)
        this.regolamentoForm.get('exam3Form.exam3List.'+index+'.exam_cfu')?.setValue(esame.exam_cfu)
      }
      for(let esame of this.comp[0]){
        this.addExam(4)
        var index = this.examListArray(4).length-1
        this.regolamentoForm.get('exam4Form.exam4List.'+index+'.exam_name')?.setValue(esame.exam_name)
        this.regolamentoForm.get('exam4Form.exam4List.'+index+'.exam_code')?.setValue(esame.exam_code)
        this.regolamentoForm.get('exam4Form.exam4List.'+index+'.exam_cfu')?.setValue(esame.exam_cfu)
      }

      this.regolamentoForm.get('cfuForm.cfumax')?.setValue(this.regolamento[this.maxcfuIndex])

      this.regolamentoForm.get('cfuForm.cfumin')?.setValue(this.regolamento[this.mincfuIndex])

      // console.log(this.secondo)
      // console.log(this.terzo)
      // this.logFormData(2)
      // this.logFormData(3)

    })
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

  regolamentoExists(anno: string){
    for(let reg of this.regolamenti){
      //console.log(reg.anno)
      if(reg.anno == anno){
        return true
      }
    }
    return false
  }

}







export interface DialogData {
  loadYear: string;
}

@Component({
  selector: 'app-nuovoregolamentodialog',
  templateUrl: './nuovoregolamentodialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly loadYear = model(this.data.loadYear);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
