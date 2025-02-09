import {Component, input, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'visibility-toggle',
  imports: [
    FormsModule
  ],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  standalone: true,
})
export class ToggleComponent implements OnInit {
  public isVisible: boolean = true;
  public initialState = input.required<boolean>();

  public constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.isVisible = this.initialState();
  }

  public async onVisibilityChange(isVisible: boolean): Promise<void> {
    const token = localStorage.getItem('authToken');

    if (token) {
      await this.userService.updateVisibility(isVisible, token);
      this.isVisible = isVisible;
    }
  }
}
