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
  @Input() startIndex: number = 0;

  @ContentChild('snapItem') snapItem!: TemplateRef<any>;

  @ViewChild('scroller', { static: false, read: ElementRef })
  carouselScroller: ElementRef<HTMLDivElement>;

  @ViewChild('carousel', { static: false, read: ElementRef })
  rootElementRef: ElementRef;

  @ViewChildren('snap', {read: ElementRef}) snapItems: QueryList<ElementRef<HTMLDivElement>>;

  currentSlide: HTMLDivElement;

  // private _observer: IntersectionObserver | undefined;
  // private _mutationObserver: MutationObserver | undefined;
  // private _hasIntersected: Set<IntersectionObserverEntry> = new Set();

  constructor() {}

  ngAfterViewInit() {
    // this.createObservers();
    // this.listenToChanges();
    this.initialize();
  }

  initialize() {
    const startIndex = this.startIndex;
    this.currentSlide = this.snapItems.get(startIndex).nativeElement;
  }

  goNext() {
    const nextSlide = this.currentSlide.nextElementSibling as HTMLDivElement;
    if (this.currentSlide === nextSlide) return
    if (nextSlide) {
      this.goToSlide({
        scrollPort: this.carouselScroller.nativeElement,
        element: nextSlide
      })
      this.currentSlide = nextSlide;
    }
  }

  goToSlide({scrollPort, element}: {scrollPort: HTMLDivElement, element: HTMLDivElement}) {
    const delta = Math.abs(scrollPort.offsetLeft - element.offsetLeft);
    const scrollerPadding = parseInt(getComputedStyle(scrollPort).paddingLeft, 10);

    const pos = scrollPort.clientWidth / 2 > delta
      ? delta - scrollerPadding
      : delta + scrollerPadding;

    scrollPort.scrollTo({
      left: pos,
      behavior: 'smooth'
    });
  }


  goPrevious() {
    const prevSlide = this.currentSlide.previousElementSibling as HTMLDivElement;
    if (this.currentSlide === prevSlide) return
    if (prevSlide) {
      this.goToSlide({
        scrollPort: this.carouselScroller.nativeElement,
        element: prevSlide
      })
      this.currentSlide = prevSlide;
    }
  }

  handlePaginate(index: number) {

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
  //
  // listenToChanges(): void {
  //   this.snapItems.forEach((slide) => {
  //       this._observer.observe(slide.nativeElement);
  //   })
  // }
  //
  // unlisten(): void {
  //   this._observer.disconnect();
  // }
}
