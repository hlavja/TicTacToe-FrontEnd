import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-wait-window',
  templateUrl: './wait-window.component.html',
  styleUrls: ['./wait-window.component.scss']
})
export class WaitWindowComponent implements OnInit {

  @Input() accepted = false;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    console.log("aa");
    setTimeout(() =>{
      this.activeModal.close();
    }, 1500);
  }

}
