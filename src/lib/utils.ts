export const getComputedStyleValue = (property: string) => {
  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(property)
    .trim();
};
