import { describe, expect, it } from "vitest";
import { Ddragon } from "./index";

const version = "1.1.1";
const language = "en_GB";
const baseurl = "https://test.com";
const dd = new Ddragon(version, language, baseurl);

describe("defaults", () => {
	const defaultDragon = new Ddragon();
	it("uses https", () => {
		const championsUrl = defaultDragon.data.champions();
		expect(championsUrl).toContain("https");
	});
});

describe("constructor", () => {
	it("passes values", () => {
		const championsUrl = dd.data.champions();
		expect(championsUrl).toContain(version);
		expect(championsUrl).toContain(language);
		expect(championsUrl).toContain(baseurl);
	});
});

describe("versions", () => {
	it("returns the correct url", () => {
		expect(dd.versions()).toEqual(`${baseurl}/api/versions.json`);
	});
});
