(function(){
    "use strict";
    angular
        .module("jgaSortable", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {
        var start = null,
            end = null;

        function link(scope, element, attributes) {
            var jgaAxis = attributes.jgaAxis;
            $(element).sortable({
                axis: jgaAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();

                    scope.$apply(function(){
                        scope.updateForm(start,end);
                    })
                }
            });
        }
        return {
            link: link
        }
    }
})();
