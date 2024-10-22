import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SubtitleConverterComponent } from './components/subtitle-converter/subtitle-converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SubtitleConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'utf-converter-front';
}
