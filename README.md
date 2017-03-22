# [Claroline Icons](https://claroline.github.io/icons/)

## Installation and usage

Once you have forked/cloned this repository, enter its root directory and run:

```
npm install
```

The whole project can be built with:

```
npm run build
```

The command above will optimize SVG files, concatenate them by domain and
generate a complete static documentation.

If you're creating new icons or editing existing ones, you might want to run a
local web server to visualize your changes in context. The following command:

```
npm run serve
```

will make the documentation available locally at [http://localhost:3000/]
(http://localhost:3000/) and will rebuild it on each change made to the SVG
files stored in the *inkscape* directory.

## File structure

- *inkscape*: stores original/raw SVG files produced by Inkscape. Icons are
  grouped in sub-directories by domain or feature. Sub-directory names will be
  used as icon prefixes in the build pass.
- *dist*: destination directory of the build/optimization pass. It contains single
  optimized SVG files for each domain present in the *inkscape* directory.
- *docs*: static documentation for the icon set. It will be also served with
  Github Pages at https://claroline.github.io/icons/.
- *src*: build scripts and helpers.

## TODO

- Allow to visualize single icons in grid mode
- Add a playground page to see icon subsets in context
