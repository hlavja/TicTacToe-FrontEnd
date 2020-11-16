import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() menuItemKey: number;
  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  logOut(){
  }

}
