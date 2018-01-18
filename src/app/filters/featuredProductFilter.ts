import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'featuredProductFilterPipe',
  pure: false
})
export class FeaturedProductFilterPipe implements PipeTransform {
  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
      return items;
    }
    let test = items.filter(item => item.isItFeaturedProduct);
    return test;
  }
}
