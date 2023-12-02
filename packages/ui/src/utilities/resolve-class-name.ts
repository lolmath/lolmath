export function resolveClassName(
  className: ((values: any) => string) | string | undefined,
  values: any,
) {
  return typeof className === "function" ? className(values) : className;
}
