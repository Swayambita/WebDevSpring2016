//var formMock = require("./form.mock.json");
var mongoose=require("mongoose");
var q= require("q");

module.exports= function(formModel) {

    var FieldSchema = require("./field.schema.server.js")();
    var Field = mongoose.model("Field", FieldSchema);

    var api = {
        deleteFieldFromForm: deleteFieldFromForm,
        cloneField: cloneField,
        createNewField: createNewField,
        sortField: sortField
    }
    return api;

    function createNewField(field) {
        var deferred = q.defer();
        Field.create(field, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteFieldFromForm(fieldId) {
        var deferred = q.defer();
        Field.remove({"_id": fieldId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

    }

    function cloneField(field) {
        var deferred = q.defer();

        Field.create(field, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function sortField(formId, startIndex, endIndex) {
        var deferred = q.defer();
        formModel.findFormById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    var userForm = doc;
                    userForm.fields.splice(endIndex, 0, userForm.fields.splice(startIndex, 1)[0]);
                    formModel.update(
                        {"_id": formId},
                        {$set: {"fields": userForm.fields}},
                        function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        });
                }
            });
        return deferred.promise;
    }
}


