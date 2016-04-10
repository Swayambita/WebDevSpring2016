(function(){
    angular.module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController(UserService,$rootScope,$location){
       var vm=this;
        vm.logout=logout;

        function init(){

        }
        init();

        function logout() {
            UserService.logout()
                .then(function () {
                    $rootScope.currentUser = null;
                    $location.url('/home');
                },
                    function (err) {
                    console.log(err);
                });
        }
    }
})();


