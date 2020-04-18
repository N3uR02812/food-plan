import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/appService';
import { ContainerService } from 'src/app/services/containerService';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public activeRoute: ActivatedRoute,
    public containerService: ContainerService,
    public appService: AppService) { }

  public show: boolean = false;
  public searchText: string = "";
  public label: string = "";

  ngOnInit(): void {
    this.activeRoute.queryParams.pipe(switchMap(params => {
      if (!params.container) {
        this.label = null;
        return of(null);
      }
      return this.containerService.get(params.container)
        .pipe(switchMap(container => {
          this.label = container.Name;
          return of(null);
        }));
    }))
      .subscribe();
  }

  search() {
    this.appService.searchPressedSubject.next(this.searchText);
  }

  add() {
    this.appService.addPressedSubject.next();
  }

}
