import { Observable, ReplaySubject } from 'rxjs';
import { VideoPlayerModel } from '../models/video-player.model';

export class VideoPlayerService {
  private readonly video$ = new ReplaySubject<VideoPlayerModel>(1);
  private readonly isOpen$ = new ReplaySubject<boolean>(1);

  get video(): Observable<VideoPlayerModel> {
    return this.video$.asObservable();
  }

  get isOpen(): Observable<boolean> {
    return this.isOpen$.asObservable();
  }

  public openVideo(newVideo: VideoPlayerModel): void {
    this.isOpen$.next(true);
    this.video$.next(newVideo);
  }

  public closeVideo(): void {
    this.isOpen$.next(false);
  }
}
