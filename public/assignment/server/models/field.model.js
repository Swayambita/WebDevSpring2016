//var formMock = require("./form.mock.json");
var mongoose=require("mongoose");
var q= require("q");

module.exports= function(uuid,formModel,db){

    var FieldSchema=require("./field.schema.server.js")();
    var Field=mongoose.model("Field",FieldSchema);

    var api = {
        deleteFieldFromForm:deleteFieldFromForm,
        updateField:updateField,
        cloneField:cloneField,
        createNewField:createNewField
    }
    return api;


    function createNewField(field){
        var deferred= q.defer();
        Field.create(field,function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function deleteFieldFromForm(fieldId){
        var deferred= q.defer();
        Field.remove({"_id":fieldId},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

    }
    function updateField(arrOfFields,fieldId,updatedField){
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

    function cloneField(field){
        var deferred= q.defer();

        Field.create(field,function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
        }


}


