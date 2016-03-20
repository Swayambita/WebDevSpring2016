(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($rootScope,$routeParams,FieldService) {

        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.message = null;
        vm.addField=addField;
        vm.removeField=removeField;
        vm.editField=editField;
        vm.okayField=okayField;

        var formId=$routeParams.formId;

        function init(){
            FieldService.getFieldsForForm(formId)
                .then(function(response){
                    vm.existingFields=response.data;
                })
        }
        init();

        vm.fieldMap = {"TEXT":"Single Line Text Field",
                        "TEXTAREA":"Multi Line Text Field",
                        "DATE":"Date Field",
                        "OPTIONS":"Dropdown Field",
                        "CHECKBOXES":"Checkboxes Field",
                        "RADIO":"Radio Button Field"};


        function addField(fieldType) {

            var field = null;
            //Set default field information
            if (fieldType == "Single Line Text Field") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            }
            else if (fieldType == "Multi Line Text Field") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            }
            else if (fieldType == "Date Field") {
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};
            }
            else if (fieldType == "Dropdown Field") {
                field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS",
                    "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
            }
            else if (fieldType == "Checkboxes Field") {
                field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
            }
            else if (fieldType == "Radio Buttons Field") {
                field = {"_id": null, "label": "Radio Buttons Field", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
            }

            else {
                return null;
            }

            FieldService.createFieldForForm(formId, field)
                .then(function(response){
                    if (response.data) {
                        vm.existingFields = response.data;
                    }
                });
        }

        function removeField(field){ 
            FieldService.deleteFieldFromForm(formId, field._id) 
                .then(function (response) { 
                    if (response.data) { 
                        vm.existingFields = response.data; 
                    } 
                });
         }

        function editField(field){
            console.log(field);
            console.log("hjfdg",formId);
            vm.selectedField=field;
        }

        function okayField(field){
            console.log("okayfunction",formId,field,vm.selectedField._id);

            var sfield=vm.selectedField;
            console.log("sfield",sfield,vm.selectedField);

            if(sfield.type=="TEXT"){
                var newField= {"_id":sfield._id, "label": field.label, "type":"TEXT", "placeholder": field.placeholder};
            }
            console.log("the new field",newField);

            if(sfield.type=="TEXTAREA"){
                var newField= {"_id":sfield._id, "label": field.label, "type":"TEXTAREA", "placeholder": field.placeholder};
            }

            if(sfield.type=="DATE"){
                var newField= {"_id":sfield._id, "label": field.label, "type":"DATE"};
            }

            if(sfield.type=="EMAIL"){
                var newField= {"_id":sfield._id, "label": field.label, "type":"EMAIL", "placeholder": field.placeholder};
            }


            console.log("newField",sfield,vm.selectedField);

            FieldService.updateField(formId,vm.selectedField._id,newField)
               .then(function(response){
                   vm.existingFields=response.data;
                   vm.newField=null;
               });
        }

    }
})();


