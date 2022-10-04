import { Component } from '@angular/core';
import { Slide } from './carousel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'component-overview';

  slides: Slide[] = [
    {
      url: 'https://picsum.photos/seed/is/1280/720.webp',
      width: 1280,
      height: 720,
      alt: 'Frosty orange desert sunset',
      caption: 'Learn more about deserts',
    },
    {
      url: 'https://picsum.photos/seed/this/1280/720.webp',
      width: 1280,
      height: 720,
      alt: 'Frosty orange desert sunset',
      caption: 'Learn more about sunsets',
    },
    {
      url: 'https://picsum.photos/seed/a/1280/720.webp',
      width: 1280,
      height: 720,
      alt: 'African sahara with a giraffe',
      caption: 'Learn more about giraffes',
    }
  ];
}
