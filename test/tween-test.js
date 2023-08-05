// setup
var canvas = document.getElementById('application-canvas');
var app = new pc.Application(canvas);
app.addTweenManager();
app.start();

/**/
QUnit.module("Tween()");
/**/

QUnit.test("Tween Vec4 to Vec4", function (assert) {
    var done = assert.async();

    var e = new pc.Entity();
    app.root.addChild(e);

    var value = new pc.Vec4();
    var target = new pc.Vec4(10, 10, 10, 10);

    var tween = new pc.Tween(value, app._tweenManager);
    tween.to(target, 0.1, pc.SineOut)
        .on('complete', function () {
            assert.equal(value.x, 10);
            assert.equal(value.y, 10);
            assert.equal(value.z, 10);
            assert.equal(value.w, 10);
            done();
        }).start();
});


QUnit.test("Tween Vec3 to Vec3", function (assert) {
    var done = assert.async();

    var e = new pc.Entity();
    app.root.addChild(e);

    var value = new pc.Vec3();
    var target = new pc.Vec3(10, 10, 10);

    var tween = new pc.Tween(value, app._tweenManager);
    tween.to(target, 0.1, pc.SineOut)
        .on('complete', function () {
            assert.equal(value.x, 10);
            assert.equal(value.y, 10);
            assert.equal(value.z, 10);
            done();
        }).start();
});


QUnit.test("Tween Vec2 to Vec2", function (assert) {
    var done = assert.async();

    var e = new pc.Entity();
    app.root.addChild(e);

    var value = new pc.Vec2();
    var target = new pc.Vec2(10, 10);

    var tween = new pc.Tween(value, app._tweenManager);
    tween.to(target, 0.1, pc.SineOut)
        .on('complete', function () {
            assert.equal(value.x, 10);
            assert.equal(value.y, 10);
            done();
        }).start();
});

/**/
QUnit.module("entity.tween()");
/**/

QUnit.test("entity tween getLocalPosition.x", function (assert) {
    var done = assert.async();

    var e = new pc.Entity();
    app.root.addChild(e);
    e.tween(e.getLocalPosition()).to({ x: 10 }, 0.1, pc.SineOut).start().on('complete', function () {
        assert.equal(e.getLocalPosition().x, 10);
        e.destroy();
        done();
    });
});

QUnit.test("entity tween localPosition.x", function (assert) {
    var done = assert.async();

    var e = new pc.Entity();
    app.root.addChild(e);

    e.tween(e.localPosition).to({ x: 10 }, 0.1, pc.SineOut).start().on('complete', function () {
        assert.equal(e.getLocalPosition().x, 10);
        e.destroy();
        done();
    });
});

QUnit.test("entity tween getLocalPosition to Vec3", function (assert) {
    var done = assert.async();

    var e = new pc.Entity();
    app.root.addChild(e);

    var target = new pc.Vec3(10, 10, 10);

    e.tween(e.getLocalPosition()).to(target, 0.1, pc.SineOut).start().on('complete', function () {
        assert.equal(e.getLocalPosition().x, 10);
        assert.equal(e.getLocalPosition().y, 10);
        assert.equal(e.getLocalPosition().z, 10);
        e.destroy();
        done();
    });
});


QUnit.test("entity tween element color", function (assert) {
    var done = assert.async();

    var e = new pc.Entity();
    e.addComponent("element", {
        type: "image"
    });
    app.root.addChild(e);

    var target = new pc.Color(0.5, 0.5, 0.5, 0.5);

    e.tween(e.element.color, { element: 'color' }).to(target, 0.1, pc.SineOut).start().on('complete', function () {
        assert.equal(e.element.color.r, 0.5);
        assert.equal(e.element.color.g, 0.5);
        assert.equal(e.element.color.b, 0.5);
        assert.equal(e.element.color.a, 0.5);
        e.destroy();
        done();
    });
});


QUnit.test("entity tween.rotate getLocalEulerAngles", function (assert) {
    var done = assert.async();

    var e = new pc.Entity();
    e.addComponent("element", {
        type: "image"
    });
    app.root.addChild(e);

    var target = new pc.Vec3(0, 0, 180);

    e.tween(e.getLocalEulerAngles()).rotate(target, 0.1, pc.SineOut).start().on('complete', function () {
        assert.equal(e.getLocalEulerAngles().x, target.x);
        assert.equal(e.getLocalEulerAngles().y, target.y);
        assert.equal(e.getLocalEulerAngles().z, target.z);
        e.destroy();
        done();
    });
});
