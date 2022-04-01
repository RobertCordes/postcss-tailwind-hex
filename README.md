# postcss-tailwind-hex

> [PostCSS](https://github.com/postcss/postcss) plugin that replaces Tailwind RGB(a) values with hexadecimal analogues


## Processing example

this code

```
.element {
    border: 2px solid rgba(0, 0, 0, var(--tw-text-opacity));
}
```

converts to

```
.element {
    border: 2px solid #000000;
}
```


## Installation

```
npm i --save-dev @diverently/postcss-tailwind-hex
```


## Usage

```
postcss([ require('postcss-tailwind-hex') ])
```
Please refer to [PostCSS documentation](https://github.com/postcss/postcss#usage) for you current environment.


### Options

#### `rgbOnly` [Boolean]
default: `false`

Process only rgb color values

#### `rgbaOnly` [Boolean]
default: `false`

Process only rgba color values

#### `silent` [Boolean]
default: `false`

Omit verbose conversion logging


## [License](LICENSE)
