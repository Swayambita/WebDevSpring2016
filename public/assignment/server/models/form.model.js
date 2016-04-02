//var formMock = require("./form.mock.json");
var mongoose=require("mongoose");
var q= require("q");

module.exports= function(uuid,db) {

    var FormSchema = require("./form.schema.server.js")();
    var Form = mongoose.model("Form", FormSchema);

    var api = {
        findFormByTitle: findFormByTitle,
        findAllFormsForUser: findAllFormsForUser,
        addForm: addForm,
        deleteForm: deleteForm,
        updateForm: updateForm,
        findFormById: findFormById,
        updateFieldsArrayOfForm:updateFieldsArrayOfForm,
        getFieldsOfForm:getFieldsOfForm,
        deleteFieldFromArray:deleteFieldFromArray
    }
    return api;


    function findFormById(formId) {

        var deferred = q.defer();
        Form.findOne({"_id": formId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        for (var u in formMock) {
            if (mock[u].title == title) {
                return mock[u];
            }
        }
        return null;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        Form.find({"userId": userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function addForm(id, form) {
        var deferred = q.defer();
        form.userId = id;
        form.created=new Date();
        form.updated=new Date();
        Form.create(form, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function deleteForm(formId, userId) {
        var deferred = q.defer();
        Form.remove({"_id": formId, "userId": userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateForm(formId, newForm) {
        newForm.updated=new Date();
        var deferred = q.defer();
        Form.update({"_id": formId}, {$set: newForm},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }


    function updateFieldsArrayOfForm(formId,newField){
        var deferred = q.defer();
        Form.update({"_id": formId},{$push:{fields:newField}},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function getFieldsOfForm(formId){
        var deferred = q.defer();
        Form.findOne({"_id": formId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    console.log("*******",doc);
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function deleteFieldFromArray(formId, fieldId){
        var deferred = q.defer();

        console.log("the new field",fieldId);
        Form.update({"_id": formId},{$pull:{fields:{"_id":fieldId}}},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
}
