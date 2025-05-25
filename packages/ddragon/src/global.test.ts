import { describe, expect, it } from "vitest";
import { ddragon } from "./global";

describe("Ddragon instance", () => {
	it("should configure", async () => {
		ddragon.configure({
			version: "1.1.1",
			language: "en_GB",
			dataBaseUrl: "https://test.com",
		});
		expect(ddragon.data.champions()).toContain("1.1.1");
		expect(ddragon.data.champions()).toContain("en_GB");
		expect(ddragon.data.champions()).toContain("https://test.com");

		ddragon.configure({
			version: "1.2.0",
			language: "ja_JP",
			dataBaseUrl: "https://test2.com",
		});
		expect(ddragon.data.champions()).toContain("1.2.0");
		expect(ddragon.data.champions()).toContain("ja_JP");
		expect(ddragon.data.champions()).toContain("https://test2.com");
	});
});
