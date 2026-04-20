declare module "*.module.css" {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module "*.css" {
	const css: string;
	export default css;
}

declare module "*.png" {
	const value: string;
	export default value;
}
declare module "*.svg" {
	const value: string;
	export default value;
}
