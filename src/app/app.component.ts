import { Component, Inject, OnInit } from '@angular/core';
import { ContainerService } from './services/containerService';
import { DOCUMENT } from '@angular/common';
import { AppService } from './services/appService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Verwaltung';
  json = {};

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public appService: AppService) {

  }

  public ngOnInit() {
    this.appService.reloadCategories().subscribe();
  }
}
