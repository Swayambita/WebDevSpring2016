(function(){
    "use strict";
    angular.module("FormBuilderApp")
     .controller("FormController",FormController);

    function FormController($scope,FormService,$rootScope){

        var formIndexSelected;
        var currentUserForms = [];
        var currentUser;

        if($rootScope.currentUser === null){
            $location.url("/home");
        }
        else{
            currentUser = $rootScope.currentUser;
            FormService.findAllFormsForUser(currentUser._id,renderForms);
        }

        $scope.addForm=addForm;
        $scope.updateForm=updateForm;
        $scope.deleteForm=deleteForm;
        $scope.selectForm=selectForm;


        function addForm(formName){
           if(formName!=null){
               var newForm={
                   "_id":null,
                   "title":formName,
                   "userId":null
               };
               FormService.createFormForUser(currentUser._id,newForm,renderAddForm);

           }
        }

        function renderAddForm(newForm){
            $scope.formName = null;
            currentUserForms.push(newForm);
            $scope.forms = currentUserForms;
        }

        function updateForm(formName) {
            if (formName != null) {
                var formSelected = currentUserForms[formIndexSelected];
                formSelected.title = formName;
                FormService.updateFormById(formSelected._id, formSelected, renderFormAfterAction);
                $scope.formName = null;
            }else {
                $scope.alertMessage = "Please Select a form to update";
            }
        }

        function deleteForm(index){
            formIndexSelected = index;
            FormService.deleteFormById(currentUserForms[index]._id,renderFormAfterAction);
        }

        function renderFormAfterAction(userforms){
            FormService.findAllFormsForUser(currentUser._id,renderForms);
        }
        function selectForm(index){
            formIndexSelected = index;
            $scope.formName = currentUserForms[index].title;
        }

        function renderForms(userforms){
            $scope.forms = userforms;
            currentUserForms = userforms;
        }

    }

})();


