import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'subCategoryFilter',
  pure: false
})
export class subCategoryFilter implements PipeTransform {
  transform(items: any[], filter: any[]): any {
    if (!items || !filter) {
      return items;
    }

    if (filter.length === 0) {
      return items;
    }

    let filtered = items.filter((v, i) => {
      let found = v.subSolutions.some(r => filter.includes(r));
      return found;
    });

    return filtered;
  }
}
