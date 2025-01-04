import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent, ToastService, Toast, toastType } from 'toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'probatio';
  toasts: Toast[] = [];

  readonly toastType = toastType;
  constructor(private _toastService: ToastService) {}

  ngOnInit(): void {
    this.toasts = this.buildToast();

    this.toasts.map((toast) => {
      this._toastService.addToast(toast);
    });
  }

  buildToast(): Toast[] {
    return [
      {
        message: '操作成功，資料已儲存！',
        type: toastType.SUCCESS,
        duration: 3000,
      },
      {
        message: '密碼修改成功，請重新登入。',
        type: toastType.SUCCESS,
        duration: 15000,
      },
      {
        message: '操作失敗，請稍後再試。',
        type: toastType.FAILURE,
        duration: 0,
      },
      {
        message: '無法連接伺服器，請檢查網路。',
        type: toastType.FAILURE,
        duration: 0,
      },
      {
        message: '即將超時，請儘速完成操作。',
        type: toastType.WARNING,
        duration: 0,
      },
      {
        message: '檔案過大，可能會影響上傳速度。',
        type: toastType.WARNING,
        duration: 0,
      },
    ];
  }
}
