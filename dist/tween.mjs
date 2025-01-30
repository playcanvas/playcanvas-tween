import { EventHandler, Quat, Vec2, Vec3, Vec4, Color, AppBase } from 'playcanvas';

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

/**
 * Easing methods
 */

const Linear = function (k) {
    return k;
};

const QuadraticIn = function (k) {
    return k * k;
};

const QuadraticOut = function (k) {
    return k * (2 - k);
};

const QuadraticInOut = function (k) {
    if ((k *= 2) < 1) {
        return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
};

const CubicIn = function (k) {
    return k * k * k;
};

const CubicOut = function (k) {
    return --k * k * k + 1;
};

const CubicInOut = function (k) {
    if ((k *= 2) < 1) return 0.5 * k * k * k;
    return 0.5 * ((k -= 2) * k * k + 2);
};

const QuarticIn = function (k) {
    return k * k * k * k;
};

const QuarticOut = function (k) {
    return 1 - (--k * k * k * k);
};

const QuarticInOut = function (k) {
    if ((k *= 2) < 1) return 0.5 * k * k * k * k;
    return -0.5 * ((k -= 2) * k * k * k - 2);
};

const QuinticIn = function (k) {
    return k * k * k * k * k;
};

const QuinticOut = function (k) {
    return --k * k * k * k * k + 1;
};

const QuinticInOut = function (k) {
    if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
    return 0.5 * ((k -= 2) * k * k * k * k + 2);
};

const SineIn = function (k) {
    if (k === 0) return 0;
    if (k === 1) return 1;
    return 1 - Math.cos(k * Math.PI / 2);
};

const SineOut = function (k) {
    if (k === 0) return 0;
    if (k === 1) return 1;
    return Math.sin(k * Math.PI / 2);
};

const SineInOut = function (k) {
    if (k === 0) return 0;
    if (k === 1) return 1;
    return 0.5 * (1 - Math.cos(Math.PI * k));
};

const ExponentialIn = function (k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
};

const ExponentialOut = function (k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
};

const ExponentialInOut = function (k) {
    if (k === 0) return 0;
    if (k === 1) return 1;
    if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);
    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
};

const CircularIn = function (k) {
    return 1 - Math.sqrt(1 - k * k);
};

const CircularOut = function (k) {
    return Math.sqrt(1 - (--k * k));
};

const CircularInOut = function (k) {
    if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
};

const ElasticIn = function (k) {
    const p = 0.4;
    let s, a = 0.1;
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (!a || a < 1) {
        a = 1; s = p / 4;
    } else s = p * Math.asin(1 / a) / (2 * Math.PI);
    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
};

const ElasticOut = function (k) {
    const p = 0.4;
    let s, a = 0.1;
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (!a || a < 1) {
        a = 1; s = p / 4;
    } else s = p * Math.asin(1 / a) / (2 * Math.PI);
    return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
};

