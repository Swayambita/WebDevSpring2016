
module.exports = function(app,formModel) {
    app.post("/api/assignment/findFormByTitle/:title", findFormByTitle);
    app.get("/api/assignment/findAllFormsForUser/:id/form",findAllFormsForUser);
    app.post("/api/assignment/addForm/user/:id/form",addForm);
    app.delete("/api/assignment/form/:formId/:userId", deleteForm);
    app.put("/api/assignment/form/:formToBeUpdatedId",updateForm);
    app.get("/api/assignment/findFormById/:formId",findFormById);

    function findFormByTitle(req,res){
        var title= req.params.title;
        var formsWithGivenTitle=formModel.findFormByTitle(title);
        res.json(formsWithGivenTitle);
    }

    function findAllFormsForUser(req,res){
        var userId=req.params.id;
        formModel.findAllFormsForUser(userId)
            .then(function(form) {
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function addForm(req,res){
        var userId = req.params.id;
        var form=req.body;
        formModel.addForm(userId,form)
            .then(function(form) {
                    formModel.findAllFormsForUser(userId)
                        .then(function(form) {
                                res.json(form);
                            },
                            function(err){
                                res.status(400).send(err);
                            });
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function deleteForm(req,res){
        var formId = req.params.formId;
        var userId=req.params.userId;
        formModel.deleteForm(formId,userId)
            .then(function(form) {
                    formModel.findAllFormsForUser(userId)
                        .then(function(response) {
                                res.json(response);
                            },
                            function(err){
                                res.status(400).send(err);
                            });
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function updateForm(req,res){
        var formId=req.params.formToBeUpdatedId;
        var newForm=req.body;

        formModel.updateForm(formId,newForm)
            .then(function(form) {
                   res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function findFormById(req,res){
        var formId=req.params.formId;
        formModel.findFormById(formId)
            .then(function(form) {
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                });;
    }

}