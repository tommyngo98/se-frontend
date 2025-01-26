import { Component, input } from '@angular/core';

@Component({
    selector: 'cta-button',
    standalone: true,
    imports: [],
    templateUrl: './cta-button.component.html',
    styleUrl: './cta-button.component.scss'
})
export class CtaButtonComponent {
  public text = input.required<string>();
  public disabled = input<boolean>();
  public type = input< 'button' | 'submit'>('button');
}
