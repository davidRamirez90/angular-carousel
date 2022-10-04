import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Slide } from '../carousel.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() slides!: Slide[];
  @Input() carouselControls: 'none' | 'auto' = 'auto';
  @ContentChild('snapItem') snapItem!: TemplateRef<any>;

  projects = [
    {
      name: 'proj1',
      processes: [
        {
          name: 'proc1',
          date: new Date('05 October 2022 14:48 UTC'),
        },
        {
          name: 'proc2',
          date: new Date('06 October 2022 14:48 UTC'),
        },
      ],
    },
    {
      name: 'proj2',
      processes: [
        {
          name: 'zzz',
          date: new Date('20 October 2022 14:48 UTC'),
        },
        {
          name: 'aaa',
          date: new Date('01 October 2022 14:48 UTC'),
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
