export interface ReusltItem {
  keyName: string;
  value: string | boolean | null;
  dataType: DataType;
  level: number;
  hideCount: number; //折叠次数，最小值是0
  showComma?: boolean;
  arrayLength?: number;
}
export interface Result {
  success: boolean;
  error?: Error;
  data?: ReusltItem[];
}

export interface ResultError {
  at: number;
  message: string;
  text: string;
  name: string;
}
