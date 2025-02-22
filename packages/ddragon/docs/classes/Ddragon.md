[**ddragon**](../docs.md)

***

# Class: Ddragon

## Constructors

### new Ddragon()

> **new Ddragon**(`version`?, `language`?, `baseurl`?): [`Ddragon`](Ddragon.md)

Create a new instance of Ddragon

#### Parameters

##### version?

`string`

The version that will be used for generating URLs

##### language?

[`Language`](../type-aliases/Language.md)

The language that will be used for generating URLs

##### baseurl?

`string`

The baseurl that will be used for generating URLs

#### Returns

[`Ddragon`](Ddragon.md)

## Properties

### data

> **data**: `object`

#### champion()

> **champion**: (`name`) => `string`

##### Parameters

###### name

`string`

##### Returns

`string`

#### champions()

> **champions**: () => `string`

##### Returns

`string`

#### championsFull()

> **championsFull**: () => `string`

##### Returns

`string`

#### item()

> **item**: () => `string`

##### Returns

`string`

#### language()

> **language**: () => `string`

##### Returns

`string`

#### map()

> **map**: () => `string`

##### Returns

`string`

#### missionAssets()

> **missionAssets**: () => `string`

##### Returns

`string`

#### profileicon()

> **profileicon**: () => `string`

##### Returns

`string`

#### runes()

> **runes**: () => `string`

##### Returns

`string`

#### summoner()

> **summoner**: () => `string`

##### Returns

`string`

***

### images

> **images**: `object`

#### centered()

> **centered**: (`name`, `num`) => `string`

Get the champion centered image of a champion + skin

##### Parameters

###### name

`string`

###### num

`number`

##### Returns

`string`

#### champion()

> **champion**: (`full`) => `string`

A champion square

##### Parameters

###### full

`string`

##### Returns

`string`

#### item()

> **item**: (`full`) => `string`

##### Parameters

###### full

`string`

##### Returns

`string`

#### loading()

> **loading**: (`name`, `num`) => `string`

Gets the loading image of a champion + skin

##### Parameters

###### name

`string`

###### num

`number`

##### Returns

`string`

#### map()

> **map**: (`full`) => `string`

##### Parameters

###### full

`string`

##### Returns

`string`

#### mission()

> **mission**: (`full`) => `string`

##### Parameters

###### full

`string`

##### Returns

`string`

#### passive()

> **passive**: (`full`) => `string`

##### Parameters

###### full

`string`

##### Returns

`string`

#### profileicon()

> **profileicon**: (`full`) => `string`

##### Parameters

###### full

`string`

##### Returns

`string`

#### rune()

> **rune**: (`icon`) => `string`

##### Parameters

###### icon

`string`

##### Returns

`string`

#### spell()

> **spell**: (`full`) => `string`

##### Parameters

###### full

`string`

##### Returns

`string`

#### splash()

> **splash**: (`name`, `num`) => `string`

Gets the splash image of a champion + skin

##### Parameters

###### name

`string`

###### num

`number`

##### Returns

`string`

#### sprite()

> **sprite**: (`sprite`) => `string`

##### Parameters

###### sprite

`string`

##### Returns

`string`

#### statMod()

> **statMod**: (`statName`) => `string`

A stat rune

##### Parameters

###### statName

`string`

##### Returns

`string`

#### summoner()

> **summoner**: (`full`) => `string`

##### Parameters

###### full

`string`

##### Returns

`string`

#### tile()

> **tile**: (`name`, `num`) => `string`

Get the champion tile of a champion + skin

##### Parameters

###### name

`string`

###### num

`number`

##### Returns

`string`

## Methods

### configure()

> **configure**(`version`, `language`, `baseurl`): `void`

#### Parameters

##### version

`string` = `"9.22.1"`

##### language

[`Language`](../type-aliases/Language.md) = `"en_US"`

##### baseurl

`string` = `"https://ddragon.leagueoflegends.com"`

#### Returns

`void`

***

### dragontail()

> **dragontail**(): `string`

A compressed tarball (.tgz) which will contain all assets for a patch.

#### Returns

`string`

***

### languages()

> **languages**(): `string`

All supported languages.

#### Returns

`string`

***

### versions()

> **versions**(): `string`

You can find all valid Data Dragon versions in the versions file. Typically
there's only a single build of Data Dragon for a given patch, however
occasionally there will be additional builds. This typically occurs when
there's an error in the original build. As such, you should always use the
most recent Data Dragon version for a given patch for the best results.

The latest version is always the first element in the array.

#### Returns

`string`
