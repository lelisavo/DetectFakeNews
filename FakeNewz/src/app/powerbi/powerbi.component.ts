import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-powerbi',
  templateUrl: './powerbi.component.html',
  styleUrls: ['./powerbi.component.css'],
})
export class PowerbiComponent implements OnInit {
  @Input()
  set supportingImg(supportingImg: string) {
    // console.log(supportingImg);
  }
  constructor() {}

  ngOnInit() {}
}