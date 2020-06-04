'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var FONT_GAP = 20;
var HEADING = FONT_GAP * 3;
var BAR_WIDTH = 40;
var barMaxHeight = CLOUD_HEIGHT - GAP * 2 - FONT_GAP * 2;
var USER_COLOR = 'rgba(255, 0, 0, 1)';
var CLOUD_COLOR = '#fff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var getRandom = function (number) {
  return Math.ceil(Math.random() * number);
};

var getBlueWithRandomSaturation = function () {
  return 'hsl(240, ' + getRandom(100) + '%, 50%)';
};

var renderCloud = function (ctx, x, y, color, shadow) {
  ctx.fillStyle = shadow;
  ctx.fillRect(x + GAP / 5, y + GAP / 5, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

};

var renderDescription = function (ctx) {
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR, SHADOW_COLOR);
  renderDescription(ctx);

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);
  var calcHeight = function (time) {
    return -((barMaxHeight * time) / maxTime);
  };

  var getXCoord = function (barIndex) {
    return CLOUD_X + GAP + (GAP + BAR_WIDTH) * barIndex;
  };

  for (var i = 0; i < times.length; i++) {
    var xCoord = getXCoord(i);
    var barHeight = calcHeight(times[i]);
    ctx.textBaseline = 'hanging';
    ctx.fillText(players[i], xCoord, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillStyle = players[i] === 'Вы' ? USER_COLOR : getBlueWithRandomSaturation();
    ctx.fillRect(xCoord, CLOUD_HEIGHT - FONT_GAP * 2, BAR_WIDTH, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.ceil(times[i]), xCoord, CLOUD_HEIGHT - HEADING - Math.abs(barHeight));
  }
};
