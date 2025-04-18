import { getDataType } from '@/util/dataUtil';
import { ReusltItem, Result } from './interface';
/* eslint-disable @typescript-eslint/no-explicit-any */
export function parse(source: string, isSort: boolean): Result {
  try {
    let at: number; // The index of the current character
    let ch: string; // The current character
    const escapee = {
      '"': '"',
      '\\': '\\',
      '/': '/',
      'b': '\b',
      'f': '\f',
      'n': '\n',
      'r': '\r',
      't': '\t',
    };
    let text: string = source;
    const error = function (m: string) {
      // Call error when something is wrong.
      throw {
        name: 'SyntaxError',
        message: m,
        at: at,
        text: text,
      };
    };
    const next = function (c?: string): string {
      // If a c parameter is provided, verify that it matches the current character.

      if (c && c !== ch) {
        error("Expected '" + c + "' instead of '" + ch + "'");
      }

      // Get the next character. When there are no more characters,
      // return the empty string.

      ch = text.charAt(at);
      at += 1;
      return ch;
    };
    const number = function () {
      let stringValue = '';

      if (ch === '-') {
        stringValue = '-';
        next('-');
      }
      while (ch >= '0' && ch <= '9') {
        stringValue += ch;
        next();
      }
      if (ch === '.') {
        stringValue += '.';
        while (next() && ch >= '0' && ch <= '9') {
          stringValue += ch;
        }
      }
      if (ch === 'e' || ch === 'E') {
        stringValue += ch;
        ch = next();
        if (ch === '-' || ch === '+') {
          stringValue += ch;
          next();
        }
        while (ch >= '0' && ch <= '9') {
          stringValue += ch;
          next();
        }
      }

      return {
        json_parse_type: 'json_parse_number',
        value: stringValue,
      };
    };
    const string = function () {
      // Parse a string value.
      let hex,
        i,
        stringValue = '',
        uffff;
      // When parsing for string values, we must look for " and \ characters.
      if (ch === '"') {
        let startAt = at;
        while (next()) {
          if (ch === '"') {
            if (at - 1 > startAt) stringValue += text.substring(startAt, at - 1);
            next();
            return stringValue;
          }
          if (ch === '\\') {
            if (at - 1 > startAt) stringValue += text.substring(startAt, at - 1);
            next();
            if (ch === 'u') {
              uffff = 0;
              for (i = 0; i < 4; i += 1) {
                hex = parseInt(next(), 16);
                if (!isFinite(hex)) {
                  break;
                }
                uffff = uffff * 16 + hex;
              }
              stringValue += String.fromCharCode(uffff);
            } else if (typeof escapee[ch] === 'string') {
              stringValue += escapee[ch];
            } else {
              break;
            }
            startAt = at;
          }
        }
      }
      error('Bad string');
    };
    const white = function () {
      // Skip whitespace.

      while (ch && ch <= ' ') {
        next();
      }
    };
    const word = function () {
      // true, false, or null.

      switch (ch) {
        case 't':
          next('t');
          next('r');
          next('u');
          next('e');
          return true;
        case 'f':
          next('f');
          next('a');
          next('l');
          next('s');
          next('e');
          return false;
        case 'n':
          next('n');
          next('u');
          next('l');
          next('l');
          return null;
      }
      error("Unexpected '" + ch + "'");
    };
    let value = function () {
      // Place holder for the value function.
      return '';
    };
    const array = function () {
      const arrayValue: any[] = [];

      if (ch === '[') {
        ch = next('[');
        white();
        if (ch === ']') {
          next(']');
          return arrayValue; // empty array
        }
        while (ch) {
          arrayValue.push(value());
          white();
          if (ch === ']') {
            next(']');
            return arrayValue;
          }
          next(',');
          white();
        }
      }
      error('Bad array');
    };
    const object = function () {
      // Parse an object value.
      let key: string;
      const objectValue: any = Object.create(null);
      if (ch === '{') {
        ch = next('{');
        white();
        if (ch === '}') {
          next('}');
          return objectValue; // empty object
        }
        while (ch) {
          key = string() || '';
          white();
          next(':');
          objectValue[key + '_JSON_Parse_Web_Tool_TEST_!!!_@@@'] = value();
          white();
          if (ch === '}') {
            next('}');
            return objectValue;
          }
          next(',');
          white();
        }
      }
      error('Bad object');
    };

    value = function () {
      // Parse a JSON value. It could be an object, an array, a string, a number,
      // or a word.

      white();
      switch (ch) {
        case '{':
          return object();
        case '[':
          return array();
        case '"':
          return string();
        case '-':
          return number();
        default:
          return ch >= '0' && ch <= '9' ? number() : word();
      }
    };

    text = source + '';
    at = 0;
    ch = ' ';
    const resultValue = value();
    white();
    if (ch) {
      error('Syntax error');
    }
    return {
      success: true,
      data: formatResult(resultValue, isSort),
    };
  } catch (err: any) {
    return {
      success: false,
      error: err,
    };
  }
}
let level = 0;

function formatResult(resultValue: any, isSort: boolean, keyName?: string, showComma?: boolean): ReusltItem[] {
  const dataType = getDataType(resultValue);
  if (dataType !== 'object' && dataType !== 'array') {
    return [
      {
        keyName: keyName || '',
        value: resultValue,
        dataType: dataType,
        level,
        hideCount: 0,
        showComma: !!showComma,
      },
    ];
  }
  if (dataType === 'object' && resultValue.json_parse_type === 'json_parse_number') {
    return [
      {
        keyName: keyName || '',
        value: resultValue.value,
        dataType: 'number',
        level,
        hideCount: 0,
        showComma: !!showComma,
      },
    ];
  }
  const resultArray: ReusltItem[] = [];
  if (dataType === 'object') {
    resultArray.push({
      keyName: keyName || '',
      value: '{',
      dataType: 'leftBracket',
      level: level,
      showComma: false,
      hideCount: 0,
    });
    level++;
    let keys = Object.keys(resultValue);
    for (let i = 0; i < keys.length; i++) {
      const value = resultValue[keys[i]];
      delete resultValue[keys[i]];
      keys[i] = keys[i].replace('_JSON_Parse_Web_Tool_TEST_!!!_@@@', '');
      resultValue[keys[i]] = value;
    }
    if (isSort) {
      keys = keys.sort((a, b) => {
        if (a > b) {
          return 1;
        }
        return -1;
      });
    }
    for (let i = 0; i < keys.length; i++) {
      resultArray.push(...formatResult(resultValue[keys[i]], isSort, keys[i], i !== keys.length - 1));
    }
    level--;
    resultArray.push({
      keyName: '',
      value: '}',
      dataType: 'rightBracket',
      level: level,
      showComma: !!showComma,
      hideCount: 0,
    });
  } else {
    resultArray.push({
      keyName: keyName || '',
      value: '[',
      dataType: 'leftBracket',
      level: level,
      showComma: false,
      hideCount: 0,
      arrayLength: resultValue.length,
    });
    level++;
    for (let i = 0; i < resultValue.length; i++) {
      resultArray.push(...formatResult(resultValue[i], isSort, '', i < resultValue.length - 1));
    }
    level--;
    resultArray.push({
      keyName: '',
      value: ']',
      dataType: 'rightBracket',
      level: level,
      hideCount: 0,
      showComma: !!showComma,
    });
  }
  return resultArray;
}
