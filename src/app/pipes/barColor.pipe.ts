
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'barColor'
})
export class BarColorPipe implements PipeTransform {

  constructor() { }

  public transform(percentage: number): string {
      if (percentage >= 0.5) {
        return 'success';
      }
      if (percentage < 0.5 && percentage >= 0.25) {
        return 'warning';
      }
      if (percentage < 0.25) {
        return 'danger';
      }
      return 'primary';
  }
}
