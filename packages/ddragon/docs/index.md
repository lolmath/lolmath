---
title: "@lolmath/ddragon"
---

# ddragon

[![npm](https://img.shields.io/npm/v/ddragon)](https://www.npmjs.com/package/ddragon)

ddragon api for League of Legends.

## Usage

```js
import { Ddragon } from "@lolmath/ddragon";

const dd = new Ddragon({
  version: "6.24.1", // defaults to 8.9.1
  language: "ja_JP", // defaults to en_US
  dataBaseUrl: "https://ddragon.leagueoflegends.com/cdn" // defaults to https://ddragon.leagueoflegends.com/cdn
  imageBaseUrl: "https://ddragon.leagueoflegends.com/cdn" // defaults to https://ddragon.leagueoflegends.com/cdn
  imageUrlTransformer: (url) => url // defaults to (url) => url
});

dd.images.splash("Cassiopeia", 0); // https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Cassiopeia_0.jpg
```

### Global

```js
import { ddragon } from "ddragon/global";

ddragon.configure({
  version: "6.24.1",
});

ddragon.images.splash("Cassiopeia", 0); // https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Cassiopeia_0.jpg
```

### Webp

```js
import { Ddragon, withWebp } from "@lolmath/ddragon";

const dd = new Ddragon(withWebp());

dd.images.splash("Cassiopeia", 0); // https://ddragon-webp.lolmath.net/img/champion/centered/Cassiopeia_0.webp
```

## Docs

Documentation can be found at https://docs.lolmath.net/ddragon

## Interfaces

### DdragonOptions

Defined in: [index.ts:30](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L30)

#### Properties

##### dataBaseUrl?

```ts
optional dataBaseUrl: string;
```

Defined in: [index.ts:34](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L34)

##### imageBaseUrl?

```ts
optional imageBaseUrl: string;
```

Defined in: [index.ts:33](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L33)

##### imageUrlTransformer()?

```ts
optional imageUrlTransformer: (url) => string;
```

Defined in: [index.ts:35](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L35)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |

###### Returns

`string`

##### language?

```ts
optional language: Language;
```

Defined in: [index.ts:32](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L32)

##### version?

```ts
optional version: string;
```

Defined in: [index.ts:31](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L31)

## Type Aliases

### Language

```ts
type Language = 
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
```

Defined in: [index.ts:1](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L1)

## Functions

### createDdragon()

```ts
function createDdragon(options?): object;
```

Defined in: [index.ts:43](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L43)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | [`DdragonOptions`](./index.md#ddragonoptions) |

#### Returns

`object`

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `configure()` | (`__namedParameters`) => `void` | - | [index.ts:225](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L225) |
| `data` | `object` | - | [index.ts:227](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L227) |
| `data.champion()` | (`name`) => `string` | - | [index.ts:193](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L193) |
| `data.language()` | () => `string` | - | [index.ts:205](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L205) |
| `champions()` | () => `string` | - | [index.ts:196](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L196) |
| `championsFull()` | () => `string` | - | [index.ts:199](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L199) |
| `dragontail()` | () => `string` | A compressed tarball (.tgz) which will contain all assets for a patch. | [index.ts:184](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L184) |
| `item()` | () => `string` | - | [index.ts:202](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L202) |
| `languages()` | () => `string` | All supported languages. | [index.ts:190](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L190) |
| `map()` | () => `string` | - | [index.ts:207](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L207) |
| `missionAssets()` | () => `string` | - | [index.ts:210](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L210) |
| `profileicon()` | () => `string` | - | [index.ts:213](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L213) |
| `runes()` | () => `string` | - | [index.ts:216](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L216) |
| `summoner()` | () => `string` | - | [index.ts:219](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L219) |
| `versions()` | () => `string` | You can find all valid Data Dragon versions in the versions file. Typically there's only a single build of Data Dragon for a given patch, however occasionally there will be additional builds. This typically occurs when there's an error in the original build. As such, you should always use the most recent Data Dragon version for a given patch for the best results. The latest version is always the first element in the array. | [index.ts:178](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L178) |
| `images` | `object` | - | [index.ts:226](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L226) |
| `images.item()` | (`full`) => `string` | - | [index.ts:117](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L117) |
| `centered()` | (`name`, `num`) => `string` | Get the champion centered image of a champion + skin | [index.ts:104](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L104) |
| `champion()` | (`full`) => `string` | A champion square | [index.ts:112](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L112) |
| `loading()` | (`name`, `num`) => `string` | Gets the loading image of a champion + skin | [index.ts:88](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L88) |
| `map()` | (`full`) => `string` | - | [index.ts:122](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L122) |
| `mission()` | (`full`) => `string` | - | [index.ts:127](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L127) |
| `passive()` | (`full`) => `string` | - | [index.ts:132](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L132) |
| `profileicon()` | (`full`) => `string` | - | [index.ts:137](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L137) |
| `rune()` | (`icon`) => `string` | - | [index.ts:155](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L155) |
| `spell()` | (`full`) => `string` | - | [index.ts:142](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L142) |
| `splash()` | (`name`, `num`) => `string` | Gets the splash image of a champion + skin | [index.ts:80](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L80) |
| `sprite()` | (`sprite`) => `string` | - | [index.ts:150](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L150) |
| `statMod()` | (`statName`) => `string` | A stat rune | [index.ts:161](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L161) |
| `summoner()` | (`full`) => `string` | - | [index.ts:147](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L147) |
| `tile()` | (`name`, `num`) => `string` | Get the champion tile of a champion + skin | [index.ts:96](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L96) |

***

### withWebp()

```ts
function withWebp(options?): DdragonOptions;
```

Defined in: [index.ts:231](https://gitlab.com/lol-math/lolmath/-/blob/main/packages/ddragon/src/index.ts#L231)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `Omit`\<[`DdragonOptions`](./index.md#ddragonoptions), `"imageBaseUrl"` \| `"imageUrlTransformer"`\> |

#### Returns

[`DdragonOptions`](./index.md#ddragonoptions)