const ElasticInOut = function (k) {
    const p = 0.4;
    let s, a = 0.1;
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (!a || a < 1) {
        a = 1; s = p / 4;
    } else s = p * Math.asin(1 / a) / (2 * Math.PI);
    if ((k *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
};

const BackIn = function (k) {
    const s = 1.70158;
    return k * k * ((s + 1) * k - s);
};

const BackOut = function (k) {
    const s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
};

const BackInOut = function (k) {
    const s = 1.70158 * 1.525;
    if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
};

const BounceOut = function (k) {
    if (k < (1 / 2.75)) {
        return 7.5625 * k * k;
    } else if (k < (2 / 2.75)) {
        return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
    } else if (k < (2.5 / 2.75)) {
        return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
    }
    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;

};

const BounceIn = function (k) {
    return 1 - BounceOut(1 - k);
};

const BounceInOut = function (k) {
    if (k < 0.5) return BounceIn(k * 2) * 0.5;
    return BounceOut(k * 2 - 1) * 0.5 + 0.5;
};

/** @import { TweenManager } from "./tween-manager.js" */
/** @import { Entity } from "playcanvas" */

class Tween extends EventHandler {
    /**
     * @name  Tween
     * @param {object} target - The target property that will be tweened
     * @param {TweenManager} manager - The tween manager
     * @param {Entity} entity - The Entity whose property we are tween-ing
     */
    constructor(target, manager, entity) {

        super();

        this.manager = manager;

        if (entity) {
            this.entity = null; // if present the tween will dirty the transforms after modify the target
        }

        this.time = 0;

        this.complete = false;
        this.playing = false;
        this.stopped = true;
        this.pending = false;

        this.target = target;

        this.duration = 0;
        this._currentDelay = 0;
        this.timeScale = 1;
        this._reverse = false;

        this._delay = 0;
        this._yoyo = false;

        this._count = 0;
        this._numRepeats = 0;
        this._repeatDelay = 0;

        this._from = false; // indicates a "from" tween

        // for rotation tween
        this._slerp = false; // indicates a rotation tween
        this._fromQuat = new Quat();
        this._toQuat = new Quat();
        this._quat = new Quat();

        this.easing = Linear;

        this._sv = {}; // start values
        this._ev = {}; // end values
    }

    _parseProperties(properties) {
        let _properties;
        if (properties instanceof Vec2) {
            _properties = {
                x: properties.x,
                y: properties.y
            };
        } else if (properties instanceof Vec3) {
            _properties = {
                x: properties.x,
                y: properties.y,
                z: properties.z
            };
        } else if (properties instanceof Vec4) {
            _properties = {
                x: properties.x,
                y: properties.y,
                z: properties.z,
                w: properties.w
            };
        } else if (properties instanceof Quat) {
            _properties = {
                x: properties.x,
                y: properties.y,
                z: properties.z,
                w: properties.w
            };
        } else if (properties instanceof Color) {
            _properties = {
                r: properties.r,
                g: properties.g,
                b: properties.b
            };
            if (properties.a !== undefined) {
                _properties.a = properties.a;
            }
        } else {
            _properties = properties;
        }
        return _properties;
    }


    // properties - js obj of values to update in target
    to(properties, duration, easing, delay, repeat, yoyo) {
        this._properties = this._parseProperties(properties);
        this.duration = duration;

        if (easing) this.easing = easing;
        if (delay) {
            this.delay(delay);
        }
        if (repeat) {
            this.repeat(repeat);
        }

        if (yoyo) {
            this.yoyo(yoyo);
        }

        return this;
    }

    from(properties, duration, easing, delay, repeat, yoyo) {
        this._properties = this._parseProperties(properties);
        this.duration = duration;

        if (easing) this.easing = easing;
        if (delay) {
            this.delay(delay);
        }
        if (repeat) {
            this.repeat(repeat);
        }

        if (yoyo) {
            this.yoyo(yoyo);
        }

        this._from = true;

        return this;
    }

    rotate(properties, duration, easing, delay, repeat, yoyo) {
        this._properties = this._parseProperties(properties);

        this.duration = duration;

        if (easing) this.easing = easing;
        if (delay) {
            this.delay(delay);
        }
        if (repeat) {
            this.repeat(repeat);
        }

        if (yoyo) {
            this.yoyo(yoyo);
        }

        this._slerp = true;

        return this;
    }

    start() {
        let prop, _x, _y, _z;

        this.playing = true;
        this.complete = false;
        this.stopped = false;
        this._count = 0;
        this.pending = (this._delay > 0);

        if (this._reverse && !this.pending) {
            this.time = this.duration;
        } else {
            this.time = 0;
        }

        if (this._from) {
            for (prop in this._properties) {
                if (this._properties.hasOwnProperty(prop)) {
                    this._sv[prop] = this._properties[prop];
                    this._ev[prop] = this.target[prop];
                }
            }

            if (this._slerp) {
                this._toQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z);

                _x = this._properties.x !== undefined ? this._properties.x : this.target.x;
                _y = this._properties.y !== undefined ? this._properties.y : this.target.y;
                _z = this._properties.z !== undefined ? this._properties.z : this.target.z;
                this._fromQuat.setFromEulerAngles(_x, _y, _z);
            }
        } else {
            for (prop in this._properties) {
                if (this._properties.hasOwnProperty(prop)) {
                    this._sv[prop] = this.target[prop];
                    this._ev[prop] = this._properties[prop];
                }
            }

            if (this._slerp) {
                _x = this._properties.x !== undefined ? this._properties.x : this.target.x;
                _y = this._properties.y !== undefined ? this._properties.y : this.target.y;
                _z = this._properties.z !== undefined ? this._properties.z : this.target.z;

                if (this._properties.w !== undefined) {
                    this._fromQuat.copy(this.target);
                    this._toQuat.set(_x, _y, _z, this._properties.w);
                } else {
                    this._fromQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z);
                    this._toQuat.setFromEulerAngles(_x, _y, _z);
                }
            }
        }

        // set delay
        this._currentDelay = this._delay;

        // add to manager when started
        this.manager.add(this);

        return this;
    }

    pause() {
        this.playing = false;
    }

    resume() {
        this.playing = true;
    }

    stop() {
        this.playing = false;
        this.stopped = true;
    }

    delay(delay) {
        this._delay = delay;
        this.pending = true;

        return this;
    }

    repeat(num, delay) {
        this._count = 0;
        this._numRepeats = num;
        if (delay) {
            this._repeatDelay = delay;
        } else {
            this._repeatDelay = 0;
        }

        return this;
    }

    loop(loop) {
        if (loop) {
            this._count = 0;
            this._numRepeats = Infinity;
        } else {
            this._numRepeats = 0;
        }

        return this;
    }

    yoyo(yoyo) {
        this._yoyo = yoyo;
        return this;
    }

    reverse() {
        this._reverse = !this._reverse;

        return this;
    }

    chain() {
        let n = arguments.length;

        while (n--) {
            if (n > 0) {
                arguments[n - 1]._chained = arguments[n];
            } else {
                this._chained = arguments[n];
            }
        }

        return this;
    }

    onUpdate(callback) {
        this.on('update', callback);
        return this;
    }

    onComplete(callback) {
        this.on('complete', callback);
        return this;
    }

    onLoop(callback) {
        this.on('loop', callback);
        return this;
    }

    update(dt) {
        if (this.stopped) return false;

        if (!this.playing) return true;

        if (!this._reverse || this.pending) {
            this.time += dt * this.timeScale;
        } else {
            this.time -= dt * this.timeScale;
        }

        // delay start if required
        if (this.pending) {
            if (this.time > this._currentDelay) {
                if (this._reverse) {
                    this.time = this.duration - (this.time - this._currentDelay);
                } else {
                    this.time -= this._currentDelay;
                }
                this.pending = false;
            } else {
                return true;
            }
        }

        let _extra = 0;
        if ((!this._reverse && this.time > this.duration) || (this._reverse && this.time < 0)) {
            this._count++;
            this.complete = true;
            this.playing = false;
            if (this._reverse) {
                _extra = this.duration - this.time;
                this.time = 0;
            } else {
                _extra = this.time - this.duration;
                this.time = this.duration;
            }
        }

        const elapsed = (this.duration === 0) ? 1 : (this.time / this.duration);

        // run easing
        const a = this.easing(elapsed);

        // increment property
        let s, e;
        for (const prop in this._properties) {
            if (this._properties.hasOwnProperty(prop)) {
                s = this._sv[prop];
                e = this._ev[prop];
                this.target[prop] = s + (e - s) * a;
            }
        }

        if (this._slerp) {
            this._quat.slerp(this._fromQuat, this._toQuat, a);
        }

        // if this is a entity property then we should dirty the transform
        if (this.entity) {
            this.entity._dirtifyLocal();

            // apply element property changes
            if (this.element && this.entity.element) {
                this.entity.element[this.element] = this.target;
            }

            if (this._slerp) {
                this.entity.setLocalRotation(this._quat);
            }
        }

        this.fire('update', dt);

        if (this.complete) {
            const repeat = this._repeat(_extra);
            if (!repeat) {
                this.fire('complete', _extra);
                if (this.entity) {
                    this.entity.off('destroy', this.stop, this);
                }
                if (this._chained) this._chained.start();
            } else {
                this.fire('loop');
            }

            return repeat;
        }

        return true;
    }

    _repeat(extra) {
        // test for repeat conditions
        if (this._count < this._numRepeats) {
            // do a repeat
            if (this._reverse) {
                this.time = this.duration - extra;
            } else {
                this.time = extra; // include overspill time
            }
            this.complete = false;
            this.playing = true;

            this._currentDelay = this._repeatDelay;
            this.pending = true;

            if (this._yoyo) {
                // swap start/end properties
                for (const prop in this._properties) {
                    const tmp = this._sv[prop];
                    this._sv[prop] = this._ev[prop];
                    this._ev[prop] = tmp;
                }

                if (this._slerp) {
                    this._quat.copy(this._fromQuat);
                    this._fromQuat.copy(this._toQuat);
                    this._toQuat.copy(this._quat);
                }
            }

            return true;
        }
        return false;
    }
}

