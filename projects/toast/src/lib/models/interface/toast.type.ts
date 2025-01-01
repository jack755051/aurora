import { toastType } from '../enums/type.enum';

export type Toast = {
  id: string;
  message: string;
  type: toastType;
  duration?: number;
  icon?: string;
};
