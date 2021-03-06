(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController(FormService,$rootScope,$location){

        var vm=this;
        vm.currentUser=$rootScope.currentUser;
        vm.message=null;

        vm.addForm=addForm;
        vm.updateForm=updateForm;
        vm.deleteForm=deleteForm;
        vm.selectForm=selectForm;

        function init(){

            if(vm.currentUser == null){
                $location.url("/home");
            }
            else{
                FormService.findAllFormsForUser(vm.currentUser._id)
                    .then(function(response){
                            vm.forms=response.data;
                        },
                        function(error){
                            vm.message="Error from server side";
                        })
            }
        }
        init();


        function addForm(formName){
            var userId=vm.currentUser._id;
            var newForm={"title":formName};
            if(formName!=null){
                FormService.addForm(newForm,userId)
                    .then(function(response){
                            vm.forms=response.data;
                            vm.formIndexSelected=null;
                            vm.formName=null;
                        },
                        function(error){
                            vm.message="Form couldnot be created"
                        })
            }
            else{
                vm.message="Enter a form name";
            }
        }

        function updateForm(form){
            if (form!= null) {
                var formToBeUpdatedId= vm.forms[vm.formIndexSelected]._id;
                var changedForm ={"title" : form, "userId" : vm.currentUser._id};
                FormService.updateForm(formToBeUpdatedId,changedForm)
                    .then(function(response){
                            finalList(response);
                        },
                        function(error){
                            vm.message="Error from server side";
                        })
            }
        }

        function finalList(response){
            FormService.findAllFormsForUser(vm.currentUser._id)
                .then(function(response){
                        vm.forms=response.data;
                        vm.formIndexSelected=null;
                        vm.formName=null;
                    },
                    function(error){
                        vm.message="Error from server side";
                    })
        }
        function selectForm(index){
            vm.formIndexSelected = index;
            vm.formName = vm.forms[index].title;
        }

        function deleteForm(index){
            var userId=vm.currentUser._id;
            vm.formIndexSelected = index;
            var formToDelete=vm.forms[index]._id;
            FormService.deleteForm(formToDelete,userId)
                .then(function(response){
                        vm.forms=response.data;
                        vm.formIndexSelected=null;
                        vm.formName=null;
                    },
                    function(error){
                        vm.message="Form couldnot be deleted"
                    })
        }
    }

})();


