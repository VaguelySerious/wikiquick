# WikiQuick

A lightweight plugin for in-page Wikipedia lookups by double-clicking on any word.  
Creates information windows similar in style to those when hovering over links in Wikipedia.

## How to run

Currently available only as an unpacked Chrome extension.
Here's how to use it while it's still unpublished:

+ Clone the repo
+ Run `npm install` or `yarn install`
+ Build it with `npm run build` or `yarn build`

Then, in Chrome: 
+ Go to [the extensions page](chrome://extensions/) in Chrome
+ Enable developer mode on the top right
+ Click "Load unpacked" on the top left and navigate to `/public/` in the cloned repo
Or in Firefox:
+ Go to [the debugging page](about:debugging#/runtime/this-firefox)
+ Click on "Load temporary Add-on", navigate to `/public/` and select the `manifest.json` file

Finally:
+ Go to a web page of your choice
+ Double click on a word

## Disclaimer

This is a personal project designed to be used for educational purposes only. I am not affiliated with Wikimedia in any way.
By using this plugin and, by extension, the Wikimedia REST API, you agree to Wikimedia's [Terms of Use](https://wikimediafoundation.org/wiki/Terms_of_Use) and [Privacy Policy](https://wikimediafoundation.org/wiki/Privacy_policy).
Please inform yourself about any restrictions that might apply on the [REST API Documentation page](https://en.wikipedia.org/api/rest_v1/)

## Roadmap

+ First release (02. Februrary 2019)
  + Basic functionality
  + Code refactor

+ Planned features
  + Example website with this plugin included as a javascript dependency and some text to experiment
  + Support for images
  + Better positioning and off-screen handling
  + Loading animation while fetching data
  + Support for disambiguation
  + Settings:
    + On/Off toggle
    + Choice of selection method (double click or hotkey)
    + Choice of language
  + Expand popup to read more
  + External link to Wikipedia
  + Match multiple languages at once
    + Useful for multilinguals
    + Helps translating foreign words
  + Translate item to favorite languages

+ Pending
  + Chrome Web Store release
  + Firefox Add-ons release

+ Features in consideration
  + Locally saved history of lookups
  + Safari Support
