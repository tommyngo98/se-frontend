import { Component, EventEmitter, input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'input-form',
  templateUrl: './input-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnChanges {
  public form: FormGroup;
  public actionType = input.required<'Anmelden' | 'Registrieren'>();

  @Output()
  public formSubmit = new EventEmitter<{ name: string, email: string; password: string }>();

  public constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnChanges(): void {
    this.updateNameValidation();
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
    }
  }

  private updateNameValidation(): void {
    const nameControl = this.form.get('name');

    if (this.actionType() === 'Anmelden') {
      nameControl?.clearValidators();
    } else if (this.actionType() === 'Registrieren') {
      nameControl?.setValidators([Validators.required]);
    }

    nameControl?.updateValueAndValidity(); // Recalculate the validity
  }
}
