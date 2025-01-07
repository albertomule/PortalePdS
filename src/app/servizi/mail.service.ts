import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  initKey = 'm0RVEevtmq6kUBfqY'
  servizioGmail = "service_yd5b4a9"
  templateCommissione = "template_8eoalav"
  templateStudente = "template_wjrfdrd"

  mailAttive = false

  constructor() { }

  async inviaMailCommissione(nomeCommissione: string, nomeStudente: string, email: string, matricola: string, messaggio: string, stato: string, seguito: string){ //per la commissione
    if(!this.mailAttive) return

    emailjs.init(this.initKey)
    let response = await emailjs.send(this.servizioGmail,this.templateCommissione,{
      from_name: nomeStudente, //nome+cognome studente
      to_name: nomeCommissione, //nome membro di commissione
      from_email: email, //mail commissione
      subject: matricola, //matricola
      message: messaggio, //messaggio = stringa
      status: stato, //"un nuovo piano è stato approvato/rifiutato"
      followup: seguito //"Stringa completa" / "Motivazione"
      });
  }

  async inviaMailStudente(nome: string, email: string, soggetto: string, messaggio: string){ //per lo studente
    if(!this.mailAttive) return

    emailjs.init(this.initKey)
    let response = await emailjs.send(this.servizioGmail,this.templateStudente,{
      to_name: nome, //nome+cognome studente
      from_email: email, //mail studente
      subject: soggetto, //stato approvato/rifiutato
      message: messaggio //messaggio
      });
  }
}
