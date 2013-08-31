/*jshint unused: false */

'use strict';

var MileHigh = function () {

  var TOTAL_TRAVELERS = 20;

  var seven6seven = [
    '#OOOO# OOOOOOOOOOOOOO O OOOOOOOOOOOO###',
    '+OOOO# OOOOOOOOOOOOOO O OOOOOOOOOOOO+#+',
    '                                       ',
    '#OOOO# OOOOOOOOOOOOOOO OOOOOOOOOOOOOO+#',
    '#OOOO# OOOOOOOOOOOOOOO OOOOOOOOOOOOOO##',
    '#OOOO# OOOOOOOOOOOOOOO OOOOOOOOOOOOOO+#',
    '                                       ',
    '+OOOO# OOOOOOOOOOOOOO O OOOOOOOOOOOO+#+',
    '#OOOO# OOOOOOOOOOOOOO O OOOOOOOOOOOO###',
  ];

  var crj700 = [
    '# OOOOOOOOOOO OOOOO###',
    '# OOOOOOOOOOO OOOOO#+#',
    '                      ',
    '# OOOOOOOOOOO OOOOOOOO',
    '# OOOOOOOOOOO OOOOOOOO',
  ];

  var seven3seven = [
    '#OO# OOOOOOOOOOO O OOOOOOOOOOOOOO###',
    '#OO# OOOOOOOOOOO O OOOOOOOOOOOOOO###',
    '#OO# OOOOOOOOOOO O OOOOOOOOOOOOOO+#+',
    '                                    ',
    '+OO# OOOOOOOOOOO O OOOOOOOOOOOOOO+#+',
    '#OO# OOOOOOOOOOO O OOOOOOOOOOOOOO###',
    '#OO# OOOOOOOOOOO O OOOOOOOOOOOOOO###'
  ];

  var planeLayoutIn = seven6seven;

  this.planeLayout = this.initPlaneLayout(planeLayoutIn);
  this.initRandomTravelersAtSpecificSeats(
    { planeLayout: this.planeLayout,
      totalTravelers: TOTAL_TRAVELERS }
  );
  this.player = this.initPlayer(this.planeLayout);
  this.controls = this.initControls(this.player);
};