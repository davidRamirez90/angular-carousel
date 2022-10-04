import {AfterViewInit, Directive, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({selector: '[slideVisible]'})
export class VisibleDirective  implements AfterViewInit {
  constructor(
      private _vcRef: ViewContainerRef,
      private _templateRef: TemplateRef<any>
  ) {}

  /**
   * Extending the afterviewinit lifecycle interrupts the normal lifecycle of the component
   * and allows us to access the view of the component before it is rendered.
   * So we have to manually call the createEmbeddedView method to render the view.
   *
   * ng-container renders as a comment in the template, and the element we want to target is
   * it's previous sibling.
   * Ej:
   * <target-element></target-element>  <-- this is the element we want to target
   *  <!-- container -->                <-- this._vcRef refers to this comment in the template
   *  <next-element></next-element>
   */
    ngAfterViewInit() {
      this._vcRef.createEmbeddedView(this._templateRef);

      const elementToObserve = this._vcRef.element.nativeElement.previousElementSibling;
      const parentScroller = this._vcRef.element.nativeElement.parentElement;

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            entry.target.classList.toggle('--in-view', entry.isIntersecting);
          });
      }, {
        root: parentScroller,
        threshold: 0.6,
      });
      observer.observe(elementToObserve);
    }
}
