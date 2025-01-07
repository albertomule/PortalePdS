import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MongoService } from '../../servizi/mongo.service';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { DatistudenteService } from '../../servizi/datistudente.service';
import emailjs from '@emailjs/browser';
import { MailService } from '../../servizi/mail.service';


@Component({
  selector: 'app-nuovopiano',
  templateUrl: './nuovopiano.component.html',
  styleUrl: './nuovopiano.component.css',
  standalone: false
})
export class NuovopianoComponent {
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
  maxcfu: number = 0
  mincfu: number = 0
  //storedvalue: number = 0
  //storedvaluetendina : number = 0
  //inaltro: boolean = false

  sottoscrizione: any
  submongo: any

  matricola: number = 0
  piano: any
  approvatoIndex: number = 8
  esami: any
  //selectVal: string = ""
  //altro: boolean = false

  // nome: string = ""
  // cognome: string = ""
  // email: string = ""
  // fresh: boolean = false

  constructor(private route: ActivatedRoute, private mongo: MongoService, private router: Router, private datistudente: DatistudenteService, private mail: MailService){}

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

        console.log(this.datistudente.nome)
        console.log(this.datistudente.cognome)
        console.log(this.datistudente.email)
        console.log(this.datistudente.fresh)
        
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

        this.mongo.getEsami().subscribe((data: any) => {
          this.esami = Object.keys(data).map((key) => { 
            data[key]['id'] = key
            return data[key]
          })
          console.log(this.esami)
        })

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
      conseguito: new FormControl(false),
      selectVal: new FormControl(''),
      selectValAltro: new FormControl(false),
      selectValAltroValue: new FormControl(0),
      selectValValue: new FormControl(0)
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

