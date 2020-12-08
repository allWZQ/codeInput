/**
 * 日志工具
 */
export class Logs {
  static line(text?: string) {
    if (process.env.LOG) {
      let number = 12;
      let lineText = '-'.repeat(number);
      if (text) {
        let haflLineText = lineText.substr(0, Math.floor(number / 2));
        lineText = `${haflLineText} ${text} ${haflLineText}`;
      }
      Logs.warn(lineText);
    }
  }
  static get log() {
    if (process.env.LOG) {
      return console.log;
    } else {
      return new Function();
    }
  }
  static get warn() {
    if (process.env.LOG) {
      return console.warn;
    } else {
      return new Function();
    }
  }
  static get error() {
    if (process.env.LOG) {
      return console.error;
    } else {
      return new Function();
    }
  }
}
