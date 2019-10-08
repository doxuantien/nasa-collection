import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.pug',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent implements OnDestroy, AfterViewInit {
  private readonly onClose$ = new Subject<boolean>();
  public childComponentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public data: { [key: string]: any };
  public title: string;

  @ViewChild('body', { read: ViewContainerRef })
  private bodyContainer: ViewContainerRef;

  get onClose(): Observable<boolean> {
    return this.onClose$.asObservable();
  }

  public constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private detectorRef: ChangeDetectorRef
  ) {}

  public ngAfterViewInit(): void {
    this.loadComponent(this.childComponentType);
    this.detectorRef.detectChanges();
  }

  public ngOnDestroy(): void {
    if (this.childComponentRef) {
      this.childComponentRef.destroy();
      this.bodyContainer.clear();
    }
  }

  public onCloseDialog(): void {
    this.onClose$.next(true);
  }

  private loadComponent(component: Type<any>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.bodyContainer.clear();

    this.childComponentRef = this.bodyContainer.createComponent(componentFactory);
    const instance = this.childComponentRef.instance;

    if (this.data) {
      Object.keys(this.data).forEach(key => (instance[key] = this.data[key]));
    }
  }
}
