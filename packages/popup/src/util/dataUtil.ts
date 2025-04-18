/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/

/**
 * @description 判断数据类型是否为Object
 * @param data
 * @returns true|false
 */
export function isObject(data: any): boolean {
  return Object.prototype.toString.call(data) === '[Object Object]';
}

/**
 * @description 精准获取数据类型
 * @param data
 * @returns number｜string|reg|object|array
 */
export function getDataType(data: any): DataType | '' {
  const typeStr: string = Object.prototype.toString.call(data);
  const reg = /\[object\s(\S*)\]/;
  const matchArr = typeStr.match(reg);
  if (!matchArr) {
    return '';
  }
  return matchArr[1].toLowerCase() as DataType;
}

/**
 * @description 获取uuid
 * @param len
 * @param radix
 * @returns uuid:string
 */
export function createUUID(len: number, radix: number): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  radix = radix || chars.length;
  if (len) {
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

/**
 * @description 获取描述性文件尺寸大小
 * @param size
 * @returns
 */
export function getSize(size: number): string {
  return size > 1024 * 1024 * 1024 ? `${(size / (1024 * 1024 * 1024)).toFixed(2)}G` : size > 1024 * 1024 ? `${(size / (1024 * 1024)).toFixed(2)}M` : `${(size / 1024).toFixed(2)}KB`;
}
