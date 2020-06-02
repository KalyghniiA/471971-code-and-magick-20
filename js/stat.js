'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var FONT_GAP = 20;
var HEADING = FONT_GAP * 3;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - GAP * 2 - FONT_GAP * 2;

var getRandom = function (number) {
  return Math.ceil(Math.random() * number);
};

var getBlueWithRandomSaturation = function () {
  return 'hsl(240, ' + getRandom(100) + '%, 50%)';
};

var renderCloud = function (ctx, x, y, color) {
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
  renderCloud(ctx, CLOUD_X + GAP / 5, CLOUD_Y + GAP / 5, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderDescription(ctx);

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);
  var searchHeight = function (time) {
    return -((barHeight * time[i]) / maxTime);
  };

  for (var i = 0; i < times.length; i++) {
    ctx.textBaseline = 'hanging';
    ctx.fillText(players[i], CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : getBlueWithRandomSaturation();
    ctx.fillRect(CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - FONT_GAP * 2, BAR_WIDTH, searchHeight(times));
    ctx.fillStyle = '#000';
    ctx.fillText(Math.ceil(times[i]), CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - HEADING - Math.abs(searchHeight(times)));
  }
};
