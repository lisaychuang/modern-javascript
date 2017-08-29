export let color = {r: 255, g: 0, b: 0};

Object.defineProperty(color, 'hex', {
    get() {
        let hexR = this.r
        let hexG = this.g
        let hexB = this.b
        return [hexR, hexG, hexB]
        .map(function boxChannel(ch){
            return Math.max(0, Math.min(255, ch));
        })
        .map(function toHex(ch){
            return ch.toString(16);
        })
        .map(function padding(ch){
            if (ch.length <2) return `0${ch}`;
            return ch;
        })
        .join ('');
    },

    set(hx){
        let hex = hx.length ==3 ? `${hx[0]}${hx[0]}${hx[1]}${hx[1]}${hx[2]}${hx[2]}` : hx;
        let [r,g,b] = [0,2,4]
            .map((x) => parseInt(hex.substring(x,x+2),16));
            this.r = r;
            this.g = g;
            this.b = b;
    }
});