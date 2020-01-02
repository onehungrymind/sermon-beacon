import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  constructor(private breakpointObserver: BreakpointObserver) { }

  isMobile() {
    return this.breakpointObserver.isMatched(Breakpoints.XSmall);
  }

  isTablet() {
    return this.breakpointObserver.isMatched(Breakpoints.Small);
  }

  observeForMobile() {
    return this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]);
  }
}

//---------------------------------------
// Breakpoint ranges
//---------------------------------------
// XSmall = 0px to 599.99px; // Mobile
// Small = 600px to 959.99px; // Tablet
// Medium = 960px to 1279.99px; // Web - Tablet up to 1439px (portrait)
// Large = 1280px to 1919.99px; // Web
// XLarge = 1920px; // Web
