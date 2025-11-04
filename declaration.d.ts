declare module "*.module.css";

declare module "*.svg" {
	// biome-ignore lint/suspicious/noExplicitAny: any type
	const content: any;
	export default content;
}
