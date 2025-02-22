# ddragon

[![npm](https://img.shields.io/npm/v/ddragon)](https://www.npmjs.com/package/ddragon)

ddragon api for League of Legends.

## Usage

```js
import { Ddragon } from "ddragon";

const dd = new Ddragon(
  "6.24.1", // defaults to 8.9.1
  "ja_JP", // defaults to en_US
  "https://ddragon.leagueoflegends.com" // defaults to https://dragon.leagueoflegends.com
);

dd.images.splash("Cassiopeia", 0); // https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Cassiopeia_0.jpg
```

### Global

```js
import { ddragon } from "ddragon/global";

ddragon.configure("6.24.1", "ja_JP", "https://ddragon.leagueoflegends.com");

ddragon.images.splash("Cassiopeia", 0); // https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Cassiopeia_0.jpg
```

## Docs

Documentation can be found in the `docs` folder.
