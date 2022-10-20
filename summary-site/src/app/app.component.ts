import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'summary-site';
  logoBlack = '../assets/Jester_Logo_plain_black.png';
  logoWhite = '../assets/SiteSeeker.png';

  @ViewChild('imageFirst', {static: true})
  imageFirst!: ElementRef<HTMLDivElement>;

  @ViewChild('container', {static: true})
  container!: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {

    // Animation for initial loading of Jester Logo
    this.initialAnimations();
    this.jesterGlitch();
    this.contactGlitch();
    this.sectionScrollSnap();

  }

  initialAnimations(): void {
    gsap.from(this.imageFirst.nativeElement, {
      duration: 0.7,
      opacity: 0,
      y: -20,
      delay: 0.5,
    });
  }

  jesterGlitch(): void {
    const animationLogo = document.querySelector('.animation-logo h1');
    animationLogo?.classList.add('active');
    setInterval(() => {
      animationLogo?.classList.remove('active');
      setTimeout(() => {
        animationLogo?.classList.add('active');
      }, 100);
    }, 5000);
  }

  contactGlitch(): void {
    const animationLogo = document.querySelector('.contact');
    animationLogo?.classList.add('active');
    setInterval(() => {
      animationLogo?.classList.remove('active');
      setTimeout(() => {
        animationLogo?.classList.add('active');
      }, 100);
    }, 5000);
  }

  sectionScrollSnap():  void {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      const intoAnim = gsap.timeline({paused: true})
        .from(section.querySelector(".page"), {yPercent: 50, duration: 1})

      ScrollTrigger.create({
        trigger: section,
        onEnter: () => this.goToSection(section, intoAnim),
      });

      ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        onEnterBack: () => this.goToSection(section),
      });
    });
  }

  goToSection(section: HTMLElement, anim?: gsap.core.Timeline | undefined): void {
    gsap.to(window, {
      scrollTo: {y: section, autoKill: false},
      duration: 1
    });

    if(anim) {
      anim.restart();
    }
  }
}
