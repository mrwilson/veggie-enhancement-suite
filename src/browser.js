export function browser() {
  let browser = (typeof chrome !== 'undefined')
    ? chrome
    : browser;
}