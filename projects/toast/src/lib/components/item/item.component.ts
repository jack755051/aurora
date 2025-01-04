import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toastType } from '../../models/enums/type.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aurora-toast-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  host: {
    '[class]': 'setType', // 动态绑定宿主元素的类
  },
})
export class ItemComponent implements OnInit {
  /** Toast ID */
  @Input() id: string = '';
  /** Notification message */
  @Input() message: string = '';
  /** Notification type */
  @Input() type: toastType = toastType.SUCCESS;
  /** Notification duration in milliseconds */
  @Input() duration?: number = 3000;
  /** Close event emitter */
  @Output() close: EventEmitter<string> = new EventEmitter<string>();

  readonly toastType = toastType;
  private autoCloseTimeout: any;
  constructor() {}

  ngOnInit(): void {
    this.startAutoClose();
  }

  get setType(): string {
    switch (this.type) {
      case toastType.SUCCESS:
        return 'type-success';
      case toastType.FAILURE:
        return 'type-failure';
      case toastType.WARNING:
        return 'type-warning';
      default:
        return 'success';
    }
  }

  //TODO: 透過設定的時間來自動關閉通知
  //TODO:手動關閉通知output

  /** Starts the auto-close timer */
  private startAutoClose(): void {
    // If duration is set and greater than 0, start the timer
    if (this.duration && this.duration > 0) {
      this.autoCloseTimeout = setTimeout(() => {
        this.closeNotification();
      }, this.duration);
    }
  }

  /** Manually close the notification */
  closeNotification(): void {
    this.close.emit(this.id);
    this.clearAutoClose();
  }

  /** Clears the auto-close timer */
  private clearAutoClose(): void {
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
    }
  }
}
