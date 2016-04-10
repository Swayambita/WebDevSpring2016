
module.exports = function(app,fieldModel,formModel) {
    app.get("/api/assignment/form/:formId/field",getFieldsOfForm);
    app.post("/api/assignment/form/:formId/field",createFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldFromForm);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);
    app.post("/api/assignment/form/:formId/cloneField/", cloneField);
    app.put("/api/assignment/:formId/field",sortField);

    function getFieldsOfForm(req,res){

        var formId= req.params.formId;
        formModel.getFieldsOfForm(formId)
            .then(function(form) {
                    console.log("all fields",form);
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function createFieldForForm(req,res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel.createNewField(field)
            .then(function(resp){
                    formModel.updateFieldsArrayOfForm(formId,resp)
                        .then(function(doc){
                                formModel.getFieldsOfForm(formId)
                                    .then(function(response){
                                            res.json(response);
                                        },
                                        function(err){
                                            res.status(400).send(err);
                                        });
                            },
                            function(err){
                                res.status(400).send(err);
                            });
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function deleteFieldFromForm(req,res) {
        var formId= req.params.formId;
        var fieldId= req.params.fieldId;
        fieldModel.deleteFieldFromForm(fieldId)
            .then(function(response) {
                    formModel.deleteFieldFromArray(formId, fieldId)
                        .then(function (doc) {
                                formModel.getFieldsOfForm(formId)
                                    .then(function (resp) {
                                            res.json(resp);
                                        },
                                        function (err) {
                                            res.status(400).send(err);
                                        });
                            },
                            function (error) {
                                res.status(400).send(err);
                            });
                },
                function(err) {
                    res.status(400).send(err);
                });


    }

    function updateField(req,res){
        var formId= req.params.formId;
        var fieldId= req.params.fieldId;
        var updatedField=req.body;

        formModel.findFormById(formId)
            .then(function(response){

                    formModel.updateField(formId,fieldId,updatedField,response)
                        .then(function(res){
                                res.json(resp);
                            },
                            function(err){
                                res.status(400).send(err);
                            });
                },

                function(err){
                    res.status(400).send(err);
                });
    }

    function cloneField(req,res){
        var formId = req.params.formId;
        var field= req.body;
        fieldModel.cloneField(field)
            .then(function(response) {

                    formModel.updateFieldsArrayOfForm(formId, response)
                        .then(function (doc) {
                                formModel.getFieldsOfForm(formId)
                                    .then(function (resp) {
                                            res.json(resp);
                                        },
                                        function (err) {
                                            res.status(400).send(err);
                                        });
                            },
                            function (error) {
                                res.status(400).send(err);
                            });
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function sortField(req,res){

        var formId = req.params.formId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if(startIndex && endIndex){

            formModel.findFormById(formId)
                .then(function(resp){
                        formModel.sortField(resp,formId,startIndex,endIndex)
                            .then(function(doc){
                                    formModel.getFieldsOfForm(formId);
                                },
                                function(err){
                                    res.status(400).send(err);
                                })
                    },
                    function(err){
                        res.status(400).send(err);
                    });
        }
    }

}