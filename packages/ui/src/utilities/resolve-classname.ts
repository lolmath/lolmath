export function resolveClassname<
  T extends { className?: ((values: any) => string) | string | undefined },
>(props: T, values: any) {
  return typeof props.className === "function"
    ? props.className(values)
    : props.className;
}
