import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from './models/interface/toast.type';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  constructor() {}

  public addToast(toast: Toast): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);
    if (toast.duration) {
      setTimeout(() => this.removeToast(toast.id), toast.duration);
    }
  }

  public removeToast(id: string): void {
    const currentToasts = this.toastsSubject.value.filter((toast) => toast.id !== id);
    this.toastsSubject.next(currentToasts);
  }
}
