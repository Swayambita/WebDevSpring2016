(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($rootScope,$routeParams,FieldService,FormService) {

        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.message = null;

        vm.addField = addField;
        vm.removeField = removeField;
        vm.editField = editField;
        vm.okayField = okayField;
        vm.cancelField = cancelField;
        vm.cloneField = cloneField;
        vm.sortField=sortField;

        var formId = $routeParams.formId;

        function init() {
            FormService.findFormById(formId)
                .then(function (response) {
                    if(response.data.fields.length>0) {
                        vm.existingFields = response.data.fields;
                    }
                    else{
                        vm.message="this form has no fields yet"
                    }
                },
                function(error){
                    vm.message="Error from server";
                })
        }
        init();

        function addField(fieldType) {

            var field = null;
            //Set default field information
            if (fieldType == "Single Line Text Field") {
                field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            }
            else if (fieldType == "Multi Line Text Field") {
                field = { "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            }
            else if (fieldType == "Date Field") {
                field = {"label": "New Date Field", "type": "DATE"};
            }
            else if (fieldType == "Dropdown Field") {
                field = {"label": "New Dropdown", "type": "OPTIONS",
                    "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };
            }
            else if (fieldType == "Checkboxes Field") {
                field = {"label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };
            }
            else if (fieldType == "Radio Buttons Field") {
                field = {"label": "Radio Buttons Field", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };
            }
            else {
                return null;
            }

            FieldService.createFieldForForm(formId, field)
                .then(function (response) {
                    console.log("the response for adding",response);
                    vm.existingFields = response.data.fields;
                    vm.message=null;
                },
                function(error){
                  vm.message="couldnot add the field";
                });
        }

        function removeField(field) {
            console.log("field to be deleted",field);
            FieldService.deleteFieldFromForm(formId, field._id)
                .then(function (response) {
                        vm.existingFields = response.data.fields;
                },
                function(error){
                    vm.message="couldnot delete the field";
                });
        }

        function editField(field) {

            vm.selectedField = field;
            vm.label = field.label;
            var optionsInString = "";
            console.log("options", field.options);
            var op = field.options;

            if (op && (field.type == 'OPTIONS' ||field.type == 'CHECKBOXES'|| field.type == 'RADIOS' )) {
                var optionList = [];
                for (var u in op) {
                    optionList.push(op[u].label + ":" + op[u].value + "\n");
                    optionsInString = optionsInString + (op[u].label + ":" + op[u].value + "\n");
                }
                optionsInString = optionsInString.substring(0, optionsInString.length - 1);
                vm.selectedField.options = optionList;
                vm.options = optionsInString;
            }
            else
            {
                vm.selectedField.options=null;
            }

            if (field.placeholder) {
                vm.placeholder = field.placeholder;
            }
        }

        function okayField() {
            if (vm.selectedField.options) {
                var opt = vm.options.split("\n");
                var optionList = [];

                for (var u in opt) {
                    var val = opt[u].split(":");
                    optionList.push({"label": val[0], "value": val[1]});
                }
                vm.selectedField.options = optionList;
            }
            if (vm.selectedField.placeholder) {
                vm.selectedField.placeholder = vm.placeholder
            }

            vm.selectedField.label = vm.label;

            var newUpdatedField ={ "_id":  vm.selectedField._id,"placeholder": vm.selectedField.placeholder,"type":vm.selectedField.type ,
                "label":vm.selectedField.label ,"options":vm.selectedField.options};

            FieldService.updateField(formId, vm.selectedField._id, newUpdatedField)
                .then(function(response) {
                    init();
                });

            vm.label = null;
            vm.placeholder = null;
            vm.options = null;
        }

        function cancelField() {
            FieldService.getFieldsForForm(formId)
                .then(function (response) {
                    vm.existingFields = response.data.fields;
                })
            vm.label = null;
            vm.placeholder = null;
            vm.options = null;
        }

        function cloneField(field) {
            var cloneField=  field;
            delete cloneField['_id'];
            FieldService.cloneField(formId, cloneField)
                .then(function(response){
                    init();
                },
                function(error){
                    vm.message="error from server";
                });
        }

        function updateForm(start, end) {
            var newFields = [];
            for (var i in vm.existingFields) {
                newFields[i] = vm.existingFields[i];
            }
            var temp = newFields[start];
            newFields[start] = newFields[end];
            newFields[end] = temp;
            FormService.findFormById(formId)
                .then(function (response) {
                    var form = response.data;
                    form.fields = newFields;
                    FormService.updateForm(form._id, form);
                });
        }

        function sortField(start,end){
            console.log("am in sortField field controller client");
            FieldService
                .sortField(formId,start,end)
                .then(function(response){
                        console.log("resposne for sorting",response.data);
                        vm.existingFields= response.data;
                    },
                    function(err){
                        console.log(err);
                    });
        }
    }
})();


