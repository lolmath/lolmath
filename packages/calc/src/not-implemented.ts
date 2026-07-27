/**
 * Marks a calculation that has been declared but not implemented yet.
 *
 * @remarks
 * Every stub in this package funnels through this helper. It keeps the public
 * signatures free of underscore prefixes (the arguments are genuinely
 * consumed) and makes an unfinished calculation fail loudly instead of
 * silently returning a wrong number.
 *
 * This helper is internal and is deliberately not re-exported from the
 * package entry point.
 *
 * @param name The name of the calculation that is not implemented yet.
 * @param _args The arguments the stub was called with. Ignored.
 * @returns Never returns.
 * @throws Always.
 */
export function notImplemented(name: string, ..._args: unknown[]): never {
	throw new Error(`@lolmath/calc: \`${name}\` is not implemented yet.`);
}
