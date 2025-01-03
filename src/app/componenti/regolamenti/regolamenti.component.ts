import { Component, OnInit } from '@angular/core';
import { MongoService } from '../../servizi/mongo.service';

@Component({
  selector: 'app-regolamenti',
  templateUrl: './regolamenti.component.html',
  styleUrl: './regolamenti.component.css',
  standalone: false
})
export class RegolamentiComponent implements OnInit{

  regolamenti: any
  submongo: any

  constructor(private mongo: MongoService){}

  ngOnInit(): void {
    this.submongo = this.mongo.getRegolamenti().subscribe((data: any) => {
      this.regolamenti = Object.keys(data).map((key) => { 
        data[key]['id'] = key
        return data[key]
      })
      console.log(this.regolamenti)
    })
  }

  ngOnDestroy(): void {
    this.submongo.unsubscribe()
  }
}
