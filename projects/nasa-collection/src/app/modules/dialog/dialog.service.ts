import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import { DialogRef } from '@modules/dialog/dialog-ref';
import { DialogInjector } from '@modules/dialog/dialog.injector';
import { DialogConfig } from './dialog-config';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService {
  public innerDialogRef: ComponentRef<DialogComponent>;

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private factoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public open(component: Type<any>, config: DialogConfig): DialogRef {
    window.scrollTo(0, 0);

    const dialogRef = this.appendDialog(config);

    this.innerDialogRef.instance.childComponentType = component;
    this.innerDialogRef.instance.title = config.title;
    this.innerDialogRef.instance.data = config.data;

    return dialogRef;
  }

  private appendDialog(config: DialogConfig): DialogRef {
    // Setup injectable dependencies
    const map = new WeakMap();
    map.set(DialogConfig, config);
    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    // Render dialog
    const componentFactory = this.factoryResolver.resolveComponentFactory(DialogComponent);
    const componentRef = componentFactory.create(new DialogInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(domElem);

    this.innerDialogRef = componentRef;

    // Close from inner dialog
    this.innerDialogRef.instance.onClose.subscribe(() => this.removeDialog());

    // Close from outside
    const subscription = dialogRef.close$.subscribe(() => {
      this.removeDialog();
      subscription.unsubscribe();
    });

    return dialogRef;
  }

  private removeDialog(): void {
    this.appRef.detachView(this.innerDialogRef.hostView);
    this.innerDialogRef.destroy();
  }
}
