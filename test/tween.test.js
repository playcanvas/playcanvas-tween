import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { Entity, Vec2, Vec3, Vec4 } from 'playcanvas';
import * as pc from 'playcanvas';

import { createApp } from './utils/create-app.js';
import { jsdomSetup, jsdomTeardown } from './utils/jsdom.js';
import { SineOut } from '../src/easing.js';
import { getTweenManager, addTweenExtensions } from '../src/index.js';
import { Tween } from '../src/tween.js';


describe('Tween()', () => {

    let app, tweenManager;

    beforeEach(() => {
        jsdomSetup();
        app = createApp();
        tweenManager = getTweenManager(app);
        app.start();
    });

    afterEach(() => {
        app?.destroy();
        app = null;
        jsdomTeardown();
    });

    it('Tween Vec4 to Vec4', (done) => {
        const e = new Entity();
        app.root.addChild(e);

        const value = new Vec4();
        const target = new Vec4(10, 10, 10, 10);

        const tween = new Tween(value, tweenManager);
        tween.to(target, 0.1, SineOut);
        tween.onComplete(() => {
            expect(value.y).to.equal(10);
            expect(value.z).to.equal(10);
            expect(value.w).to.equal(10);
            done();
        });
        tween.start();
    });

    it('Tween Vec3 to Vec3', (done) => {
        const e = new Entity();
        app.root.addChild(e);

        const value = new Vec3();
        const target = new Vec3(10, 10, 10);

        const tween = new Tween(value, tweenManager);
        tween.to(target, 0.1, SineOut)
        .onComplete(() => {
            expect(value.x).to.equal(10);
            expect(value.y).to.equal(10);
            expect(value.z).to.equal(10);
            done();
        })
        .start();
    });

    it('Tween Vec2 to Vec2', (done) => {
        const e = new Entity();
        app.root.addChild(e);

        const value = new Vec2();
        const target = new Vec2(10, 10);

        const tween = new Tween(value, tweenManager);
        tween.to(target, 0.1, SineOut)
        .onComplete(() => {
            expect(value.x).to.equal(10);
            expect(value.y).to.equal(10);
            done();
        })
        .start();
    });
});

describe('entity.tween()', () => {

    let app;
    addTweenExtensions(pc);

    beforeEach(() => {
        jsdomSetup();
        app = createApp();
        app.start();
    });

    afterEach(() => {
        app?.destroy();
        app = null;
        jsdomTeardown();
    });

    it('entity tween getLocalPosition.x', (done) => {
        const e = new Entity();
        app.root.addChild(e);
        e.tween(e.getLocalPosition())
        .to({ x: 10 }, 0.1, SineOut)
        .start()
        .onComplete(() => {
            expect(e.getLocalPosition().x).to.equal(10);
            e.destroy();
            done();
        });
    });

    it('entity tween localPosition.x', (done) => {
        const e = new Entity();
        app.root.addChild(e);

        e.tween(e.localPosition)
        .to({ x: 10 }, 0.1, SineOut)
        .start()
        .onComplete(() => {
            expect(e.getLocalPosition().x).to.equal(10);
            e.destroy();
            done();
        });
    });

    it('entity tween getLocalPosition to Vec3', (done) => {
        const e = new Entity();
        app.root.addChild(e);

        const target = new Vec3(10, 10, 10);

        e.tween(e.getLocalPosition())
        .to(target, 0.1, SineOut)
        .start()
        .onComplete(() => {
            expect(e.getLocalPosition().x).to.equal(10);
            expect(e.getLocalPosition().y).to.equal(10);
            expect(e.getLocalPosition().z).to.equal(10);
            e.destroy();
            done();
        });
    });

    it('entity tween element color', (done) => {
        const e = new Entity();
        e.addComponent('element', {
            type: 'image'
        });
        app.root.addChild(e);

        const target = new pc.Color(0.5, 0.5, 0.5, 0.5);

        e.tween(e.element.color, { element: 'color' })
        .to(target, 0.1, SineOut)
        .start()
        .onComplete(() => {
            expect(e.element.color.r).to.equal(0.5);
            expect(e.element.color.g).to.equal(0.5);
            expect(e.element.color.b).to.equal(0.5);
            expect(e.element.color.a).to.equal(0.5);
            e.destroy();
            done();
        });
    });

    it('entity tween.rotate getLocalEulerAngles', (done) => {
        const e = new Entity();
        e.addComponent('element', {
            type: 'image'
        });
        app.root.addChild(e);

        const target = new pc.Vec3(0, 0, 180);

        e.tween(e.getLocalEulerAngles())
        .rotate(target, 0.1, SineOut)
        .start()
        .onComplete(() => {
            expect(e.getLocalEulerAngles().x).to.equal(target.x);
            expect(e.getLocalEulerAngles().y).to.equal(target.y);
            expect(e.getLocalEulerAngles().z).to.equal(target.z);
            e.destroy();
            done();
        });
    });
});
