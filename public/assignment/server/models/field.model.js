var formMock = require("./form.mock.json");

module.exports= function(uuid,formModel){

    var api = {
        getFieldsForForm:getFieldsForForm,
        createFieldForForm:createFieldForForm,
        deleteFieldFromForm:deleteFieldFromForm,
        updateField:updateField,
        cloneField:cloneField

    }
    return api;

    function getFieldsForForm(formId) {
        for (var u in formMock) {
            if (formMock[u]._id == formId) {
                return formMock[u].fields;
            }
        }return null;
    }

    /*function getFieldsForForm(formId){
        console.log("hola");
        console.log("hhhh",formModel);
        var form=formModel.findFormById(formId);
        return form.fields;
    }*/


    function createFieldForForm(formId,field){
        for (var u in formMock) {
            if (formMock[u]._id == formId) {
                field._id=uuid.v1();
                formMock[u].fields.push(field);
                return formMock[u].fields;
            }
        }
        return null;
    }

    function deleteFieldFromForm(formId,fieldId){
        for (var u in formMock) {
            if (formMock[u]._id == formId) {
                for(var v in formMock[u].fields){
                  if(fieldId== formMock[u].fields[v]._id){
                      formMock[u].fields.splice(v,1);
                      var allFields=getFieldsForForm(formId);
                      return allFields;
              }
            }
         }
        }
        return null;
    }

  /*  function deleteFieldFromForm(formId,fieldId){
        console.log("inside delete function");
        var form = formModel.findFormById(formId);
        for(var v in form){
            if(fieldId== form.fields[v]._id){
                form.fields.splice(v,1);
                var allFields=getFieldsForForm(formId);
                return allFields;
            }
        }

    }*/

    function updateField(formId,fieldId,updatedField){
        for (var u in formMock) {
            if (formMock[u]._id == formId) {
                for(var v in formMock[u].fields){
                    if(fieldId== formMock[u].fields[v]._id){
                        formMock[u].fields[v]=updatedField;
                        var allFields=getFieldsForForm(formId);
                        return allFields;
                    }
                }
            }
        }
        return null;

    }

    function cloneField(formId,field){
            field._id = uuid.v1();
            var form = formModel.findFormById(formId);
            form.fields.push(field);
        }

}


