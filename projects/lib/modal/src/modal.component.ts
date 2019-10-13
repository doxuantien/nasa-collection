import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'lib-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnDestroy, OnInit {
  private readonly _onClose$ = new Subject<unknown>();
  public childComponentRef: ComponentRef<Component>;
  public childComponentType: Type<unknown>;
  public data: { [key: string]: unknown };
  public title: string;

  @ViewChild('body', { static: true, read: ViewContainerRef })
  private bodyContainer: ViewContainerRef;

  get onClose$(): Observable<unknown> {
    return this._onClose$.asObservable();
  }

  public constructor(private factoryResolver: ComponentFactoryResolver, private detectorRef: ChangeDetectorRef) {}

  public ngOnDestroy(): void {
    if (this.childComponentRef) {
      this.childComponentRef.destroy();
      this.bodyContainer.clear();
    }
  }

  public ngOnInit(): void {
    this.loadComponent(this.childComponentType);
    this.detectorRef.detectChanges();
  }

  private loadComponent(component: Type<Component>): void {
    this.bodyContainer.clear();

    const componentFactory = this.factoryResolver.resolveComponentFactory(component);
    this.childComponentRef = this.bodyContainer.createComponent(componentFactory);

    if (this.data) {
      this.attachData(this.childComponentRef.instance);
    }
  }

  private attachData(instance: Component): void {
    Object.keys(this.data).forEach(key => (instance[key] = this.data[key]));
  }

  public onCloseModal(): void {
    this._onClose$.next();
  }
}
