import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFormat',
})
export class ArrayFormatPipe extends TitleCasePipe implements PipeTransform {
  constructor() {
    super();
  }

  transform(value: any, format: ' , ' | ' | ' = ' , '): any {
    if (Array.isArray(value)) {
      const array = value.map((v) => super.transform(v));
      return array.join(format);
    }
    return null;
  }
}
