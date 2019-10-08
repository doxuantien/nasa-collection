import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet> <app-video-player></app-video-player>
  `
})
export class AppComponent {}
