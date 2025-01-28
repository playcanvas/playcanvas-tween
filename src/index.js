import { AppBase } from 'playcanvas';

import { TweenManager } from './tween-manager.js';
import { Tween } from './tween.js';
export * from './easing.js';

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
        throw new Error('`addTweenManager` expects an instance of ``AppBase`');
    }

    if (!managers.has(app)) {
        const tweenManager = new TweenManager();
        managers.set(app, tweenManager);
        app.on('update', dt => tweenManager.update(dt));
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
export const tweenEntity = (entity, target, options) => {

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
export const addTweenExtensions = ({ AppBase, Entity }) => {

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
