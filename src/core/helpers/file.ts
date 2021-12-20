const randomstring = require('randomstring');

export function randStr(length?: number, charset?: string) {
  length = length || 12;
  charset = charset || 'alphanumeric';
  return randomstring.generate({
    length,
    charset,
  });
}
