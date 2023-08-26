export function resolveClassname(
  className: ((values: any) => string) | string | undefined,
  values: any,
) {
  return typeof className === "function" ? className(values) : className;
}
