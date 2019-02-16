# WikiQuick

A lightweight plugin for in-page Wikipedia lookups by double-clicking on any word.

## How to run

Currently available only as an unpacked Chrome extension.
Here's how to use it while it's still unpublished:

+ Clone the repo
+ Run `npm install` or `yarn install`
+ Build it with `npm run build` or `yarn build`
+ Go to [the extensions page](chrome://extensions/) in Chrome
+ Enable developer mode on the top right
+ Click "Load unpacked" on the top left and navigate to `/public/` in the cloned repo
+ Go to a web page of your choice
+ Double click on a word

## Disclaimer

This is a personal project. I am not affiliated with Wikipedia in any way. While the CORS headers set on the Wikipedia rest_v1 API do not prohibit this kind of usage, keep in mind that it has not been expressly allowed by Wikipedia.

## Roadmap

+ First release (02. Februrary 2019)
  + Basic functionality
  + Code refactor

+ February 2019
  + Support for images
  + Better positioning and off-screen handling
  + Loading animation while fetching data

+ March 2019
  + Support for disambiguation
  + Settings:
    + On/Off toggle
    + Choice of selection method (double click or hotkey)
    + Choice of language

+ Chrome Web Store release (March 2019)

+ Planned features (2019)
  + Expand popup to read more
  + External link to Wikipedia
  + Match multiple languages at once
    + Useful for multilinguals
    + Helps translating foreign words
  + Translate item to favorite languages

+ Features in consideration
  + Locally saved history of lookups
