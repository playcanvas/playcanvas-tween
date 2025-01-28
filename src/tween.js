import { EventHandler, Quat, Vec2, Vec3, Vec4, Color } from 'playcanvas';

import { Linear } from './easing.js';

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

export { Tween };
