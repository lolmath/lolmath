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
