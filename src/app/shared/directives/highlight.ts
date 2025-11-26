import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]', 
  standalone: true
})
export class HighlightDirective {
  

  @Input() appHighlight = ''; 

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  
  @HostListener('mouseenter') onMouseEnter() {
    this.changeStyle('scale(1.05)', '0 10px 20px rgba(0,0,0,0.2)');
  }


  @HostListener('mouseleave') onMouseLeave() {
    this.changeStyle('scale(1)', '0 4px 10px rgba(0,0,0,0.1)');
  }

  private changeStyle(transform: string, shadow: string) {
    
    this.renderer.setStyle(this.el.nativeElement, 'transform', transform);
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', shadow);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
  }
}