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
            this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
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
            var self = this;
            this.canvas.onclick = function (mouseEvent) {
                self.clickPoint = new AdvanceWars.Point(mouseEvent.offsetX, mouseEvent.offsetY);
                self.click = true;
            };
        }
        Canvas.prototype.Update = function () {
            if (this.click) {
                this.clicked = true;
                this.clickedAt = this.clickPoint;
                this.click = false;
            }
            else {
                this.clicked = false;
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AdvanceWars;
(function (AdvanceWars) {
    var ClickableRectangle = (function (_super) {
        __extends(ClickableRectangle, _super);
        function ClickableRectangle(x, y, width, height) {
            _super.call(this, x, y, width, height);
        }
        ClickableRectangle.prototype.update = function (gameTime) {
            if (AdvanceWars.Game.canvas.clicked && this.Contains(AdvanceWars.Game.canvas.clickedAt)) {
                this.click();
            }
        };
        ClickableRectangle.prototype.Dispose = function () {
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
        Point.prototype.minus = function (point) {
            return new Point(this.x - point.x, this.y - point.y);
        };
        Point.prototype.plus = function (point) {
            return new Point(this.x + point.x, this.y + point.y);
        };
        Point.prototype.multiply = function (point) {
            return new Point(this.x * point.x, this.y * point.y);
        };
        Point.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
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
            this.intervalId = setInterval(function () { _this.gameLoop(_this); }, this.timeStep);
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
            this.gameObjects.forEach(function (o) { o.Update(gameTime); });
        };
        Game.prototype.draw = function (gameTime) {
            var _this = this;
            this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
            this.map.Draw(this.ctx, gameTime);
            this.gameObjects.forEach(function (o) { o.Draw(_this.ctx, gameTime); });
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
            this.tiles.forEach(function (a) { a.forEach(function (tile) { tile.Update(gameTime); }); });
        };
        GameMap.prototype.Draw = function (ctx, gameTime) {
            this.tiles.forEach(function (a) { a.forEach(function (tile) { tile.Draw(ctx, gameTime); }); });
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
            if (distance === void 0) { distance = 0; }
            this.tile = tile;
            this.unit = unit;
            this.previous = previous;
            this.collection = collection;
            this.distance = distance;
            this.rectangle = new AdvanceWars.ClickableRectangle(tile.position.x, tile.position.y, 50, 50);
            var self = this;
            this.rectangle.click = function () { self.Move(self); };
            var image = new Image();
            image.src = "assets/images/move.png";
            this.animation = new AdvanceWars.Animation(image, 50, 50, this.rectangle, 1, 1000);
        }
        MoveTile.prototype.Update = function (gametime) {
            this.animation.Update(gametime);
            this.rectangle.update(gametime);
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
        function MoveTileCollection(unit, moveAction) {
            this.unit = unit;
            this.moveAction = moveAction;
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
                explore.sort(function (t1, t2) { return t2.previous.distance - t1.previous.distance; });
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
            }
            else {
                moveTile.Dispose();
            }
        };
        MoveTileCollection.prototype.Dispose = function () {
            this.moveTiles.forEach(function (m) { m.Dispose(); });
        };
        MoveTileCollection.prototype.Update = function (gametime) {
            this.moveTiles.forEach(function (m) { return m.Update(gametime); });
        };
        MoveTileCollection.prototype.Draw = function (ctx, gametime) {
            this.moveTiles.forEach(function (m) { return m.Draw(ctx, gametime); });
        };
        MoveTileCollection.prototype.Move = function (moveTile) {
            var moveTileCurrent = moveTile;
            var path = [moveTile.tile];
            while (moveTileCurrent.previous != null) {
                path.push(moveTileCurrent.previous.tile);
                moveTileCurrent = moveTileCurrent.previous;
            }
            path.reverse();
            this.Dispose();
            this.moveAction(path);
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
            if (this.position.x == 0 && this.position.y == 0)
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
    var BehaviorTree = (function () {
        function BehaviorTree() {
        }
        BehaviorTree.prototype.activate = function () {
            this.active = true;
            this.current = this.root;
            this.current.instantiate();
        };
        BehaviorTree.prototype.update = function (gameTime) {
            if (this.active)
                this.current.update(gameTime);
        };
        BehaviorTree.prototype.draw = function (ctx, gameTime) {
            if (this.active)
                this.current.draw(ctx, gameTime);
        };
        return BehaviorTree;
    })();
    AdvanceWars.BehaviorTree = BehaviorTree;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var NormalMove = (function () {
        function NormalMove(unit, behaviourTree, northAnimation, eastAnimation, southAnimation, westAnimation, iddleAnimation) {
            this.unit = unit;
            this.behaviourTree = behaviourTree;
            this.northAnimation = northAnimation;
            this.eastAnimation = eastAnimation;
            this.southAnimation = southAnimation;
            this.westAnimation = westAnimation;
            this.iddleAnimation = iddleAnimation;
            this.animationActive = false;
            this.currentAnimation = iddleAnimation;
            this.self = this;
        }
        NormalMove.prototype.move = function (path, self) {
            self.moveTileCollection = null;
            self.unit.tile.unit = null;
            self.unit.tile = path[path.length - 1];
            path[path.length - 1].unit = self.unit;
            self.pathIndex = 0;
            self.unitPreviousPosition = self.unit.tile;
            self.path = path;
            self.animationActive = true;
        };
        NormalMove.prototype.revert = function () {
            this.unit.tile.unit = null;
            this.unit.tile = this.unitPreviousPosition;
            this.unitPreviousPosition.unit = this.unit;
        };
        NormalMove.prototype.instantiate = function () {
            var self = this;
            this.moveTileCollection = new AdvanceWars.MoveTileCollection(this.unit, function (path) { self.move(path, self); });
            this.animationActive = false;
        };
        NormalMove.prototype.update = function (gameTime) {
            if (this.moveTileCollection != null)
                this.moveTileCollection.Update(gameTime);
            if (this.animationActive)
                this.doAnimation();
        };
        NormalMove.prototype.doAnimation = function () {
            if (this.pathIndex == this.path.length) {
                this.animationEnd();
                return;
            }
            var desinationTile = this.path[this.pathIndex];
            var distanceVector = desinationTile.position.minus(new AdvanceWars.Point(this.unit.rectangle.x, this.unit.rectangle.y));
            var animations = [this.northAnimation, this.eastAnimation, this.southAnimation, this.westAnimation];
            var directions = [
                new AdvanceWars.Point(0, Math.max(0, distanceVector.y)),
                new AdvanceWars.Point(Math.max(0, distanceVector.x), 0),
                new AdvanceWars.Point(0, Math.min(0, distanceVector.y)),
                new AdvanceWars.Point(Math.min(0, distanceVector.x), 0) //west
            ];
            for (var i = 0; i < 4; i++) {
                var directionVector = directions[i];
                var distance = directionVector.length();
                if (distance > 0) {
                    // Move to the direction but do not overshoot the destination.
                    this.unit.rectangle.x += Math.max(-this.unit.moveSpeedAnimation, (Math.min(this.unit.moveSpeedAnimation, directionVector.x)));
                    this.unit.rectangle.y += Math.max(-this.unit.moveSpeedAnimation, (Math.min(this.unit.moveSpeedAnimation, directionVector.y)));
                    if (this.currentAnimation != animations[i]) {
                        this.currentAnimation = animations[i];
                        this.unit.animationList.PlayAnimation(animations[i]);
                    }
                }
            }
            if (this.unit.rectangle.x == desinationTile.position.x && this.unit.rectangle.y == desinationTile.position.y) {
                this.pathIndex++;
            }
        };
        NormalMove.prototype.animationEnd = function () {
            this.unit.animationList.PlayAnimation(this.iddleAnimation);
            this.currentAnimation = this.iddleAnimation;
            this.animationActive = false;
            /// TODO: add next behavior call
            this.behaviourTree.active = false;
        };
        NormalMove.prototype.draw = function (ctx, gameTime) {
            if (this.moveTileCollection != null && this.animationActive == false)
                this.moveTileCollection.Draw(ctx, gameTime);
        };
        return NormalMove;
    })();
    AdvanceWars.NormalMove = NormalMove;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var SelectBehaviour = (function () {
        function SelectBehaviour(unit) {
            this.unit = unit;
        }
        SelectBehaviour.prototype.instantiate = function () {
            var _this = this;
            this.selectOptions.forEach(function (s) {
                s.rectangle.x = _this.unit.rectangle.x;
            });
        };
        SelectBehaviour.prototype.revert = function () {
        };
        SelectBehaviour.prototype.update = function (gameTime) {
            this.selectOptions.forEach(function (s) { s.update(gameTime); });
        };
        SelectBehaviour.prototype.draw = function (ctx, gameTime) {
            this.selectOptions.forEach(function (s) { s.update(gameTime); });
        };
        return SelectBehaviour;
    })();
    AdvanceWars.SelectBehaviour = SelectBehaviour;
})(AdvanceWars || (AdvanceWars = {}));
var AdvanceWars;
(function (AdvanceWars) {
    var SelectOption = (function () {
        function SelectOption(rectangle, name, behaviour, condition, behaviourTree) {
            this.rectangle = rectangle;
            this.name = name;
            this.behaviour = behaviour;
            this.condition = condition;
            this.behaviourTree = behaviourTree;
            var self = this;
            this.rectangle.click = function () {
                self.behaviourTree.current = behaviour;
            };
        }
        SelectOption.prototype.update = function (gameTime) {
            if (this.condition)
                this.rectangle.update(gameTime);
        };
        SelectOption.prototype.draw = function (ctx, gameTime) {
            if (this.condition)
                ctx.fillText(this.name, this.rectangle.x, this.rectangle.y);
        };
        return SelectOption;
    })();
    AdvanceWars.SelectOption = SelectOption;
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
            this.behaviourTree = new AdvanceWars.BehaviorTree();
            var moveBehaviour = new AdvanceWars.NormalMove(self, this.behaviourTree, "moveLeft", "moveLeft", "moveLeft", "moveLeft", "iddle");
            this.behaviourTree.root = moveBehaviour;
            this.rectangle.click = function () { self.behaviourTree.activate(); };
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
            this.rectangle.update(gameTime);
            this.behaviourTree.update(gameTime);
        };
        Unit.prototype.Draw = function (ctx, gameTime) {
            if (this.animationList != null)
                this.animationList.Draw(ctx, gameTime);
            this.behaviourTree.draw(ctx, gameTime);
        };
        Unit.prototype.GetReachableTiles = function () {
            var index = this.tile.index;
            var reachableTiles = [AdvanceWars.Game.current.map.tiles[index.x + 1][index.y]];
            return reachableTiles;
        };
        Unit.prototype.Move = function (tiles) {
            this.tile.unit = null;
            this.tile = tiles[0];
            this.path = tiles;
            this.state = "moving";
            this.tile.unit = this;
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
    var Moving = (function () {
        function Moving(unit, path, moveSpeed) {
            this.unit = unit;
            this.path = path;
            this.moveSpeed = moveSpeed;
        }
        Moving.prototype.Update = function () {
        };
        Moving.prototype.Draw = function () {
        };
        Moving.prototype.MoveAnimation = function () {
            if (this.path.length == 0) {
                this.unit.state = "iddle";
                this.unit.animationList.PlayAnimation("iddle");
                return;
            }
            var desinationTile = this.path[this.path.length - 1];
            var distance = 0;
            if ((distance = this.unit.rectangle.x - desinationTile.position.x) < 0) {
                this.unit.rectangle.x += Math.min(this.moveSpeed, Math.abs(distance));
                if (this.unit.animationList.currentAnimationKey != "moveRight") {
                    this.unit.animationList.PlayAnimation("moveRight");
                }
            }
            else if ((distance = this.unit.rectangle.x - desinationTile.position.x) > 0) {
                this.unit.rectangle.x -= Math.min(this.moveSpeed, Math.abs(distance));
                this.unit.animationList.PlayAnimation("moveLeft");
                if (this.unit.animationList.currentAnimationKey != "moveLeft") {
                    this.unit.animationList.PlayAnimation("moveLeft");
                }
            }
            else if ((distance = this.unit.rectangle.y - desinationTile.position.y) < 0) {
                this.unit.rectangle.y += Math.min(this.moveSpeed, Math.abs(distance));
            }
            else if ((distance = this.unit.rectangle.y - desinationTile.position.y) > 0) {
                this.unit.rectangle.y -= Math.min(this.moveSpeed, Math.abs(distance));
            }
            if (this.unit.rectangle.x == desinationTile.position.x && this.unit.rectangle.y == desinationTile.position.y)
                this.path.pop();
        };
        return Moving;
    })();
    AdvanceWars.Moving = Moving;
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
            if (loop === void 0) { loop = false; }
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
            if (loop === void 0) { loop = false; }
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
            if (animations === void 0) { animations = []; }
            this.animations = animations;
        }
        AnimationList.prototype.PlayAnimation = function (animation) {
            this.currentAnimationKey = animation;
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