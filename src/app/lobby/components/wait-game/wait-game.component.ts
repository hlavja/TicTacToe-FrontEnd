import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-wait-game',
  templateUrl: './wait-game.component.html',
  styleUrls: ['./wait-game.component.scss']
})
export class WaitGameComponent implements OnInit {

  @Input() showPopup
  @Input() opponentLogin
  @Input() status: string
  @Output() showPopupChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

}
