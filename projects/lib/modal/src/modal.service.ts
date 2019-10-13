import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalModule } from './modal.module';
import { ModalConfig } from './models/modal-config';
import { ModalRef } from './models/modal-ref';
import { ModalInjector } from './models/modal.injector';

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
    const instance = this._modalComponentRef.instance;

    instance.childComponentType = component;
    instance.title = config.title;
    instance.data = config.data;

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
