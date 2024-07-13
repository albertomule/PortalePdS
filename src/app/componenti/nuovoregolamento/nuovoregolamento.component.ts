import { AfterViewInit, Component, ElementRef, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'app-nuovoregolamento',
  templateUrl: './nuovoregolamento.component.html',
  styleUrl: './nuovoregolamento.component.css'
})
export class NuovoregolamentoComponent{

  // @ViewChild('inpgroup')
  // inp!: ElementRef;

  // @ViewChild('inpgroup', { static: false })
  // divElem!: ElementRef;

  // ngAfterViewInit() {
  //   var div = this.inp.nativeElement.querySelector(".inpgroup")
  //   console.log(div);
  // }

  values: string[] = []

//   addBtn = document.querySelector(".add")
//  // input = document.querySelector(".inpgroup")

//   addInput(){
//     console.log(this.inp)
//     console.log(this.addBtn)
//    const name = document.createElement("input")
//    name.type="text"
//    name.placeholder="Enter your name"

//    const email = document.createElement("input")
//    email.type="email"
//    email.placeholder="Enter your email"

//    const btn = document.createElement("a")
//    btn.className = "delete"
//    btn.innerHTML = "&times"

//    const flex = document.createElement("div")
//    flex.className = "flex"
//    console.log(flex)

//    this.inp.nativeElement.querySelector("div").appendChild(flex)
//    flex.appendChild(name)
//    flex.appendChild(email)
//    flex.appendChild(btn)
   
//   }

  addValue(){
    this.values.push("")
  }

  removeValue(i: number){
    this.values.splice(i,1)
  }

 

  // this.addBtn?.addEventListener("click", addInput())
}
