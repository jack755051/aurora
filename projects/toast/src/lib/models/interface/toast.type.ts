import { toastType } from '../enums/type.enum';

// Toast 創建時的輸入類型
export type Toast = {
  message: string;
  type: toastType;
  duration?: number;
  icon?: string;
};

// 完整的 Toast 類型，包括自動生成的 ID
export type ToastWithId = Toast & {
  id: string;
};
