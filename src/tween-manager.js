/** @import { Tween } from "./tween.js" */

/**
 * @name TweenManager
 * @description Handles updating tweens
 */
class TweenManager {
    /**
     * @private
     * @type {Tween[]}
     */
    _tweens = [];

    /**
     * @private
     * @type {Tween[]}
     */
    _add = [];

    /**
     * Adds a tween
     * @param {Tween} tween - The tween instance to manage
     * @returns {Tween} - The tween instance for chaining
     */
    add(tween) {
        this._add.push(tween);
        return tween;
    }

    /**
     * Update the tween
     * @param {number} dt - The delta time
     */
    update(dt) {
        let i = 0;
        let n = this._tweens.length;
        while (i < n) {
            if (this._tweens[i].update(dt)) {
                i++;
            } else {
                this._tweens.splice(i, 1);
                n--;
            }
        }

        // add any tweens that were added mid-update
        if (this._add.length) {
            for (let i = 0; i < this._add.length; i++) {
                if (this._tweens.indexOf(this._add[i]) > -1) continue;
                this._tweens.push(this._add[i]);
            }
            this._add.length = 0;
        }
    }
}

export { TweenManager };
