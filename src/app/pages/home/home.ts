import { Component, signal } from '@angular/core';
import { Greeting } from '../../components/greeting/greeting';

@Component({
  selector: 'app-home',
  imports: [Greeting],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  homeMessage = signal('Hello, world!')

  keyUpHandler(event : KeyboardEvent) {
    console.log(`User pressed the ${event.key} key!`)
  }
}
