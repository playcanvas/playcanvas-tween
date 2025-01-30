import * as easing from './easing.js';

import { addTweenExtensions, getTweenManager } from './index.js';

if (!globalThis.pc) {
    throw new Error('There is no global `pc` playcanvas object.');
}

// Add the easing functions to the pc global, ie. pc.SineInOut
Object.assign(globalThis.pc, easing);

// Extend the Entity and AppBase prototypes with tween methods
addTweenExtensions(globalThis.pc);

globalThis.pc.AppBase.prototype.addTweenManager = function () {
    this._tweenManager = getTweenManager(this);
};
