export type Language =
	| "en_US"
	| "cs_CZ"
	| "de_DE"
	| "el_GR"
	| "en_AU"
	| "en_GB"
	| "en_PH"
	| "en_SG"
	| "es_AR"
	| "es_ES"
	| "es_MX"
	| "fr_FR"
	| "hu_HU"
	| "id_ID"
	| "it_IT"
	| "ja_JP"
	| "ko_KR"
	| "pl_PL"
	| "pt_BR"
	| "ro_RO"
	| "ru_RU"
	| "th_TH"
	| "tr_TR"
	| "vn_VN"
	| "zh_CN"
	| "zh_MY"
	| "zh_TW";

export interface DdragonOptions {
	version?: string;
	language?: Language;
	baseurl?: string;
	urlTransformer?: (url: string) => string;
}

export class Ddragon {
	private _version = "9.22.1";
	private _language: Language = "en_US";
	private _baseurl = "https://ddragon.leagueoflegends.com/cdn";
	private urlTransformer: (url: string) => string = (url) => url;

	/**
	 * Create a new instance of Ddragon
	 *
	 * @param version The version that will be used for generating URLs
	 * @param language The language that will be used for generating URLs
	 * @param baseurl The baseurl that will be used for generating URLs
	 */
	constructor(options?: DdragonOptions) {
		this.configure(options ?? {});
	}

	public configure({
		version,
		language,
		baseurl,
		urlTransformer,
	}: DdragonOptions) {
		if (version) {
			this._version = version;
		}
		if (language) {
			this._language = language;
		}
		if (baseurl) {
			this._baseurl = baseurl;
		}
		if (urlTransformer) {
			this.urlTransformer = urlTransformer;
		}
	}

	/**
	 * You can find all valid Data Dragon versions in the versions file. Typically
	 * there's only a single build of Data Dragon for a given patch, however
	 * occasionally there will be additional builds. This typically occurs when
	 * there's an error in the original build. As such, you should always use the
	 * most recent Data Dragon version for a given patch for the best results.
	 *
	 * The latest version is always the first element in the array.
	 */
	public versions = () => `${this._baseurl}/api/versions.json`;
	public images = {
		/**
		 * Gets the splash image of a champion + skin
		 */
		splash: (name: string, num: number) =>
			this.urlTransformer(
				`${this._baseurl}/img/champion/splash/${
					name === "Fiddlesticks" ? "FiddleSticks" : name
				}_${num}.jpg`,
			),
		/**
		 * Gets the loading image of a champion + skin
		 */
		loading: (name: string, num: number) =>
			this.urlTransformer(
				`${this._baseurl}/img/champion/loading/${
					name === "Fiddlesticks" ? "FiddleSticks" : name
				}_${num}.jpg`,
			),
		/**
		 * Get the champion tile of a champion + skin
		 */
		tile: (name: string, num: number) =>
			this.urlTransformer(
				`${this._baseurl}/img/champion/tiles/${
					name === "Fiddlesticks" ? "FiddleSticks" : name
				}_${num}.jpg`,
			),
		/**
		 * Get the champion centered image of a champion + skin
		 */
		centered: (name: string, num: number) =>
			this.urlTransformer(
				`${this._baseurl}/img/champion/centered/${
					name === "Fiddlesticks" ? "FiddleSticks" : name
				}_${num}.jpg`,
			),
		/**
		 * A champion square
		 */
		champion: (full: string) =>
			this.urlTransformer(
				`${this._baseurl}/${this._version}/img/champion/${full}`,
			),
		item: (full: string) =>
			this.urlTransformer(`${this._baseurl}/${this._version}/img/item/${full}`),
		map: (full: string) =>
			this.urlTransformer(`${this._baseurl}/${this._version}/img/map/${full}`),
		mission: (full: string) =>
			this.urlTransformer(
				`${this._baseurl}/${this._version}/img/mission/${full}`,
			),
		passive: (full: string) =>
			this.urlTransformer(
				`${this._baseurl}/${this._version}/img/passive/${full}`,
			),
		profileicon: (full: string) =>
			this.urlTransformer(
				`${this._baseurl}/${this._version}/img/profileicon/${full}`,
			),
		spell: (full: string) =>
			this.urlTransformer(
				`${this._baseurl}/${this._version}/img/spell/${full}`,
			),
		summoner: (full: string) => this.images.spell(full),
		sprite: (sprite: string) =>
			this.urlTransformer(
				`${this._baseurl}/${this._version}/img/sprite/${sprite}`,
			),
		rune: (icon: string) => this.urlTransformer(`${this._baseurl}/img/${icon}`),
		/**
		 * A stat rune
		 */
		statMod: (statName: string) => {
			return `${this._baseurl}/img/perk-images/StatMods/StatMods${statName}Icon.webp`;
		},
	};
	public data = {
		champion: (name: string) =>
			`${this._baseurl}/${this._version}/data/${this._language}champion/${name}.json`,
		champions: () =>
			`${this._baseurl}/${this._version}/data/${this._language}/champion.json`,
		championsFull: () =>
			`${this._baseurl}/${this._version}/data/${this._language}/championFull.json`,
		item: () =>
			`${this._baseurl}/${this._version}/data/${this._language}/item.json`,
		language: () =>
			`${this._baseurl}/${this._version}/data/${this._language}/language.json`,
		map: () =>
			`${this._baseurl}/${this._version}/data/${this._language}/map.json`,
		missionAssets: () =>
			`${this._baseurl}/${this._version}/data/${this._language}/mission-assets.json`,
		profileicon: () =>
			`${this._baseurl}/${this._version}/data/${this._language}/profileicon.json`,
		runes: () =>
			`${this._baseurl}/${this._version}/data/${this._language}/runesReforged.json`,
		summoner: () =>
			`${this._baseurl}/${this._version}/data/${this._language}/summoner.json`,
	};
	/**
	 * A compressed tarball (.tgz) which will contain all assets for a patch.
	 */
	dragontail = () => `${this._baseurl}/dragontail-${this._version}.tgz`;
	/**
	 * All supported languages.
	 */
	languages = () => `${this._baseurl}/languages.json`;
}

export function withWebp(
	options?: Omit<DdragonOptions, "baseurl" | "urlTransformer">,
): DdragonOptions {
	return {
		...options,
		baseurl: "https://ddragon-webp.lolmath.net",
		urlTransformer: (url) => url.replace(/.(png|jpg|jpeg)$/, ".webp"),
	};
}
