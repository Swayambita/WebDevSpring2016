var formMock = require("./form.mock.json");

module.exports= function(uuid){

    var api = {
        getFieldsForForm:getFieldsForForm,
        createFieldForForm:createFieldForForm,
        deleteFieldFromForm:deleteFieldFromForm,
        updateField:updateField

    }
    return api;

    function getFieldsForForm(formId){
        console.log("hola");
        for (var u in formMock) {
            if (formMock[u]._id == formId) {
                return formMock[u].fields;
            }
        }
        return null;
    }

    function createFieldForForm(formId,field){
        for (var u in formMock) {
            if (formMock[u]._id == formId) {
                field._id=uuid.v1();
                console.log("((((");
                formMock[u].fields.push(field);
                console.log("******",formMock[u].fields);
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

    function updateField(formId,fieldId,updatedField){
        for (var u in formMock) {
            if (formMock[u]._id == formId) {
                for(var v in formMock[u].fields){
                    if(fieldId== formMock[u].fields[v]._id){
                        console.log("before",formMock[u].fields[v]);
                        formMock[u].fields[v]=updatedField;
                        console.log("after",formMock[u].fields[v]);
                        var allFields=getFieldsForForm(formId);
                        console.log("all",allFields);
                        return allFields;
                    }
                }
            }
        }
        return null;

    }

}

