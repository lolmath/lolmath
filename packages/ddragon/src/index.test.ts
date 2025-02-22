import { describe, expect, it } from "vitest";
import { Ddragon, withWebp } from "./index";

describe("defaults", () => {
	const defaultDragon = new Ddragon();
	it("uses https", () => {
		const championsUrl = defaultDragon.data.champions();
		expect(championsUrl).toContain("https");
	});
});

describe("constructor", () => {
	it("passes values", () => {
		const dd = new Ddragon({
			version: "1.1.1",
			language: "el_GR",
			baseurl: "https://test.com",
			urlTransformer: (url) => url,
		});
		const championsUrl = dd.data.champions();
		expect(championsUrl).toContain("1.1.1");
		expect(championsUrl).toContain("el_GR");
		expect(championsUrl).toContain("https://test.com");
	});

	it("defaults", () => {
		const dd = new Ddragon();
		const championsUrl = dd.data.champions();
		expect(championsUrl).toContain("9.22.1");
		expect(championsUrl).toContain("en_US");
		expect(championsUrl).toContain("https://ddragon.leagueoflegends.com");
	});
});

describe(".configure", () => {
	it("updates the version", () => {
		const dd = new Ddragon();
		dd.configure({ version: "1.1.1" });
		expect(dd.data.champions()).toContain("1.1.1");
	});
	it("updates the language", () => {
		const dd = new Ddragon();
		dd.configure({ language: "el_GR" });
		expect(dd.data.champions()).toContain("el_GR");
	});
	it("updates the baseurl", () => {
		const dd = new Ddragon();
		dd.configure({ baseurl: "https://test.com" });
		expect(dd.data.champions()).toContain("https://test.com");
	});
});

describe("versions", () => {
	it("returns the correct url", () => {
		const baseurl = "https://test.com";
		const dd = new Ddragon({ baseurl });
		expect(dd.versions()).toEqual(`${baseurl}/api/versions.json`);
	});
});

describe("withWebp", () => {
	it("returns the correct url", () => {
		const dd = new Ddragon(withWebp());
		expect(dd.images.tile("Fiddlesticks", 1)).toContain(".webp");
	});

	it("configures with webp", () => {
		const dd = new Ddragon();
		dd.configure(withWebp());
		expect(dd.images.tile("Fiddlesticks", 1)).toContain(".webp");
	});
});
