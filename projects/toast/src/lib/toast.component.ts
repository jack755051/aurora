import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ItemComponent } from './components/item/item.component';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './components/background/background.component';
import { toastType } from './models/enums/type.enum';
import { Toast } from './models/interface/toast.type';
import { ToastService } from './toast.service';

@Component({
  selector: 'lib-toast',
  standalone: true,
  imports: [ItemComponent, BackgroundComponent, CommonModule],
  template: ` <aurora-toast-background>
    <ng-container *ngFor="let toast of toasts">
      <aurora-toast-item
        [id]="toast.id"
        [message]="toast.message"
        [type]="toast.type"
        [duration]="toast.duration"
        (close)="removeToast($event)"
      ></aurora-toast-item>
    </ng-container>
  </aurora-toast-background>`,
  styles: ``,
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  removeToast(id: string): void {
    this.toastService.removeToast(id);
  }

  ngOnDestroy(): void {}
}
