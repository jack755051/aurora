import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastWithId } from './models/interface/toast.type';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastWithId[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  constructor() {}

  public addToast(toast: Toast): void {
    //build id by uuidv4
    const toastWithId: ToastWithId = { ...toast, id: uuidv4() };
    const currentToasts = this.toastsSubject.value;

    this.toastsSubject.next([...currentToasts, toastWithId]);

    if (toast.duration) {
      setTimeout(() => this.removeToast(toastWithId.id), toast.duration);
    }
  }

  public removeToast(id: string): void {
    const currentToasts = this.toastsSubject.value.filter((toast) => toast.id !== id);
    this.toastsSubject.next(currentToasts);
  }
}