const managers = new Map();

/**
 * Registers a tween manager with a playcanvas application, so that it will update with the
 * applications frame update.
 *
 * @param {AppBase} app - The playcanvas application to register with the Tween Manager
 * @returns {TweenManager} - The registered TweenManager
 */
const getTweenManager = (app) => {

    if (!app || !(app instanceof AppBase)) {
        throw new Error('`getTweenManager` expects an instance of `AppBase`');
    }

    if (!managers.has(app)) {
        const tweenManager = new TweenManager();
        managers.set(app, tweenManager);
        app.on('update', (dt) => {
            tweenManager.update(dt);
        });
        app.on('destroy', () => managers.delete(app));
    }

    return managers.get(app);
};

/**
 * Tweens an entities properties.
 *
 * @param {Entity} entity - The entity target to tween
 * @param {object} target - An object representing the properties to tween
 * @param {object} options - The tween options
 * @returns {Tween} - The tween instance
 *
 * @example
 * ```
 * tweenEntity(entity, entity.getLocalPosition)
 *  .to({x: 10, y: 0, z: 0}, 1, SineOut);
 * ```
 */
const tweenEntity = (entity, target, options) => {

    const tweenManager = getTweenManager(entity._app);
    const tween = new Tween(target, tweenManager);
    tween.entity = entity;

    entity.once('destroy', tween.stop, tween);

    if (options && options.element) {
        // specify a element property to be updated
        tween.element = options.element;
    }

    return tween;
};

