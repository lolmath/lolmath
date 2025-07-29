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
	imageBaseUrl?: string;
	dataBaseUrl?: string;
	imageUrlTransformer?: (url: string) => string;
}

const defaultVersion = "9.22.1";
const defaultLanguage: Language = "en_US";
const defaultImageBaseUrl = "https://ddragon.leagueoflegends.com";
const defaultDataBaseUrl = "https://ddragon.leagueoflegends.com";

export function createDdragon(options?: DdragonOptions) {
	let _version = defaultVersion;
	let _language: Language = defaultLanguage;
	let _imageBaseUrl = defaultImageBaseUrl;
	let _dataBaseUrl = defaultDataBaseUrl;
	let _imageUrlTransformer: (url: string) => string = (url) => url;

	function configure({
		version,
		language,
		imageBaseUrl,
		dataBaseUrl,
		imageUrlTransformer,
	}: DdragonOptions) {
		if (version) {
			_version = version;
		}
		if (language) {
			_language = language;
		}
		if (imageBaseUrl) {
			_imageBaseUrl = imageBaseUrl;
		}
		if (dataBaseUrl) {
			_dataBaseUrl = dataBaseUrl;
		}
		if (imageUrlTransformer) {
			_imageUrlTransformer = imageUrlTransformer;
		}
	}

	configure(options ?? {});

	const images = {
		/**
		 * Gets the splash image of a champion + skin
		 */
		splash(name: string, num: number) {
			return _imageUrlTransformer(
				`${_imageBaseUrl}/cdn/img/champion/splash/${name === "Fiddlesticks" ? "FiddleSticks" : name}_${num}.jpg`,
			);
		},
		/**
		 * Gets the loading image of a champion + skin
		 */
		loading(name: string, num: number) {
			return _imageUrlTransformer(
				`${_imageBaseUrl}/cdn/img/champion/loading/${name === "Fiddlesticks" ? "FiddleSticks" : name}_${num}.jpg`,
			);
		},
		/**
		 * Get the champion tile of a champion + skin
		 */
		tile(name: string, num: number) {
			return _imageUrlTransformer(
				`${_imageBaseUrl}/cdn/img/champion/tiles/${name === "Fiddlesticks" ? "FiddleSticks" : name}_${num}.jpg`,
			);
		},
		/**
		 * Get the champion centered image of a champion + skin
		 */
		centered(name: string, num: number) {
			return _imageUrlTransformer(
				`${_imageBaseUrl}/cdn/img/champion/centered/${name === "Fiddlesticks" ? "FiddleSticks" : name}_${num}.jpg`,
			);
		},
		/**
		 * A champion square
		 */
		champion(full: string): string {
			return _imageUrlTransformer(
				`${_imageBaseUrl}/cdn/${_version}/img/champion/${full}`,
			);
		},
		item: (full: string): string => {
			return _imageUrlTransformer(
				`${_imageBaseUrl}/cdn/${_version}/img/item/${full}`,
			);
		},
		map(full: string) {
			return _imageUrlTransformer(
				`${_imageBaseUrl}/cdn/${_version}/img/map/${full}`,
			);
		},
		mission(full: string) {
			return _imageUrlTransformer(
				`${_imageBaseUrl}/cdn/${_version}/img/mission/${full}`,
			);
		},
		passive(full: string) {
			return _imageUrlTransformer(
				`${_imageBaseUrl}/cdn/${_version}/img/passive/${full}`,
			);
		},
		profileicon(full: string) {
			return _imageUrlTransformer(
				`${_imageBaseUrl}/cdn/${_version}/img/profileicon/${full}`,
			);
		},
		spell(full: string) {
			return _imageUrlTransformer(
				`${_imageBaseUrl}/cdn/${_version}/img/spell/${full}`,
			);
		},
		summoner(full: string) {
			return images.spell(full);
		},
		sprite(sprite: string) {
			return _imageUrlTransformer(
				`${_imageBaseUrl}/cdn/${_version}/img/sprite/${sprite}`,
			);
		},
		rune(icon: string) {
			return _imageUrlTransformer(`${_imageBaseUrl}/cdn/img/${icon}`);
		},
		/**
		 * A stat rune
		 */
		statMod(statName: string) {
			return _imageUrlTransformer(
				`${_imageBaseUrl}/cdn/img/perk-images/StatMods/StatMods${statName}Icon.webp`,
			);
		},
	};

	const data = {
		/**
		 * You can find all valid Data Dragon versions in the versions file. Typically
		 * there's only a single build of Data Dragon for a given patch, however
		 * occasionally there will be additional builds. This typically occurs when
		 * there's an error in the original build. As such, you should always use the
		 * most recent Data Dragon version for a given patch for the best results.
		 *
		 * The latest version is always the first element in the array.
		 */
		versions() {
			return `${_dataBaseUrl}/api/versions.json`;
		},
		/**
		 * A compressed tarball (.tgz) which will contain all assets for a patch.
		 */
		dragontail() {
			return `${_dataBaseUrl}/cdn/dragontail-${_version}.tgz`;
		},
		/**
		 * All supported languages.
		 */
		languages() {
			return `${_dataBaseUrl}/cdn/languages.json`;
		},
		champion: (name: string) => {
			return `${_dataBaseUrl}/cdn/${_version}/data/${_language}champion/${name}.json`;
		},
		champions() {
			return `${_dataBaseUrl}/cdn/${_version}/data/${_language}/champion.json`;
		},
		championsFull() {
			return `${_dataBaseUrl}/cdn/${_version}/data/${_language}/championFull.json`;
		},
		item() {
			return `${_dataBaseUrl}/cdn/${_version}/data/${_language}/item.json`;
		},
		language: () =>
			`${_dataBaseUrl}/cdn/${_version}/data/${_language}/language.json`,
		map() {
			return `${_dataBaseUrl}/cdn/${_version}/data/${_language}/map.json`;
		},
		missionAssets() {
			return `${_dataBaseUrl}/cdn/${_version}/data/${_language}/mission-assets.json`;
		},
		profileicon() {
			return `${_dataBaseUrl}/cdn/${_version}/data/${_language}/profileicon.json`;
		},
		runes() {
			return `${_dataBaseUrl}/cdn/${_version}/data/${_language}/runesReforged.json`;
		},
		summoner() {
			return `${_dataBaseUrl}/cdn/${_version}/data/${_language}/summoner.json`;
		},
	};

	return {
		configure,
		images,
		data,
	};
}

export function withWebp(
	options?: Omit<DdragonOptions, "imageBaseUrl" | "imageUrlTransformer">,
): DdragonOptions {
	return {
		...options,
		imageBaseUrl: "https://ddragon-webp.lolmath.net",
		imageUrlTransformer: (url) =>
			url
				.replace(/.(png|jpg|jpeg)$/, ".webp")
				.replaceAll(options?.version ?? defaultVersion, "latest"),
	};
}
