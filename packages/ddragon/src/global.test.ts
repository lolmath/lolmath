import { describe, expect, it } from "vitest";
import { ddragon } from "./global";
import { Ddragon } from "./index";

describe("Ddragon instance", () => {
	it("should be an instance of Ddragon", () => {
		expect(ddragon).toBeInstanceOf(Ddragon);
	});

	it("should configure", async () => {
		ddragon.configure("1.1.1", "en_GB", "https://test.com");
		expect(ddragon.data.champions()).toContain("1.1.1");
		expect(ddragon.data.champions()).toContain("en_GB");
		expect(ddragon.data.champions()).toContain("https://test.com");

		ddragon.configure("1.2.0", "ja_JP", "https://test2.com");
		expect(ddragon.data.champions()).toContain("1.2.0");
		expect(ddragon.data.champions()).toContain("ja_JP");
		expect(ddragon.data.champions()).toContain("https://test2.com");
	});
});
