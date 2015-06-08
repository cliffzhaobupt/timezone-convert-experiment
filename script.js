'use strict';

angular.module('pstJSTConvertor', [])
.controller('PSTJSTController', ['$scope', '$filter', function($scope, $filter) {
  var inputTimeFormat = 'yyyy-MM-dd HH:mm:ss',
    timeFormatWithAbbreviation = 'MMM. dd (HH:mm)';
  var dateFilter = $filter('date');

  function parseTime(timeStr) {
    if (! timeStr) return '';
    return Date.parse(timeStr.replace(' ', 'T'));
  }

  $scope.changeJST = function() {
    var jstStart = parseTime($scope.jstStart);
    var jstFinish = parseTime($scope.jstFinish);

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
