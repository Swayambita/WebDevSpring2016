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

    function getFieldsForForm(formId){
        var form=formModel.findFormById(formId);
        return form.fields;
    }


    function createFieldForForm(formId,field){
        var form=formModel.findFormById(formId);
        if(form!=null){
            field._id=uuid.v1();
            form.fields.push(field);
            return form.fields;
        }
        else{
            return null;
        }
    }

    function deleteFieldFromForm(formId,fieldId){

        var form=formModel.findFormById(formId);
        if(form!=null){
            for(var v in form.fields){
                if(fieldId== form.fields[v]._id){
                    form.fields.splice(v,1);
                    var allFields=getFieldsForForm(formId);
                    return allFields;
                }
            }
        }
        else
             return null;

    }

    function updateField(formId,fieldId,updatedField){
        var form=formModel.findFormById(formId);
        if(form!=null){
            for(var v in form.fields){
                if(fieldId== form.fields[v]._id){
                        form.fields[v]=updatedField;
                        var allFields=getFieldsForForm(formId);
                        return allFields;
                }
            }
        }
        else
            return null;
    }

    function cloneField(formId,field){
            field._id = uuid.v1();
            var form = formModel.findFormById(formId);
            form.fields.push(field);
        }
}


