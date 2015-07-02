var AdvanceWars;
(function (AdvanceWars) {
    var Greeter = (function () {
        function Greeter(element) {
            this.element = element;
            this.element.innerHTML += "The time is: ";
            this.span = document.createElement('span');
            this.element.appendChild(this.span);
            this.span.innerText = new Date().toUTCString();
        }
        Greeter.prototype.start = function () {
            var _this = this;
            this.timerToken = setInterval(function () {
                return _this.span.innerHTML = new Date().toUTCString();
            }, 500);
        };

        Greeter.prototype.stop = function () {
            clearTimeout(this.timerToken);
        };
        return Greeter;
    })();
    AdvanceWars.Greeter = Greeter;

    window.onload = function () {
        var el = document.getElementById('content');
        var greeter = new Greeter(el);
        greeter.start();
        var game = new AdvanceWars.Game();
    };
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var Game = (function () {
        function Game() {
            var _this = this;
            this.fps = 30;
            this.gameTime = 0;
            this.timeStep = Math.floor(1000 / this.fps);

            this.map = new AdvanceWars.GameMap("joost");
            var canvas = document.getElementById("canvas");
            this.ctx = canvas.getContext("2d");

            var image = new Image();
            image.src = "assets/images/test.png";
            var image2 = new Image();
            image2.src = "assets/images/strip.png";
            this.unit1 = new AdvanceWars.SpriteObject(new AdvanceWars.Point(0, 0), image, 0, 0);
            this.unit2 = new AdvanceWars.AnimatedSpriteStripObject(new AdvanceWars.Point(0, 0), image2, 640, 64, 10, 1000, true);

            this.intervalId = setInterval(function () {
                _this.gameLoop(_this);
            }, this.timeStep);
        }
        Game.prototype.gameLoop = function (gameObject) {
            this.gameTime += this.timeStep;
            this.update(this.gameTime);
            this.draw(this.gameTime);
        };

        Game.prototype.update = function (gameTime) {
            console.log("update");
            this.unit2.update(this.gameTime);
        };

        Game.prototype.draw = function (gameTime) {
            this.unit2.draw(this.ctx, this.gameTime);
        };
        return Game;
    })();
    AdvanceWars.Game = Game;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var GameMap = (function () {
        function GameMap(name) {
            this.name = name;
        }
        return GameMap;
    })();
    AdvanceWars.GameMap = GameMap;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var SpriteObject = (function () {
        function SpriteObject(position, image, width, height) {
            this.position = position;
            this.image = image;
            this.width = width;
            this.height = height;
        }
        SpriteObject.prototype.draw = function (ctx, gameTime) {
            ctx.drawImage(this.image, this.position.x, this.position.y);
        };
        return SpriteObject;
    })();
    AdvanceWars.SpriteObject = SpriteObject;
})(AdvanceWars || (AdvanceWars = {}));
///<reference path='SpriteObject.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AdvanceWars;
(function (AdvanceWars) {
    var AnimatedSpriteStripObject = (function (_super) {
        __extends(AnimatedSpriteStripObject, _super);
        function AnimatedSpriteStripObject(position, image, width, height, frames, duration, loop) {
            if (typeof loop === "undefined") { loop = false; }
            _super.call(this, position, image, width, height);
            this.frames = frames;
            this.duration = duration;
            this.loop = loop;
            this.currentTime = 0;
            this.previousTime = 0;
            this.currentAnimationTime = 0;
            this.currentFrame = 0;
            this.frameWidth = width / frames;
            this.frameHeight = height;
        }
        AnimatedSpriteStripObject.prototype.update = function (gameTime) {
            this.previousTime = this.currentTime;
            this.currentTime = gameTime;
            var elapsedTime = this.currentTime - this.previousTime;
            this.currentAnimationTime = (this.currentAnimationTime + elapsedTime) % this.duration;
            this.currentFrame = Math.floor(this.frames * (this.currentAnimationTime / this.duration));
        };

        AnimatedSpriteStripObject.prototype.draw = function (ctx, gameTime) {
            ctx.drawImage(this.image, this.frameWidth * this.currentFrame, 0, this.frameWidth, this.frameHeight, this.position.x, this.position.y, this.frameWidth, this.frameHeight);
        };
        return AnimatedSpriteStripObject;
    })(AdvanceWars.SpriteObject);
    AdvanceWars.AnimatedSpriteStripObject = AnimatedSpriteStripObject;
})(AdvanceWars || (AdvanceWars = {}));
/*
frames : number;
firstFrame : point;
frameWidth : number;
frameHeight : number;
frameRows : number;
frameCollums : number;
duration : number;
loop: bool;
*/
var CanvasImage = (function () {
    function CanvasImage(url) {
        this.url = url;
    }
    return CanvasImage;
})();
var AdvanceWars;
(function (AdvanceWars) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    })();
    AdvanceWars.Point = Point;
})(AdvanceWars || (AdvanceWars = {}));
//# sourceMappingURL=bundle.js.map
