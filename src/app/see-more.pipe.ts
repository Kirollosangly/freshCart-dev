import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seeMore'
})
export class SeeMorePipe implements PipeTransform {

  transform(descrip: string, limit: number): string {
    return descrip?.split(' ').slice(0, limit).join(' ');
  }

}
