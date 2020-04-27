import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ButtonInfo } from 'src/app/helper/buttonInfo';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() headTemplate: TemplateRef<any> = null;
  @Input() contentTemplate: TemplateRef<any> = null;
  @Input() actionsTemplate: TemplateRef<any> = null;
  @Input() item: any = null;

  constructor() { }

  ngOnInit(): void {
  }

  runAction(buttonInfo: ButtonInfo) {
    buttonInfo.action(this.item);
  }

}
