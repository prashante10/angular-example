(function () {
    'use strict';

    var controllerId = 'prospectdetail';
    angular.module('app').controller(controllerId, ['$routeParams', 'common', 'datacontext', '$q', prospects]);

    function prospects(vars, common, db, $q) {

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Prospects';
        vm.errorMessage = '';
        vm.addItem = addItem;
        vm.save = save;
        vm.goBack = goBack;
        vm.cancel = cancel;
        vm.hasChanges= {
            get:function() {
                if (!!db) return db.hasChanges();
                return false;
            }
        }
        vm.model = blankProspect();

        Object.defineProperty(vm, "canSave", {
            get: function () {
                if (!!db) return db.hasChanges();
                    return false;
            }
        });

        activate();

        function activate() {
            console.log('activate method for prospect details.');
            var promises = [getProspect(vars.id)];
            console.log('added promise');
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Prospect Detail View'); });
        }

        function goBack() {
            
        }

        function cancel() {

        }

        function blankProspect() {
            return {
                notes: 'Some Additional Notes',
                name: 'Your Prospect Name Here',
                type: 1,
                closed: true
            };
        }

        function getProspect(id) {
            if('new' == id || 'new' !== id) {
                vm.model = db.createProspect(blankProspect());
                return vm.model;
            } else {
                return db.getProspectById(id).then(function(rows) {
                    if (rows.length) {
                        vm.model = rows[0];
                    } else {
                        console.log(rows);
                    }
                }).catch(function(err) {
                    vm.errorMessage = "Error while getting speaker id = " + id + "; " + err;
                });
            }
        }

        function save() {
            // Save if have changes to save
            console.log('In Save.');
            if (db.hasChanges()) {
                return db.save();
            }
            // Decided not to save; return resolved promise w/ no result
            return $q.when(false);
        }

        function addItem(){}
    }
})();