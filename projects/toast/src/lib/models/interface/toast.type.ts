import { toastType } from '../enums/type.enum';

export type toast = {
  message: string;
  type: toastType;
  duration?: number;
  icon?: string;
};
