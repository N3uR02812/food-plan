import { Component, Inject } from '@angular/core';
import { ContainerService } from './services/containerService';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Verwaltung';
  json = {};

  constructor(public containerService: ContainerService,
    @Inject(DOCUMENT) public document: Document) {

  }

  ngOnInit() {
    this.containerService.getList().subscribe(data => this.json = data);
  }
}
