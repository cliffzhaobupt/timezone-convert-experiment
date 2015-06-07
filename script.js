'use strict';

angular.module('pstJSTConvertor', [])
.controller('PSTJSTController', ['$scope', '$filter', function($scope, $filter) {
  var inputTimeFormat = 'yyyy-MM-dd HH:mm:ss',
    timeFormatWithAbbreviation = 'MMM. dd (hh:mm)';
  var dateFilter = $filter('date');

  function toParsableTimeStr(timeStr) {
    if (! timeStr) return '';
    return timeStr.replace(' ', 'T');
  }

  $scope.changePST = function() {
    var pstStart = Date.parse(toParsableTimeStr($scope.pstStart));
    var pstFinish = Date.parse(toParsableTimeStr($scope.pstFinish));

    if (! isNaN(pstStart)) {
      $scope.jstStart = dateFilter(pstStart, inputTimeFormat, '+1700');
    } else {
      $scope.jstStart = '';
    }
    if (! isNaN(pstFinish)) {
      $scope.jstFinish = dateFilter(pstFinish, inputTimeFormat, '+1700');
    } else {
      $scope.jstFinish = '';
    }
          
    $scope.pstRange = [
      isNaN(pstStart) ? '' : dateFilter(pstStart, timeFormatWithAbbreviation),
      ' - ',
      isNaN(pstFinish) ? '' : dateFilter(pstFinish, timeFormatWithAbbreviation)
    ].join('');
  };

  $scope.changeJST = function() {
    var jstStart = Date.parse(toParsableTimeStr($scope.jstStart));
    var jstFinish = Date.parse(toParsableTimeStr($scope.jstFinish));

    if (! isNaN(jstStart)) {
      $scope.pstStart = dateFilter(jstStart, inputTimeFormat, '-1700');
    } else {
      $scope.pstStart = '';
    }

    if (! isNaN(jstFinish)) {
      $scope.pstFinish = dateFilter(jstFinish, inputTimeFormat, '-1700');
    } else {
      $scope.pstFinish = '';
    }

    $scope.pstRange = [
      isNaN(jstStart) ? '' : dateFilter(jstStart, timeFormatWithAbbreviation, '-1700'),
      ' - ',
      isNaN(jstFinish) ? '' : dateFilter(jstFinish, timeFormatWithAbbreviation, '-1700'),
    ].join('');
  };
}]);
