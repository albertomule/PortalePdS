import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MongoService } from '../../servizi/mongo.service';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { DatistudenteService } from '../../servizi/datistudente.service';
import emailjs from '@emailjs/browser';


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
  maxcfuIndex: number = 7

  anno: string = ""
  regolamento: any
  primo : any[] = []
  secondo : any[] = []
  terzo : any[] = []
  comp : any[] = []
  maxcfu: number = 0
  storedvalue: number = 0
  storedvaluetendina : number = 0
  inaltro: boolean = false

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

  constructor(private route: ActivatedRoute, private mongo: MongoService, private router: Router, private datistudente: DatistudenteService){}

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
      selectVal: new FormControl('')
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
    this.maxcfu = (this.maxcfu-0) + (this.examListArray().at(i).value.exam_cfu-0)
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
    if(this.examcListArray().at(i).value.pianificato == false)
      this.maxcfu = (this.maxcfu-0) + (this.examcListArray().at(i).value.exam_cfu-0)
    else
      this.maxcfu = (this.maxcfu-0) - (this.examcListArray().at(i).value.exam_cfu-0)
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
        this.router.navigate(['/start'])

      })
    })
  }

  async inviamail(){
    emailjs.init('m0RVEevtmq6kUBfqY')
    let response = await emailjs.send("service_yd5b4a9","template_wjrfdrd",{
      //from_name: "Albertox",
      to_name: this.datistudente.nome + " " + this.datistudente.cognome,
      from_email: this.datistudente.email,
      subject: this.piano[this.approvatoIndex] ? 
      "approvato" : 
      "in sospeso",
      message: this.piano[this.approvatoIndex] ? 
      "Il piano di studi è stato inviato correttamente e approvato automaticamente dal PortalePDS" : 
      "Il piano di studi è stato inviato correttamente, ma attualmente in sospeso. Attenda un'ulteriore email dal PortalePDS a seguito di una revisione del suo piano da parte della commisione"
      });
  }

  // setAltro(){
  //   this.altro = true
  // }
  // resetAltro(){
  //   this.altro = false
  // }

  fillDataFromSelectVal(value: any, index: number){
     console.log(value)
    console.log(this.examListArray().at(index).value.exam_cfu)

    if(value=='altro'){
      this.maxcfu = (this.maxcfu-0) + (this.storedvaluetendina-0)
      this.inaltro = true
      return
    } 

    for(let esame of this.esami){
      if(esame.nome==value){
        console.log(this.maxcfu)
        if(!this.inaltro)
          this.maxcfu = (this.maxcfu-0) + (this.storedvaluetendina-0)
        else{
          this.maxcfu = (this.maxcfu-0) + (this.examListArray().at(index).value.exam_cfu-0)
          this.inaltro = false
          this.examListArray().at(index).reset()
          this.storedvalue = 0
        }
        this.examListArray().at(index).value.exam_name = esame.nome
        this.examListArray().at(index).value.exam_code = esame.codice
        this.examListArray().at(index).value.exam_cfu = esame.cfu
         console.log(this.examListArray().at(index).value.exam_name)
         console.log(this.examListArray().at(index).value.exam_code)
         console.log(this.examListArray().at(index).value.exam_cfu)
         this.storedvaluetendina = esame.cfu
        this.maxcfu = (this.maxcfu-0) - (esame.cfu-0)
        return
      }
    }
  }

  updateMaxCFU(event: Event){
    console.log(this.storedvalue)
    this.maxcfu = (this.maxcfu-0) + (this.storedvalue-0)
    const newValue = (event.target as HTMLInputElement).value
    var value = parseInt(newValue)
    console.log(value)
    if(Number.isNaN(value)) value=0
    console.log(value)
    this.maxcfu = (this.maxcfu-0) - (value-0)
    this.storedvalue = value
  }


}
