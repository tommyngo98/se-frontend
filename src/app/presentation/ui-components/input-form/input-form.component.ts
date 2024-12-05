import {Component, EventEmitter, input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'input-form',
  templateUrl: './input-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent {
  public form: FormGroup;
  public urlPath = input.required<string>();
  public actionType = input.required<'Anmelden' | 'Registrieren'>();

  @Output()
  public formSubmit = new EventEmitter<{ email: string; password: string }>();

  public constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}
