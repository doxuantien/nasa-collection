import { Component, OnInit } from '@angular/core';
import { VideoPlayerService } from '@core/services/video-player.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.pug',
  styleUrls: ['./video-player.component.sass']
})
export class VideoPlayerComponent implements OnInit {
  public video$: Observable<{ title: string; source: string }>;
  public isOpen$: Observable<boolean>;

  public constructor(private videoPlayerService: VideoPlayerService) {}

  public ngOnInit(): void {
    this.video$ = this.videoPlayerService.video.pipe(filter(Boolean));

    this.isOpen$ = this.videoPlayerService.isOpen;
  }

  public onCloseVideo(): void {
    this.videoPlayerService.closeVideo();
  }
}
