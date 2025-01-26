import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'dateTranslate'
})
export class DateTranslatePipe implements PipeTransform {
  private translations: Record<string, string> = {
    "January": "Januar",
    "February": "Februar",
    "March": "März",
    "April": "April",
    "May": "Mai",
    "June": "Juni",
    "July": "Juli",
    "August": "August",
    "September": "September",
    "October": "Oktober",
    "November": "November",
    "December": "Dezember"
  };

  public transform(value: string): string {
    if (!value) return '';

    const date = new Date(value);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const translatedMonth = this.translations[Object.keys(this.translations)[monthIndex]];

    return `${day}. ${translatedMonth} ${year}`;
  }
}
