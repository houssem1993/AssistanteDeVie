import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-one-assistant',
  templateUrl: './one-assistant.component.html',
  styleUrls: ['./one-assistant.component.css']
})
export class OneAssistantComponent implements OnInit {

  @Input() x:any;

  constructor() { }

  ngOnInit() {
  }

}
