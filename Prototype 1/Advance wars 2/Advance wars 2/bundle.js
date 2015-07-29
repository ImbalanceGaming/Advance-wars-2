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
    var Canvas = (function () {
        function Canvas(canvas) {
            this.canvas = canvas;
            this.clickEvent = [];
            var self = this;
            this.canvas.onclick = function (mouseEvent) {
                self.clickPoint = new AdvanceWars.Point(mouseEvent.offsetX, mouseEvent.offsetY);
                self.click = true;
            };
        }
        Canvas.prototype.Update = function () {
            var _this = this;
            if (this.click) {
                this.clickEvent.forEach(function (func) {
                    func(_this.clickPoint);
                    //func();
                });
                this.click = false;
            }
        };
        return Canvas;
    })();
    AdvanceWars.Canvas = Canvas;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var Rectangle = (function () {
        function Rectangle(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Rectangle.prototype.Contains = function (point) {
            return this.x <= point.x && this.y <= point.y && this.x + this.width >= point.x && this.y + this.height >= point.y;
        };
        return Rectangle;
    })();
    AdvanceWars.Rectangle = Rectangle;
})(AdvanceWars || (AdvanceWars = {}));
///<reference path='Rectangle.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AdvanceWars;
(function (AdvanceWars) {
    var ClickableRectangle = (function (_super) {
        __extends(ClickableRectangle, _super);
        //get click(): any {
        //    return this._click;
        //}
        //set click(clickFunction: any) {
        //    var index = Game.canvas.clickEvent.indexOf(this._click);
        //    if (index != -1)
        //        Game.canvas.clickEvent.splice(index, 1);
        //    Game.canvas.clickEvent.push(clickFunction);
        //    this._click = clickFunction;
        //}
        function ClickableRectangle(x, y, width, height) {
            _super.call(this, x, y, width, height);

            var self = this;
            this.getClickedFunction = function (point) {
                if (self.click != null && self.Contains(point))
                    self.click();
            };
            AdvanceWars.Game.canvas.clickEvent.push(this.getClickedFunction);
        }
        ClickableRectangle.prototype.Dispose = function () {
            var index = AdvanceWars.Game.canvas.clickEvent.indexOf(this.getClickedFunction);
            AdvanceWars.Game.canvas.clickEvent.splice(index, 1);
        };
        return ClickableRectangle;
    })(AdvanceWars.Rectangle);
    AdvanceWars.ClickableRectangle = ClickableRectangle;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var ClickAction = (function () {
        function ClickAction(rectangle, funct) {
            this.rectangle = rectangle;
            this.funct = funct;
        }
        return ClickAction;
    })();
    AdvanceWars.ClickAction = ClickAction;
})(AdvanceWars || (AdvanceWars = {}));
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
var AdvanceWars;
(function (AdvanceWars) {
    var Game = (function () {
        function Game() {
            var _this = this;
            this.fps = 30;
            this.gameTime = 0;
            this.gameObjects = [];
            Game.current = this;
            this.timeStep = Math.floor(1000 / this.fps);
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext("2d");

            this.intervalId = setInterval(function () {
                _this.gameLoop(_this);
            }, this.timeStep);

            this.canvasLocal = new AdvanceWars.Canvas(this.canvas);
            Game.canvas = this.canvasLocal;

            // temp
            this.map = new AdvanceWars.GameMap("dude");
            // temp
        }
        Game.prototype.gameLoop = function (gameObject) {
            this.gameTime += this.timeStep;
            this.update(this.gameTime);
            this.draw(this.gameTime);
        };

        Game.prototype.update = function (gameTime) {
            this.canvasLocal.Update();
            this.map.Update(gameTime);
            for (var i = 0; i < this.gameObjects.length; i++)
                if (this.gameObjects[i] == null) {
                    this.gameObjects.splice(i, 1);
                    i--;
                }
            this.gameObjects.forEach(function (o) {
                o.Update(gameTime);
            });
        };

        Game.prototype.draw = function (gameTime) {
            var _this = this;
            this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
            this.map.Draw(this.ctx, gameTime);
            this.gameObjects.forEach(function (o) {
                o.Draw(_this.ctx, gameTime);
            });
        };
        return Game;
    })();
    AdvanceWars.Game = Game;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var GameMap = (function () {
        function GameMap(name) {
            this.tiles = [];
            this.name = name;
            this.initMap();
        }
        GameMap.prototype.Update = function (gameTime) {
            this.tiles.forEach(function (a) {
                a.forEach(function (tile) {
                    tile.Update(gameTime);
                });
            });
        };

        GameMap.prototype.Draw = function (ctx, gameTime) {
            this.tiles.forEach(function (a) {
                a.forEach(function (tile) {
                    tile.Draw(ctx, gameTime);
                });
            });
        };

        GameMap.prototype.initMap = function () {
            for (var x = 0; x < 10; x++) {
                this.tiles.push([]);
                for (var y = 0; y < 10; y++) {
                    this.tiles[x].push(new AdvanceWars.Tile("normal", new AdvanceWars.Point(x, y)));
                }
            }
        };
        return GameMap;
    })();
    AdvanceWars.GameMap = GameMap;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var MoveTile = (function () {
        function MoveTile(tile, unit, previous, collection, distance) {
            if (typeof distance === "undefined") { distance = 0; }
            this.tile = tile;
            this.unit = unit;
            this.previous = previous;
            this.collection = collection;
            this.distance = distance;
            this.rectangle = new AdvanceWars.ClickableRectangle(tile.position.x, tile.position.y, 50, 50);
            var self = this;
            this.rectangle.click = function () {
                self.Move(self);
            };
            var image = new Image();
            image.src = "assets/images/move.png";
            this.animation = new AdvanceWars.Animation(image, 50, 50, this.rectangle, 1, 1000);
        }
        MoveTile.prototype.Update = function (gametime) {
            this.animation.Update(gametime);
        };

        MoveTile.prototype.Draw = function (ctx, gametime) {
            this.animation.Draw(ctx, gametime);
        };

        MoveTile.prototype.Move = function (self) {
            self.collection.Move(self);
        };

        MoveTile.prototype.Dispose = function () {
            this.rectangle.Dispose();
        };
        return MoveTile;
    })();
    AdvanceWars.MoveTile = MoveTile;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var MoveTileCollection = (function () {
        function MoveTileCollection(unit) {
            this.unit = unit;
            this.moveTiles = [];
            var firstMoveTile = new AdvanceWars.MoveTile(unit.tile, unit, null, this, 0);
            var explore = [firstMoveTile];
            var explored = [];
            for (var i = 0; i < AdvanceWars.Game.current.map.tiles.length; i++) {
                explored.push([]);
                for (var j = 0; j < AdvanceWars.Game.current.map.tiles[i].length; j++)
                    explored[i].push(9999);
            }

            while (explore.length > 0) {
                // sort
                var exploreTile = explore.pop();
                this.Scout(exploreTile, this.moveTiles, explore, explored);
                explore.sort(function (t1, t2) {
                    return t2.previous.distance - t1.previous.distance;
                });
            }
        }
        // TODO: Needs refactoring
        MoveTileCollection.prototype.Scout = function (moveTile, moveTiles, explore, explored) {
            var _this = this;
            var distance = moveTile.previous == null ? 0 : moveTile.previous.distance + 1;
            if (distance <= this.unit.moveSpeed && distance < explored[moveTile.tile.index.x][moveTile.tile.index.y]) {
                explored[moveTile.tile.index.x][moveTile.tile.index.y] = distance;
                moveTile.distance = distance;
                moveTiles.push(moveTile);
                var adjacentTiles = moveTile.tile.GetAdjacentTiles();
                adjacentTiles.forEach(function (t) {
                    explore.push(new AdvanceWars.MoveTile(t, _this.unit, moveTile, _this));
                });
            } else {
                moveTile.Dispose();
            }
        };

        MoveTileCollection.prototype.Dispose = function () {
            this.moveTiles.forEach(function (m) {
                m.Dispose();
            });
            var i = AdvanceWars.Game.current.gameObjects.indexOf(this);
            AdvanceWars.Game.current.gameObjects[i] = null;
        };

        MoveTileCollection.prototype.Update = function (gametime) {
            this.moveTiles.forEach(function (m) {
                return m.Update(gametime);
            });
        };
        MoveTileCollection.prototype.Draw = function (ctx, gametime) {
            this.moveTiles.forEach(function (m) {
                return m.Draw(ctx, gametime);
            });
        };

        MoveTileCollection.prototype.Move = function (moveTile) {
            var moveTileCurrent = moveTile;
            var path = [moveTile.tile];
            while (moveTileCurrent.previous != null) {
                path.push(moveTileCurrent.previous.tile);
                moveTileCurrent = moveTileCurrent.previous;
            }
            this.unit.Move(path);
            this.Dispose();
        };
        return MoveTileCollection;
    })();
    AdvanceWars.MoveTileCollection = MoveTileCollection;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var Tile = (function () {
        function Tile(type, index) {
            this.type = type;
            this.index = index;
            this.position = new AdvanceWars.Point(index.x * 50, index.y * 50);

            // temp
            var random = Math.random() * 100;

            if (random < 5)
                this.unit = new AdvanceWars.Unit("soldier", this);
            // temp
        }
        Tile.prototype.Update = function (gameTime) {
            if (this.animationList != null)
                this.animationList.Update(gameTime);
            if (this.unit != null)
                this.unit.Update(gameTime);
        };

        Tile.prototype.Draw = function (ctx, gameTime) {
            if (this.animationList != null)
                this.animationList.Draw(ctx, gameTime);
            if (this.unit != null)
                this.unit.Draw(ctx, gameTime);
        };

        Tile.prototype.GetAdjacentTiles = function () {
            var tiles = [];

            if (this.index.x - 1 >= 0)
                tiles.push(AdvanceWars.Game.current.map.tiles[this.index.x - 1][this.index.y]);
            if (this.index.y - 1 >= 0)
                tiles.push(AdvanceWars.Game.current.map.tiles[this.index.x][this.index.y - 1]);
            if (this.index.x + 1 < AdvanceWars.Game.current.map.tiles.length)
                tiles.push(AdvanceWars.Game.current.map.tiles[this.index.x + 1][this.index.y]);
            if (this.index.y + 1 < AdvanceWars.Game.current.map.tiles[0].length)
                tiles.push(AdvanceWars.Game.current.map.tiles[this.index.x][this.index.y + 1]);

            return tiles;
        };
        return Tile;
    })();
    AdvanceWars.Tile = Tile;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var Unit = (function () {
        function Unit(type, tile) {
            this.type = type;
            this.tile = tile;
            this.moveSpeed = 2;
            this.moveSpeedAnimation = 10;
            this.state = "iddle";
            this.currentAnimation = "iddle";
            this.rectangle = new AdvanceWars.ClickableRectangle(tile.position.x, tile.position.y, 50, 50);
            this.animationList = new AdvanceWars.AnimationList();
            var self = this;
            this.rectangle.click = function () {
                self.CreateMoveTiles(self);
            };
            var image = new Image();
            image.src = "assets/images/infantry_iddle.png";
            this.animationList.animations["iddle"] = new AdvanceWars.Animation(image, 64, 16, this.rectangle, 4, 1000);
            var image2 = new Image();
            image2.src = "assets/images/infantry_move_left.png";
            this.animationList.animations["moveLeft"] = new AdvanceWars.Animation(image2, 68, 17, this.rectangle, 4, 1000);
            var image3 = new Image();
            image3.src = "assets/images/infantry_move_right.png";
            this.animationList.animations["moveRight"] = new AdvanceWars.Animation(image3, 68, 17, this.rectangle, 4, 1000);
            this.animationList.PlayAnimation("iddle");
        }
        Unit.prototype.Update = function (gameTime) {
            if (this.animationList != null)
                this.animationList.Update(gameTime);

            switch (this.state) {
                case "iddle":
                    break;
                case "moving":
                    this.MoveAnimation();
                    break;
                default:
            }
        };

        Unit.prototype.Draw = function (ctx, gameTime) {
            if (this.animationList != null)
                this.animationList.Draw(ctx, gameTime);
        };

        Unit.prototype.GetReachableTiles = function () {
            var index = this.tile.index;
            var reachableTiles = [AdvanceWars.Game.current.map.tiles[index.x + 1][index.y]];

            return reachableTiles;
        };

        Unit.prototype.CreateMoveTiles = function (self) {
            AdvanceWars.Game.current.gameObjects.push(new AdvanceWars.MoveTileCollection(self));
        };

        Unit.prototype.Move = function (tiles) {
            this.tile.unit = null;
            this.tile = tiles[0];
            this.path = tiles;
            this.state = "moving";
            this.tile.unit = this;
        };

        Unit.prototype.MoveAnimation = function () {
            if (this.path.length == 0) {
                this.state = "iddle";
                this.currentAnimation = "iddle";
                this.animationList.PlayAnimation("iddle");
                return;
            }

            var desinationTile = this.path[this.path.length - 1];
            var distance = 0;
            if ((distance = this.rectangle.x - desinationTile.position.x) < 0) {
                this.rectangle.x += Math.min(this.moveSpeedAnimation, Math.abs(distance));
                if (this.currentAnimation != "moveRight") {
                    this.currentAnimation = "moveRight";
                    this.animationList.PlayAnimation("moveRight");
                }
            } else if ((distance = this.rectangle.x - desinationTile.position.x) > 0) {
                this.rectangle.x -= Math.min(this.moveSpeedAnimation, Math.abs(distance));
                this.animationList.PlayAnimation("moveLeft");
                if (this.currentAnimation != "moveLeft") {
                    this.currentAnimation = "moveLeft";
                    this.animationList.PlayAnimation("moveLeft");
                }
            } else if ((distance = this.rectangle.y - desinationTile.position.y) < 0) {
                this.rectangle.y += Math.min(this.moveSpeedAnimation, Math.abs(distance));
            } else if ((distance = this.rectangle.y - desinationTile.position.y) > 0) {
                this.rectangle.y -= Math.min(this.moveSpeedAnimation, Math.abs(distance));
            }

            if (this.rectangle.x == desinationTile.position.x && this.rectangle.y == desinationTile.position.y)
                this.path.pop();
        };

        Unit.prototype.Dispose = function () {
            this.rectangle.Dispose();
        };
        return Unit;
    })();
    AdvanceWars.Unit = Unit;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var ActionPhase = (function () {
        function ActionPhase() {
        }
        return ActionPhase;
    })();
    AdvanceWars.ActionPhase = ActionPhase;
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
        AnimatedSpriteStripObject.prototype.Update = function (gameTime) {
            this.previousTime = this.currentTime;
            this.currentTime = gameTime;
            var elapsedTime = this.currentTime - this.previousTime;
            this.currentAnimationTime = (this.currentAnimationTime + elapsedTime) % this.duration;
            this.currentFrame = Math.floor(this.frames * (this.currentAnimationTime / this.duration));
        };

        AnimatedSpriteStripObject.prototype.Draw = function (ctx, gameTime) {
            ctx.drawImage(this.image, this.frameWidth * this.currentFrame, 0, this.frameWidth, this.frameHeight, this.position.x, this.position.y, this.frameWidth, this.frameHeight);
        };

        AnimatedSpriteStripObject.prototype.Reset = function () {
            this.currentAnimationTime = 0;
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
///<reference path='SpriteObject.ts' />
var AdvanceWars;
(function (AdvanceWars) {
    var Animation = (function () {
        function Animation(image, width, height, rectangle, frames, duration, loop) {
            if (typeof loop === "undefined") { loop = false; }
            this.image = image;
            this.width = width;
            this.height = height;
            this.rectangle = rectangle;
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
        Animation.prototype.Update = function (gameTime) {
            this.previousTime = this.currentTime;
            this.currentTime = gameTime;
            var elapsedTime = this.currentTime - this.previousTime;
            this.currentAnimationTime = (this.currentAnimationTime + elapsedTime) % this.duration;
            this.currentFrame = Math.floor(this.frames * (this.currentAnimationTime / this.duration));
        };

        Animation.prototype.Draw = function (ctx, gameTime) {
            ctx.drawImage(this.image, this.frameWidth * this.currentFrame, 0, this.frameWidth, this.frameHeight, this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        };

        Animation.prototype.Reset = function () {
            this.currentAnimationTime = 0;
        };
        return Animation;
    })();
    AdvanceWars.Animation = Animation;
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
var AdvanceWars;
(function (AdvanceWars) {
    var AnimationList = (function () {
        function AnimationList(animations) {
            if (typeof animations === "undefined") { animations = []; }
            this.animations = animations;
        }
        AnimationList.prototype.PlayAnimation = function (animation) {
            this.currentAnimation = this.animations[animation];
            this.currentAnimation.Reset();
        };

        AnimationList.prototype.Update = function (gameTime) {
            if (this.currentAnimation != null)
                this.currentAnimation.Update(gameTime);
        };

        AnimationList.prototype.Draw = function (ctx, gameTime) {
            if (this.currentAnimation != null)
                this.currentAnimation.Draw(ctx, gameTime);
        };
        return AnimationList;
    })();
    AdvanceWars.AnimationList = AnimationList;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var Move = (function () {
        function Move() {
        }
        return Move;
    })();
    AdvanceWars.Move = Move;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var Phase = (function () {
        function Phase() {
        }
        return Phase;
    })();
    AdvanceWars.Phase = Phase;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var Presentation = (function () {
        function Presentation() {
            var canvas = document.getElementById("canvas");
            this.ctx = canvas.getContext("2d");
        }
        Presentation.prototype.Update = function () {
        };

        Presentation.prototype.Draw = function (game) {
        };
        return Presentation;
    })();
    AdvanceWars.Presentation = Presentation;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var Select = (function () {
        function Select() {
        }
        return Select;
    })();
    AdvanceWars.Select = Select;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var UI = (function () {
        function UI() {
        }
        return UI;
    })();
    AdvanceWars.UI = UI;
})(AdvanceWars || (AdvanceWars = {}));
//# sourceMappingURL=bundle.js.map
