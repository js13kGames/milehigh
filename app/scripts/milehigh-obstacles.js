/*globals MileHigh,World */
'use strict';

MileHigh.prototype.maxTurns = 200;

/**
 * Obstacles implementation
 */
MileHigh.prototype.initObstacles = function () {
  // Allows for a minimum threshold
  this.turbulenceWarningAt = null;
  this.lastSnackAt = null;

  // These can adapt to difficulty and number of players on board
  this.turbulenceProbability = 0.02;
  this.snackProbability = 0.1;
};

/**
 * Returns obstacle at current turn, null if none
 */
MileHigh.prototype.getObstacle = function () {
  // Landing?
  if (this.isLanding()) {
    return World.Obstacle.LANDING; // game over
  }
  // Terrorist?
  // Turbulence?
  if (this.hasTurbulenceWarning()) {
    return World.Obstacle.TURBULENCE_IMMINENT;
  } 
  else if (this.hasTurbulence()) {
    return World.Obstacle.TURBULENCE;
  }
  // Food/Drink time?
  if (this.hasSnacks()) {
    return World.Obstacle.SNACKS;
  }
  return null;
};

MileHigh.prototype.obstacleInProgress = function () {
  if (this.world.currentObstacle) {
    return true;
  }
  return false;
};

MileHigh.prototype.isLanding = function () {
  if (this.obstacleInProgress()) {
    return false;
  }
  // return time spent > max time
  if (this.gameStats.turns >= this.maxTurns) {
    return true;
  }
  return false;
};

MileHigh.prototype.hasTurbulenceWarning = function () {
  if (this.obstacleInProgress()) {
    return false;
  }
  return Math.random() < this.turbulenceProbability;
};

MileHigh.prototype.hasTurbulence = function () {
  if (this.world.currentObstacle === World.Obstacle.TURBULENCE_IMMINENT) {
    // for up to 5 seconds
    if (((new Date()).getTime() - this.turbulenceWarningAt) > 5) {
      return true;
    }
  }
  return false;
};

MileHigh.prototype.isTurbulenceOver = function () {
  return (((new Date()).getTime() - this.lastTurbulenceAt) > 3);
};

MileHigh.prototype.hasSnacks = function () {
  if (this.obstacleInProgress()) {
    return false;
  }
  return Math.random() < this.snackProbability;
};

MileHigh.prototype.gameOver = function () {
  this.world.currentObstacle = World.Obstacle.LANDING;
};

MileHigh.prototype.seatBeltsAlert = function () {
  // Play ding
  var seatbelts = new CustomEvent('audio', {detail: 'seatBelts'});
  window.dispatchEvent(seatbelts);
  this.world.currentObstacle = World.Obstacle.TURBULENCE_IMMINENT;
  this.turbulenceWarningAt = (new Date()).getTime();
};

MileHigh.prototype.addTurbulence = function () {
  document.getElementById('turbulence-alert').classList.remove('hide');

  // Update flag for renderers
  this.world.currentObstacle = World.Obstacle.TURBULENCE;
  this.lastTurbulenceAt = (new Date()).getTime();

  // Break pairings if not getting busy
  if (this.player.state !== World.PlayerState.IN_LAVATORY) {
    this.resetPlayerState();
  }
  // Reset player heat levels
  this.world.resetTravelerHeatLevels();
  
};

MileHigh.prototype.removeTurbulence = function () {
  document.getElementById('turbulence-alert').classList.add('hide');
  this.world.currentObstacle = null;
};

MileHigh.prototype.addSnackCarts = function () {
  // We don't count attendants in aisle as real obstacle b/c we want turbulence
  // to be possible even when they are out
  // We might want to use a bit flag for obstacles if we need to keep track of
  // each...
  //this.world.currentObstacle = World.Obstacle.SNACKS;

  this.world.attendants.forEach(function (a) {
    a.walk();
  });
};
