import { createPopup } from 'popup'
import { fetch, image } from 'api'
import { bindDoubleClick, bindButtonHighlight } from 'input'

const settings = {
    input: 'doubleclick',
    button: 'ctrl',
    lang: 'en',
    tryLangs: ['de', 'jp', 'zh', 'it'],
}

if (settings.input === 'doubleclick') {
    bindDoubleClick(onSelect, { interval: 300 })
} else {
    bindButtonHighlight(onSelect, { button: settings.button })
}

function onSelect(text) {

    // Display loading popup

    // Fetch word from API
    //  loop languages if not found
    //  interruptable by clicking outside

    // Display it

    // Fetch image

    // Paste image into it
}