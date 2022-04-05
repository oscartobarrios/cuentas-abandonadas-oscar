import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replaceLeftZeros' })
export class ReplaceLeftZerosPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/^0+/, '');
  }
}