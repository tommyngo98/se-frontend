import {Component, EventEmitter, Input, input, OnChanges, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";

@Component({
    selector: 'input-form',
    templateUrl: './input-form.component.html',
    imports: [ReactiveFormsModule, CommonModule],
    styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnChanges {
  public form: FormGroup;
  public actionType = input.required<'Anmelden' | 'Registrieren'>();
  public errorMessage = input.required<string>();

  @Input() successMessage: string = '';

  @Output()
  public formSubmit = new EventEmitter<{ name: string, email: string; password: string }>();

  public constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  public ngOnChanges(): void {
    this.updateValidation();
  }

  get email() {
    return this.form.get('email');
  }

  get name() {
    return this.form.get('name');
  }

  get password() {
    return this.form.get('password');
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      this.form.reset();
    }
  }

  private updateValidation(): void {
    const nameControl = this.form.get('name');
    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('password');

    if (this.actionType() === 'Anmelden') {
      nameControl?.clearValidators();
      emailControl?.setValidators([Validators.required]);
      passwordControl?.setValidators([Validators.required])
    } else if (this.actionType() === 'Registrieren') {
      nameControl?.setValidators([Validators.required]);
      emailControl?.setValidators([Validators.email, Validators.required]);
      passwordControl?.setValidators([Validators.required, Validators.minLength(6)])
    }

    nameControl?.updateValueAndValidity(); // Recalculate the validity
  }
}