  get selectVal() { return this.examForm.get("examList.selectVal") }

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
    if(this.examListArray().at(i).value.selectValValue > 0){
      this.maxcfu = (this.maxcfu-0) + (this.examListArray().at(i).value.selectValValue-0)
    }
    else{
      this.maxcfu = (this.maxcfu-0) + (this.examListArray().at(i).value.exam_cfu-0)
    }
    this.examListArray().removeAt(i)
  }


 getSelectVal(i: number){
    return this.examListArray().at(i).value.selectVal
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

  fixPianificato(i: number){ //conseguito è stato cliccato
    //se pianificato è true, non mi interessa che conseguito sia stato cliccato
    console.log(this.examcListArray().at(i).value)
    if(this.examcListArray().at(i).value.pianificato == true) return
    //se conseguito è true, devo mettere pianificato a true e sottrarre cfu da maxcfu
    if(this.examcListArray().at(i).value.conseguito == true){
      this.examcListArray().at(i).value.pianificato = true
      console.log(this.examcListArray().at(i).value)
      this.maxcfu = (this.maxcfu-0) - (this.examcListArray().at(i).value.exam_cfu-0)
      this.mincfu = (this.mincfu-0) - (this.examcListArray().at(i).value.exam_cfu-0)
    }
  }
  fixConseguito(i: number){ //pianificato è stato cliccato
    //se conseguito è true, devo checkare
    if(this.examcListArray().at(i).value.conseguito == true){
      //se pianificato è false, devo mettere conseguito a false e sommare cfu a maxcfu
      if(this.examcListArray().at(i).value.pianificato == false){
        this.examcListArray().at(i).value.conseguito = false
        console.log(this.examcListArray().at(i).value)
      } //else non dovrebbe mai verificarsi
      // else{
      //   this.maxcfu = (this.maxcfu-0) - (this.examcListArray().at(i).value.exam_cfu-0)
      // }
    }
    //sommo e sottraggo cfu in base a pianificato tickato o no
    if(this.examcListArray().at(i).value.pianificato == false){
      this.maxcfu = (this.maxcfu-0) + (this.examcListArray().at(i).value.exam_cfu-0)
      this.mincfu = (this.mincfu-0) + (this.examcListArray().at(i).value.exam_cfu-0)
    }
    else{
      this.maxcfu = (this.maxcfu-0) - (this.examcListArray().at(i).value.exam_cfu-0)
      this.mincfu = (this.mincfu-0) - (this.examcListArray().at(i).value.exam_cfu-0)
    }
    console.log(this.examcListArray().at(i).value)
    
  }

  pianificatoCheck(i: number){
    return this.examcListArray().at(i).value.pianificato
  }
  conseguitoCheck(i: number){
    return this.examcListArray().at(i).value.conseguito
  }
  randomMatricola(){
    this.matricola = Math.floor(Math.random() * 999999)
    return this.matricola
  }

  invia(){
    if(this.maxcfu > 0){
      alert('Impossibile inviare il piano: alcuni CFU previsti per esami complementari / a libera scelta non sono ancora stati allocati')
      return
    }
    else if(this.maxcfu < 0){
      alert('Impossibile inviare il piano: troppi CFU allocati per esami complementari / a libera scelta')
      return
    }
    else if(this.mincfu > 0){
      alert('Impossibile inviare il piano: non abbastanza CFU allocati per esami complementari')
      return
    }
    //this.randomMatricola().toString()
    this.mongo.insertPiano(this.randomMatricola().toString(), this.anno, 
    this.datistudente.nome, 
    this.datistudente.cognome,
    this.datistudente.email,
    this.datistudente.fresh,
    new Date().toLocaleString(),
    [
      this.exam1Form.value, 
      this.exam2Form.value, 
      this.exam3Form.value, 
      this.examcForm.value, 
      this.examForm.value
    ]).subscribe((data: any) => {
      console.log(data)
      this.mongo.getPiano(this.matricola.toString()).subscribe((datax: any) => {
        console.log("DATA: " + datax)
        
        this.piano = Object.values(datax)
        console.log("PIANO: " + this.piano)
        alert('Il piano è stato inviato con successo (Matricola: ' + this.matricola + ')')
        //this.inviamail()
        this.mail.inviaMailStudente(
          this.datistudente.nome + " " + this.datistudente.cognome,
          this.datistudente.email,
          this.piano[this.approvatoIndex] ? "approvato" : "in sospeso",
          this.piano[this.approvatoIndex] ? 
          "Il piano di studi è stato inviato correttamente e approvato automaticamente dal PortalePDS" : 
          "Il piano di studi è stato inviato correttamente, ma attualmente in sospeso. Attenda un'ulteriore email dal PortalePDS a seguito di una revisione del suo piano da parte della commisione"
        )
        this.router.navigate(['/start'])

      })
    })
  }

  // async inviamail(){
  //   emailjs.init('m0RVEevtmq6kUBfqY')
  //   let response = await emailjs.send("service_yd5b4a9","template_wjrfdrd",{
  //     //from_name: "Albertox",
  //     to_name: this.datistudente.nome + " " + this.datistudente.cognome,
  //     from_email: this.datistudente.email,
  //     subject: this.piano[this.approvatoIndex] ? 
  //     "approvato" : 
  //     "in sospeso",
  //     message: this.piano[this.approvatoIndex] ? 
  //     "Il piano di studi è stato inviato correttamente e approvato automaticamente dal PortalePDS" : 
  //     "Il piano di studi è stato inviato correttamente, ma attualmente in sospeso. Attenda un'ulteriore email dal PortalePDS a seguito di una revisione del suo piano da parte della commisione"
  //     });
  // }

  fillDataFromSelectVal(value: any, index: number){

    if(value=='altro'){//clicco tendina altro
      this.maxcfu = (this.maxcfu-0) + (this.examListArray().at(index).value.selectValValue-0)

      this.examForm.get('examList.'+index+'.selectValAltro')?.setValue(true)
      this.examForm.get('examList.'+index+'.selectValValue')?.setValue(0)
      this.examForm.get('examList.'+index+'.exam_name')?.setValue('')
      this.examForm.get('examList.'+index+'.exam_code')?.setValue('')
      this.examForm.get('examList.'+index+'.exam_cfu')?.setValue('')
      return
    } 

    for(let esame of this.esami){
      if(esame.nome==value){
        if(this.examListArray().at(index).value.selectValAltro == false){//provengo da tendina non altro
          this.maxcfu = (this.maxcfu-0) + (this.examListArray().at(index).value.selectValValue-0)
        }
        else{//provengo da tendina altro
          this.maxcfu = (this.maxcfu-0) + (this.examListArray().at(index).value.selectValAltroValue-0)

          this.examForm.get('examList.'+index+'.selectValAltro')?.setValue(false)
          this.examForm.get('examList.'+index+'.selectValAltroValue')?.setValue(0)
        }
        this.examForm.get('examList.'+index+'.exam_name')?.setValue(esame.nome)
        this.examForm.get('examList.'+index+'.exam_code')?.setValue(esame.codice)
        this.examForm.get('examList.'+index+'.exam_cfu')?.setValue(esame.cfu)
        this.examForm.get('examList.'+index+'.selectValValue')?.setValue(esame.cfu)
        this.maxcfu = (this.maxcfu-0) - (esame.cfu-0)
        return
      }
    }
  }

  updateMaxCFU(event: Event, index: number){
    //aggiungo cfu vecchi salvati in altrovalue
    this.maxcfu = (this.maxcfu-0) + (this.examListArray().at(index).value.selectValAltroValue-0)

    //parso cfu nuovi campo altro
    const newValue = (event.target as HTMLInputElement).value
    var value = parseInt(newValue)
    if(Number.isNaN(value)) value=0

    //sottraggo cfu nuovi campo altro
    this.maxcfu = (this.maxcfu-0) - (value-0)

    //salvo nuovo valore cfu in altrovalue
    this.examForm.get('examList.'+index+'.selectValAltroValue')?.setValue(value)
  }


}
