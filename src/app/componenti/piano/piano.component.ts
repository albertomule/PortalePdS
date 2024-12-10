import { Component, OnDestroy, OnInit, inject, model, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MongoService } from '../../servizi/mongo.service';
import emailjs from '@emailjs/browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
        //this.inviamail(this.generastringa(), "un nuovo piano è stato approvato", "Stringa completa")
        //this.inviamailstudente("stato approvato", "Il suo piano di studi è stato approvato dalla commissione")
        this.router.navigate(['/pianiinsospeso'])
      })
    }
  }

  rifiuta(motivazione: string){
    if(confirm('Sei sicuro di voler rifiutare questo piano?')){
      this.mongo.rifiutaPiano(this.matricola).subscribe((data: any) => {
        console.log(data)
        alert('Il piano è stato rifiutato con successo')
        //this.inviamail(motivazione, "un piano è stato rifiutato", "Motivazione")
        //this.inviamailstudente("stato rifiutato", motivazione)
        this.router.navigate(['/pianiinsospeso'])
      })
    }
  }

  async inviamail(messaggio: string, stato: string, seguito: string){ //per la commissione
    emailjs.init('m0RVEevtmq6kUBfqY')
    let response = await emailjs.send("service_yd5b4a9","template_8eoalav",{
      from_name: this.nome + " " + this.cognome, //nome+cognome studente
      to_name: "Prof X", //nome membro di commissione
      from_email: "alberto.ml@tiscali.it", //mail commissione
      subject: this.matricola, //matricola
      message: messaggio, //messaggio = stringa
      status: stato, //"un nuovo piano è stato approvato/rifiutato"
      followup: seguito //"Stringa completa" / "Motivazione"
      });
  }

  async inviamailstudente(soggetto: string, messaggio: string){ //per lo studente
    emailjs.init('m0RVEevtmq6kUBfqY')
    let response = await emailjs.send("service_yd5b4a9","template_wjrfdrd",{
      to_name: this.nome + " " + this.cognome, //nome+cognome studente
      from_email: this.email, //mail studente
      subject: soggetto, //stato approvato/rifiutato
      message: messaggio //messaggio
      });
  }

  generastringa(){
    var str = this.nome + " " + this.cognome + " " + this.matricola
    for(var esame of this.esami[0]){
      str = str + "\n" + esame.exam_name + " " + esame.exam_code + " " + esame.exam_cfu
    }
    return str
  }

  readonly rifiutaMessaggio = signal('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {rifiutaMessaggio: this.rifiutaMessaggio()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.rifiutaMessaggio.set(result);
        console.log(this.rifiutaMessaggio())
        this.rifiuta(this.rifiutaMessaggio())
      }
    });
  }
}

export interface DialogData {
  rifiutaMessaggio: string;
}

@Component({
  selector: 'app-pianorifiutadialog',
  templateUrl: './pianorifiutadialog.component.html',
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
  readonly rifiutaMessaggio = model(this.data.rifiutaMessaggio);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
