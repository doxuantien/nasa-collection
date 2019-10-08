import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Inject, Injectable, Injector, Type } from '@angular/core';
import { ModalConfig } from './modal-config';
import { ModalRef } from './modal-ref';
import { ModalComponent } from './modal.component';
import { ModalInjector } from './modal.injector';
import { ModalModule } from './modal.module';

@Injectable({ providedIn: ModalModule })
export class ModalService {
  public innerModalRef: ComponentRef<ModalComponent>;

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private factoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public open(component: Type<any>, config: ModalConfig): ModalRef {
    window.scrollTo(0, 0);

    const dialogRef = this.appendModal(config);

    this.innerModalRef.instance.childComponentType = component;
    this.innerModalRef.instance.title = config.title;
    this.innerModalRef.instance.data = config.data;

    return dialogRef;
  }

  private appendModal(config: ModalConfig): ModalRef {
    // Setup injectable dependencies
    const map = new WeakMap();
    map.set(ModalConfig, config);
    const dialogRef = new ModalRef();
    map.set(ModalRef, dialogRef);

    // Render dialog
    const componentFactory = this.factoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = componentFactory.create(new ModalInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(domElem);

    this.innerModalRef = componentRef;

    // Close from inner dialog
    this.innerModalRef.instance.onClose.subscribe(() => this.removeModal());

    // Close from outside
    const subscription = dialogRef.close$.subscribe(() => {
      this.removeModal();
      subscription.unsubscribe();
    });

    return dialogRef;
  }

  private removeModal(): void {
    this.appRef.detachView(this.innerModalRef.hostView);
    this.innerModalRef.destroy();
  }
}
