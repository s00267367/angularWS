import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { AuthCustomService } from './core/auth/auth-custom.service';
import { MatButton } from '@angular/material/button';
@Component({
  imports: [RouterOutlet, RouterLink, MatButton],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angularWS');
  protected auth = inject(AuthCustomService);
}
