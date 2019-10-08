import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
  private readonly dateOptions = { month: 'long', day: 'numeric' };

  public transform(value: string): string {
    const date = new Date(value);

    return `${date.toLocaleString('en-DE', this.dateOptions)}, ${date.getFullYear()}`;
  }
}
