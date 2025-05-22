import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(value: unknown, unit: 'KB' | 'MB' | 'GB' = 'MB', decimals: number = 2): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return `0 ${unit}`;
  }

  const units = {
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3
  };

  const result = value / units[unit];
  return `${result.toFixed(decimals)} ${unit}`;
}

}
