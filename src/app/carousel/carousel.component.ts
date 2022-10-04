import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
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
  @Input() pagination: 'gallery' | 'dots' | 'none' = 'dots';

  @ContentChild('snapItem') snapItem!: TemplateRef<any>;

  @ViewChild('scroller', { static: false, read: ElementRef })
  carouselScroller: ElementRef;

  private _observer: IntersectionObserver | undefined;
  private _hasIntersected: Set<IntersectionObserverEntry> = new Set();

  constructor() {}

  ngOnInit() {
    /**
    console.log(this.carouselScroller);
    this._observer = new IntersectionObserver(
      (observations) => {
        for (let observation of observations) {
          console.log(observation);
          this._hasIntersected.add(observation);

          observation.target.classList.toggle(
            '--in-view',
            observation.isIntersecting
          );
        }
      },
      {
        root: this.carouselScroller.nativeElement,
        threshold: 0.6,
      }
    );
     */
  }
}
