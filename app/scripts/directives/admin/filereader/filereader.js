/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('fileReader',function() {
        return {
            scope: {
                fileReader:"="
            },
            link: function(scope, element) {
                $(element).on('change', function(changeEvent) {
                    var files = changeEvent.target.files;
                    if (files.length) {
                        var r = new FileReader();
                        r.onload = function(e) {
                            var contents = e.target.result;
                            var allTextLines = contents.split(/\r\n|\n/);
                            // Process first line with headers:
                            var headers = null;
                            headers = allTextLines.shift().split(';');
                            // Process other rows:
                            var lines = [];
                            for ( var i = 0; i < allTextLines.length; i++) {
                                // split each line based on semicolon
                                var data = allTextLines[i].split(';');
                                if (data.length == headers.length) {
                                    lines.push( { data: data, status: 0 } );
                                }
                            }
                            scope.$apply(function () {
                                //scope.fileReader = {aaa: "aaa"};
                                scope.fileReader = { lines: lines, headers: headers };
                            });
                        };

                        r.readAsText(files[0]);
                    }
                });
            }
        };
    });