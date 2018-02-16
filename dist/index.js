(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    checkFood: function checkFood() {
        if (this.head.x == this.food.x && this.head.y == this.food.y) {
            this.makeFood();
            // update the score
            this.score++;
            this.speed = this.speed > 50 ? this.speed - 5 : this.speed;
            this.tail.push({ x: this.head.x, y: this.head.y });

            // update the score value on the DOM
            document.querySelector('.score > span').innerHTML = this.score;
        } else {
            this.checkForCollision();
        }
    },


    // verify if the snake is hitting the borders
    checkBorders: function checkBorders() {
        if (this.head.x < 0 || this.head.x > this.canvasSize - this.blockSize || this.head.y < 0 || this.head.y > this.canvasSize - this.blockSize) {
            this.death();
        }
    },
    checkForCollision: function checkForCollision() {
        var _this = this;

        if (this.tail.filter(function (pos, idx) {
            return pos.x == _this.head.x && pos.y == _this.head.y && idx;
        }).length) {
            this.death();
        }
    }
};

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// draw one block of food, head or the tail


exports.default = {
    drawBlock: function drawBlock(x, y) {
        this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
    },
    drawSnake: function drawSnake() {
        var _this = this;

        this.ctx.fillStyle = "#FF0000";
        this.drawBlock(this.head.x, this.head.y);

        this.tail.forEach(function (tailbox) {
            _this.drawBlock(tailbox.x, tailbox.y);
        });
    },
    drawFood: function drawFood() {
        this.ctx.fillStyle = "#FFFF00";
        this.drawBlock(this.food.x, this.food.y);
    }
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _draw = require('./draw');

var _draw2 = _interopRequireDefault(_draw);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _check = require('./check');

var _check2 = _interopRequireDefault(_check);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game() {
        var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 180;
        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

        _classCallCheck(this, Game);

        this.speed = speed;
        this.blockSize = size;
        this.scale = scale;

        this.importMethods();

        // default initial direction
        this.direction = {
            x: 1,
            y: 0
        };

        this.canvasSize = this.scale * this.blockSize;

        this.lastControlKey = '';
        this.tail = [];
        this.score = 0;

        // run the canvas and interval
        this.init();
    }

    _createClass(Game, [{
        key: 'importMethods',
        value: function importMethods() {
            this.drawBlock = _draw2.default.drawBlock;
            this.drawSnake = _draw2.default.drawSnake;
            this.drawFood = _draw2.default.drawFood;
            this.handleInput = _input2.default.handleInput;
            this.init = _init2.default.init;
            this.checkFood = _check2.default.checkFood;
            this.checkBorders = _check2.default.checkBorders;
            this.checkForCollision = _check2.default.checkForCollision;
        }

        // this method will run intervally

    }, {
        key: 'update',
        value: function update() {

            // move the tail
            if (this.tail.length) {
                this.tail.push({ x: this.head.x, y: this.head.y });
                this.tail.shift();
            }

            this.head.x += this.direction.x * this.blockSize;
            this.head.y += this.direction.y * this.blockSize;

            // check hitting the borders
            this.checkBorders();

            // check if snake is eating the food
            this.checkFood();

            //clean up the canvas to re-render
            this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

            this.drawSnake();
            this.drawFood();

            this.holdInput = false;
        }
    }, {
        key: 'getRandomPos',
        value: function getRandomPos() {
            return Math.floor(Math.random() * this.scale) * this.blockSize;
        }

        // randomize the food location

    }, {
        key: 'makeFood',
        value: function makeFood() {
            this.food = {
                x: this.getRandomPos(),
                y: this.getRandomPos()
            };
        }
    }, {
        key: 'death',
        value: function death() {
            clearInterval(this.intrv);
            document.getElementById('message').innerText = "GAME OVER!";
        }
    }]);

    return Game;
}();

exports.default = Game;

},{"./check":1,"./draw":2,"./init":5,"./input":6}],4:[function(require,module,exports){
'use strict';

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.getElementById('game-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var speed = parseInt(e.srcElement.elements[0].value);
    var blockSize = parseInt(e.srcElement.elements[1].value);
    var gameScale = parseInt(e.srcElement.elements[2].value);

    document.getElementById('menu').style.display = 'none';
    document.getElementById('game-play').style.display = 'block';

    new _game2.default(speed, blockSize, gameScale);
});

},{"./game":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    init: function init() {
        var _this = this;

        var canvas = document.getElementById('snake');

        canvas.width = this.canvasSize;
        canvas.height = this.canvasSize;

        this.ctx = canvas.getContext('2d');

        this.makeFood();

        this.head = {
            x: Math.floor(this.scale / 2) * this.blockSize,
            y: Math.floor(this.scale / 2) * this.blockSize
        };

        // initialize the tail with one block
        this.tail.push({
            x: this.head.x - this.blockSize,
            y: this.head.y - this.blockSize
        });

        //attach the events handler for keydown
        window.addEventListener('keydown', function (e) {
            if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            } else {
                return;
            }
            _this.handleInput(e.key);
        });

        this.holdInput = false;
        this.intrv = setInterval(function () {
            _this.update();
        }, this.speed);
    }
};

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
//change the direction of the snake based on Arrow keys
exports.default = {
    handleInput: function handleInput(e) {

        if (this.holdInput) return;

        switch (event.key) {
            case "ArrowUp":
                if (this.lastControlKey !== "ArrowDown") {
                    this.direction.x = 0;
                    this.direction.y = -1;
                    this.lastControlKey = "ArrowUp";
                    this.holdInput = true;
                }
                break;
            case "ArrowLeft":
                if (this.lastControlKey !== "ArrowRight") {
                    this.direction.x = -1;
                    this.direction.y = 0;
                    this.lastControlKey = "ArrowLeft";
                    this.holdInput = true;
                }
                break;
            case "ArrowRight":
                if (this.lastControlKey !== "ArrowLeft") {
                    this.direction.x = 1;
                    this.direction.y = 0;
                    this.lastControlKey = "ArrowRight";
                    this.holdInput = true;
                }
                break;
            case "ArrowDown":
                if (this.lastControlKey !== "ArrowUp") {
                    this.direction.x = 0;
                    this.direction.y = 1;
                    this.lastControlKey = "ArrowDown";
                    this.holdInput = true;
                }
                break;
            default:
        }
    }
};

},{}]},{},[4]);
