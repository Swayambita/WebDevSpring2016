
module.exports = function(app,fieldModel) {
    app.get("/api/assignment/form/:formId/field",getFieldsForForm);
    app.post("/api/assignment/form/:formId/field",createFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldFromForm);


    function getFieldsForForm(req,res){
        var formId= req.params.formId;
        var setOfFields=fieldModel.getFieldsForForm(formId);
        res.json(setOfFields);
    }


}