import { describe, expect, it } from "vitest";
import { createDdragon, withWebp } from "./index";

describe("defaults", () => {
	const defaultDragon = createDdragon();
	it("uses https", () => {
		const championsUrl = defaultDragon.data.champions();
		expect(championsUrl).toContain("https");
	});
});

describe("constructor", () => {
	it("passes values", () => {
		const dd = createDdragon({
			version: "1.1.1",
			language: "el_GR",
			dataBaseUrl: "https://test.com",
			urlTransformer: (url) => url,
		});
		const championsUrl = dd.data.champions();
		expect(championsUrl).toContain("1.1.1");
		expect(championsUrl).toContain("el_GR");
		expect(championsUrl).toContain("https://test.com");
	});

	it("defaults", () => {
		const dd = createDdragon();
		const championsUrl = dd.data.champions();
		expect(championsUrl).toContain("9.22.1");
		expect(championsUrl).toContain("en_US");
		expect(championsUrl).toContain("https://ddragon.leagueoflegends.com");
	});
});

describe(".configure", () => {
	it("updates the version", () => {
		const dd = createDdragon();
		dd.configure({ version: "1.1.1" });
		expect(dd.data.champions()).toContain("1.1.1");
	});
	it("updates the language", () => {
		const dd = createDdragon();
		dd.configure({ language: "el_GR" });
		expect(dd.data.champions()).toContain("el_GR");
	});
	it("updates the baseurl", () => {
		const dd = createDdragon();
		dd.configure({ dataBaseUrl: "https://test.com" });
		expect(dd.data.champions()).toContain("https://test.com");
	});
});

describe("versions", () => {
	it("returns the correct url", () => {
		const dataBaseUrl = "https://test.com";
		const dd = createDdragon({ dataBaseUrl });
		expect(dd.data.versions()).toEqual(`${dataBaseUrl}/api/versions.json`);
	});
});

describe("withWebp", () => {
	it("returns the correct url", () => {
		const dd = createDdragon(withWebp());
		expect(dd.images.tile("Fiddlesticks", 1)).toContain(".webp");
	});

	it("configures with webp", () => {
		const dd = createDdragon();
		dd.configure(withWebp());
		expect(dd.images.tile("Fiddlesticks", 1)).toContain(".webp");
	});
});
