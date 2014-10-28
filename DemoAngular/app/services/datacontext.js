(function () {
    'use strict';

    angular.module('app').factory('datacontext', ['breeze','common','entityManagerFactory', datacontext]);

    function datacontext(breeze, common, emFactory) {
        var $q = common.$q;
        var log = common.logger.log;
        var logError = common.logger.logError;
        var manager = emFactory.newManager();

        var service = {
            getProspects: getProspects,
            createProspect: createProspect,
            getProspectById:getProspectById,
            hasChanges: hasChanges,
            initContext: initContext,
            save: save
        };

        // create a new manager talking to sample service 
        return service;

        function getProspects(includeClosed) {
            log("Getting Prospects");
            var query = breeze.EntityQuery.from("Prospects").using(manager);

            if (!includeClosed) { // if excluding archived Todos ...
                // add filter clause limiting results to non-archived Todos
                query = query.where("closed", "==", false);
            }

            var promise = manager.executeQuery(query).catch(queryFailed);
            return promise;
        }

        function queryFailed(error) {
            logError(error.message, "Query failed");
            return $q.reject(error); // so downstream promise users know it failed
        }

        function hasChanges() {
            return manager.hasChanges();
        }

        function save() {
            var changeCount = manager.getChanges().length;
            var msg = (save)
              ? "Saving " + changeCount + " change(s) ..."
              : "No changes to save";

            log(msg);
            return manager
              .saveChanges()
              .then(function (data) {
                  log("Saved  " + changeCount);
              })
              .catch(function (error) {
                 opFailed('Save', error);
            });
        }

        function opFailed(name,err) {
            logError(name, err);
            if (err.entityErrors) {
                logError('validation-failed', err.entityErrors);
            }
        }

        function getProspectById(id, includeClosed) {
            var query = breeze.EntityQuery.from("Prospects").using(manager);
            query = query.where("id", "==", id);
            if (!includeClosed) { // if excluding archived Todos ...
                // add filter clause limiting results to non-archived Todos
                query = query.where("closed", "==", false);
            }
            var promise = manager.executeQuery(query).catch(queryFailed);
            return promise;
        }

        function createProspect(initialValues) {
            console.log('Inside createProspect');
            return manager.createEntity('Prospect', initialValues);
        }

        function deleteProspect(prospectItem) {
            prospectItem && prospectItem.entityAspect.setDeleted();
        }

        function initContext(serviceName) {
            console.log("Inside initContext");
            if (manager.metadataStore.isEmpty()) {
                console.log("loading metadata.");
                return manager.fetchMetadata();
            }
            return true;
        }
    }
})();