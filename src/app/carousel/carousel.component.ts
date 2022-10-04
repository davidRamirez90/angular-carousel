import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  QueryList,
  TemplateRef,
  ViewChild, ViewChildren,
} from '@angular/core';
import { Slide } from '../carousel.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  @Input() slides!: Slide[];
  @Input() carouselControls: 'none' | 'auto' = 'auto';
  @Input() pagination: 'gallery' | 'dots' | 'none' = 'dots';

  @ContentChild('snapItem') snapItem!: TemplateRef<any>;

  @ViewChild('scroller', { static: false, read: ElementRef })
  carouselScroller: ElementRef;

  @ViewChild('carousel', { static: false, read: ElementRef })
  rootElementRef: ElementRef;

  @ViewChildren('snap', {read: ElementRef}) snapItems: QueryList<ElementRef>;

  private _observer: IntersectionObserver | undefined;
  // private _mutationObserver: MutationObserver | undefined;
  // private _hasIntersected: Set<IntersectionObserverEntry> = new Set();

  constructor() {}

  ngAfterViewInit() {
    // this.createObservers();
    // this.listenToChanges();
  }
  //
  // createObservers(): void {
  //
  //   // SETUP INTERSECTION OBSERVER TO KNOW WHEN A SPECIFIC SLIDE IS VISIBLE
  //   this._observer = new IntersectionObserver(
  //       (observations, observer) => {
  //         console.log(observations);
  //         console.log(observer);
  //         for (let observation of observations) {
  //           console.log(observation);
  //           this._hasIntersected.add(observation);
  //
  //           observation.target.classList.toggle(
  //               '--in-view',
  //               observation.isIntersecting
  //           );
  //         }
  //       },
  //       {
  //         root: this.carouselScroller.nativeElement,
  //         threshold: 0.6,
  //       }
  //   );
  //
  //   // SETUP MUTATION OBSERVER TO KNOW WHEN A SLIDE IS ADDED OR REMOVED
  //   this._mutationObserver = new MutationObserver((mutations, observer) => {
  //     mutations
  //         .filter((x) => x.removedNodes.length > 0)
  //         .forEach(mutation => {
  //           Array.from(mutation.removedNodes)
  //               // .filter(node => node.querySelector('.carousel') === this.rootElementRef)
  //               .forEach(removedNode => {
  //                 this.unlisten()
  //               })
  //         })
  //   })
  //
  // }

  listenToChanges(): void {
    this.snapItems.forEach((slide) => {
        this._observer.observe(slide.nativeElement);
    })
  }

  unlisten(): void {
    this._observer.disconnect();
  }
}
