import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MongoService } from '../../servizi/mongo.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrl: './piano.component.css'
})
export class PianoComponent implements OnInit, OnDestroy{

  annoIndex: number = 2
  primoIndex: number = 3
  secondoIndex: number = 4
  terzoIndex: number = 5
  compIndex: number = 6
  esamiIndex: number = 7
  approvatoIndex: number = 8
  nomeIndex: number = 9
  cognomeIndex: number = 10
  emailIndex: number = 11
  // freshIndex: number = 12
  datainvioIndex: number = 13
  dataapprovazioneIndex: number = 14

  matricola: string = ""
  a: boolean = false
  piano: any
  anno: any
  primo : any[] = []
  secondo : any[] = []
  terzo : any[] = []
  comp : any[] = []
  esami : any[] = []
  nome: string = ""
  cognome: string = ""
  email: string = ""
  // fresh: boolean = false
  datainvio: string = ""
  dataapprovazione: string = ""

  sottoscrizione: any
  submongo: any

  constructor(private route: ActivatedRoute, private mongo: MongoService, private router: Router){}

  ngOnInit(): void {
    this.sottoscrizione = this.route.paramMap.subscribe((params: ParamMap)=>{
      this.matricola = params.get('id')!
      if(this.matricola.includes("a")){
        this.matricola = this.matricola.replace("a","")
        this.a = true
      }
       this.submongo = this.mongo.getPiano(this.matricola).subscribe((data: any) => {
        console.log("DATA: " + data)
        if(data === null){
          alert('Nessun piano trovato per la matricola ' + this.matricola)
          this.router.navigate(['/pianiapprovati'])
          return
        }
        
        this.piano = Object.values(data)
        console.log("PIANO: " + this.piano)

        if(this.a && !this.piano[this.approvatoIndex]){
          alert('Il piano per la matricola ' + this.matricola + " non è stato ancora approvato. Controllare nella lista dei piani in sospeso")
          this.router.navigate(['/pianiapprovati'])
          return
        }
        
        this.anno = this.piano[this.annoIndex]
        console.log("ANNO: " + this.anno)
        this.getPrimo()
        this.getSecondo()
        this.getTerzo()
        this.getComp()
        this.getEsami()
        this.nome = this.piano[this.nomeIndex]
        this.cognome = this.piano[this.cognomeIndex]
        this.email = this.piano[this.emailIndex]
        this.datainvio = this.piano[this.datainvioIndex]
        this.dataapprovazione = this.piano[this.dataapprovazioneIndex]
        
        console.log(this.piano)
        console.log(this.primo)
        console.log(this.secondo)
        console.log(this.terzo)
        console.log(this.comp)
        console.log(this.esami)
        console.log(this.generastringa())
      })
    })
    console.log(this.matricola)
  }

  ngOnDestroy(): void {
    this.sottoscrizione.unsubscribe()
    this.submongo.unsubscribe()
  }

  getA() { return this.a }

  // getAnno(){
  //   var str = this.piano[this.annoIndex]
  //   console.log(str)
  //   this.anno = Object.values(JSON.parse(str))
  // }
  getPrimo(){
    var str = this.piano[this.primoIndex]
    console.log(str)
    this.primo = Object.values(JSON.parse(str))
  }
  getSecondo(){
    var str = this.piano[this.secondoIndex]
    console.log(str)
    this.secondo = Object.values(JSON.parse(str))
  }
  getTerzo(){
    var str = this.piano[this.terzoIndex]
    console.log(str)
    this.terzo = Object.values(JSON.parse(str))
  }
  getComp(){
    var str = this.piano[this.compIndex]
    console.log(str)
    this.comp = Object.values(JSON.parse(str))
  }
  getEsami(){
    var str = this.piano[this.esamiIndex]
    console.log(str)
    this.esami = Object.values(JSON.parse(str))
  }
  nextYear(anno: string){
    var y = parseInt(anno)
    var ny = y+1
    return ny.toString()
  }

  approva(){
    if(confirm('Sei sicuro di voler approvare questo piano?')){
      this.mongo.approvaPiano(this.matricola,new Date().toLocaleString()).subscribe((data: any) => {
        console.log(data)
        alert('Il piano è stato approvato con successo')
        //this.inviamail()
        //this.inviamailstudente()
        this.router.navigate(['/pianiinsospeso'])
      })
    }
  }

  async inviamail(){
    emailjs.init('m0RVEevtmq6kUBfqY')
    let response = await emailjs.send("service_yd5b4a9","template_8eoalav",{
      from_name: this.nome + " " + this.cognome,
      to_name: "Prof X",
      from_email: "alberto.ml@tiscali.it",
      subject: this.matricola,
      message: this.generastringa()
      });
  }

  async inviamailstudente(){
    emailjs.init('m0RVEevtmq6kUBfqY')
    let response = await emailjs.send("service_yd5b4a9","template_wjrfdrd",{
      to_name: this.nome + " " + this.cognome,
      from_email: this.email,
      subject: "stato approvato",
      message: "Il suo piano di studi è stato approvato manualmente dalla commissione"
      });
  }

  generastringa(){
    var str = this.nome + " " + this.cognome + " " + this.matricola
    for(var esame of this.esami[0]){
      str = str + "\n" + esame.exam_name + " " + esame.exam_code + " " + esame.exam_cfu
    }
    return str
  }
}
