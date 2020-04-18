import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ButtonInfo } from 'src/app/helper/buttonInfo';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() btnTemplate: TemplateRef<any>;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() item: any = null;

  constructor() { }

  ngOnInit(): void {
  }

  runAction(buttonInfo: ButtonInfo) {
    buttonInfo.action(this.item);
  }

}
