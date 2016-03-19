var formMock = require("./form.mock.json");

module.exports= function(){

    var api = {
        getFieldsForForm:getFieldsForForm,
        createFieldForForm:createFieldForForm,
        deleteFieldFromForm:deleteFieldFromForm

    }
    return api;

    function getFieldsForForm(formId){
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

}


