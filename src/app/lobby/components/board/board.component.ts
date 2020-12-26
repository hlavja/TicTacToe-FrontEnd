import {Component, Input, OnInit} from '@angular/core';
import {MessageDTO} from "../../../shared/swagger-generated";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() showPopup
  @Input() message: MessageDTO

  constructor() { }

  ngOnInit(): void {
  }

  accept(){

  }

  reject(){

  }

}
