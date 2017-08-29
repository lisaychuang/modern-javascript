// Import modules from color-utils.js
import { hexToRgb, rgbToHex } from './color-utils';

// Color constructor function
export function Color(r,g,b){
    this.r = r;
    this.g = g;
    this.b = b;
}

// Implement Color type
Color.prototype = {
    get hex() {
        return rgbToHex(this.r, this.g, this.b);
    },
    set hex(hx) {
        let { r, g, b } = hexToRgb(hx);
        this.r = r;
        this.g = g;
        this.b = b;
    }
};

// Creating a constructor function #fromHex
Color.fromHex = function fromHex(hx) {
    let {r,g,b} = hexToRgb(hx);
    return new Color(r,g,b); // instantiate new colors by Hex value
}