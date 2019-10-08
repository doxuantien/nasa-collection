import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import { ModalConfig } from './modal-config';
import { ModalRef } from './modal-ref';
import { ModalComponent } from './modal.component';
import { ModalInjector } from './modal.injector';
import { ModalModule } from './modal.module';

@Injectable({ providedIn: ModalModule })
export class ModalService {
  private _modalComponentRef: ComponentRef<ModalComponent>;

  public constructor(
    private factoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public open(component: Type<unknown>, config: ModalConfig): ModalRef {
    window.scrollTo(0, 0);

    const modalRef = this.appendModal(config);

    this._modalComponentRef.instance.childComponentType = component;
    this._modalComponentRef.instance.title = config.title;
    this._modalComponentRef.instance.data = config.data;

    return modalRef;
  }

  private appendModal(config: ModalConfig): ModalRef {
    const modalRef = new ModalRef();
    const dependencies = setupAdditionalDependencies(config, modalRef);
    this._modalComponentRef = this.createComponentRef(dependencies);

    this.render(this._modalComponentRef);
    this.setupOnCloseHandler(this._modalComponentRef.instance, modalRef);

    return modalRef;
  }

  private createComponentRef(additionalDependencies: WeakMap<any, any>): ComponentRef<ModalComponent> {
    const componentFactory = this.factoryResolver.resolveComponentFactory(ModalComponent);

    return componentFactory.create(new ModalInjector(this.injector, additionalDependencies));
  }

  private render(componentRef: ComponentRef<ModalComponent>): void {
    const hostView = componentRef.hostView;
    const htmlElement = (hostView as EmbeddedViewRef<ModalComponent>).rootNodes[0] as HTMLElement;

    this.appRef.attachView(hostView);
    document.body.appendChild(htmlElement);
  }

  private setupOnCloseHandler(instance: ModalComponent, modalRef: ModalRef): void {
    // Close from inner dialog
    instance.onClose$.subscribe(this.detachModal.bind(this));

    // Close from outside
    const subscription = modalRef.close$.subscribe(() => {
      this.detachModal();
      subscription.unsubscribe();
    });
  }

  private detachModal(): void {
    this.appRef.detachView(this._modalComponentRef.hostView);
    this._modalComponentRef.destroy();
  }
}

const setupAdditionalDependencies = (config: ModalConfig, modalRef: ModalRef): WeakMap<any, any> => {
  const map = new WeakMap();

  map.set(ModalConfig, config);
  map.set(ModalRef, modalRef);

  return map;
};
