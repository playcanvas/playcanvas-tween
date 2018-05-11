var canvas = document.getElementById('application-canvas');
var app = new pc.Application (canvas);

QUnit.test( "hello test", function( assert ) {
    var e = new pc.Entity();
    app.root.addChild(e);


    e.tween(e.getLocalPosition()).to({x:10}, 0.1, pc.SineOut).start().on('complete', function () {
        assert(e.getLocalPosition().x, 10);
    });
});
