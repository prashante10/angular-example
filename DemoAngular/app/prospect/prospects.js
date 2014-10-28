(function () {
    'use strict';

    var controllerId = 'prospects';
    angular.module('app').controller(controllerId, ['common', 'datacontext', prospects]);

    function prospects(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Prospects';
        vm.includeClosed = true;
        vm.items = [];

        activate();

        function activate() {
            var promises = [loadItems()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Prospects View'); });
        }

        function loadItems() {
            return datacontext.getProspects(vm.includeClosed).then(success).catch(failed);
        }

        function success(db) {
            vm.items = db.results;
        }
        function failed(error) {
            vm.errorMessage = error.message;
        }
    }
})();