/**
 * This function extends the `Entity` and `AppBase` class of PlayCanvas
 * with convenience methods such as `app.tween()` and `entity.tween()`.
 *
 * @param {{ AppBase, Entity }} pc - the playcanvas engine
 *
 * @example
 * ```
 * import * as pc from 'playcanvas'
 * addTweenExtensions(pc)
 * entity.tween(); // new utility method
 * app.tween(pc.Color(1, 0, 0))
 * ```
 */
const addTweenExtensions = ({ AppBase, Entity }) => {

    if (!AppBase) {
        throw new Error('The param `addExtensions` must contain the `AppBase` class. `addExtensions({ AppBase })`');
    }

    if (!Entity) {
        throw new Error('The param `addExtensions` must contain the `Entity` class. `addExtensions({ Entity })`');
    }

    // Add pc.AppBase#tween method
    AppBase.prototype.tween = function (target) {
        const tweenManager = getTweenManager(this);
        return new Tween(target, tweenManager);
    };

    // Add pc.Entity#tween method
    Entity.prototype.tween = function (target, options) {
        return tweenEntity(this, target, options);
    };
};

export { BackIn, BackInOut, BackOut, BounceIn, BounceInOut, BounceOut, CircularIn, CircularInOut, CircularOut, CubicIn, CubicInOut, CubicOut, ElasticIn, ElasticInOut, ElasticOut, ExponentialIn, ExponentialInOut, ExponentialOut, Linear, QuadraticIn, QuadraticInOut, QuadraticOut, QuarticIn, QuarticInOut, QuarticOut, QuinticIn, QuinticInOut, QuinticOut, SineIn, SineInOut, SineOut, addTweenExtensions, getTweenManager, tweenEntity };
