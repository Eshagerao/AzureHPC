/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; var profile = require("../../../util/profile");

















var utils = require("../../../util/utils");

var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;

  var group = cli.category("group");
  var deployment = group.category("deployment").description($("Commands to manage your deployment in a resource group"));

  var operation = deployment.category("operation").description($("Commands to list deployment operations in a resource group"));


  operation.command("list [resource-group] [name]").description($("Lists operations in a deployment")).option("-g --resource-group <resource-group>", $("the name of the resource group")).option("-n --name <name>", $("the name of the deployment")).option("--subscription <subscription>", $("the subscription identifier")).execute(function __1(resourceGroup, name, options, _) { var subscription, client, operationsList; var __frame = { name: "__1", line: 37 }; return __func(_, this, arguments, __1, 3, __frame, function __$__1() {





      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } ;

      if (!name) {
        return _(null, cli.missingArgument("name")); } ;


      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createResourceClient(subscription);
      operationsList = [];

      return cli.interaction.withProgress($("Getting deployoment operations"), function __1(log, _) { var operationsResult; var __frame = { name: "__1", line: 50 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {

          return client.deploymentOperations.list(resourceGroup, name, __cb(_, __frame, 1, 61, function ___(__0, __1) { operationsResult = __1;
            operationsList.push.apply(operationsList, operationsResult); return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$__1() { __more = false;

                var __4 = operationsResult.nextLink; if (__4) {
                  log.info($("Getting more operations"));
                  return client.deploymentOperations.listNext(operationsResult.nextLink, __cb(_, __frame, 6, 59, function ___(__0, __2) { operationsResult = __2;
                    operationsList.push.apply(operationsList, operationsResult); while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(_); }, true)); }); }, __cb(_, __frame, 12, 22, function __$__1() {




        if (log.format().json) {
          log.json(operationsList); }
         else {
          displayOperations(operationsList, log); } ; _(); }, true)); }); });};




function displayOperations(operations, log) {
  for (var index = 0; (index < operations.length); ++index) {
    log.data($("Id:                  "), operations[index]["id"]);
    log.data($("OperationId:         "), operations[index]["operationId"]);

    var operationProperties = operations[index]["properties"];
    log.data($("Provisioning State:  "), operationProperties["provisioningState"]);
    log.data($("Timestamp:           "), operationProperties["timestamp"]);
    log.data($("Status Code:         "), operationProperties["statusCode"]);
    log.data($("Status Message:      "), operationProperties["statusMessage"]);

    var operationTargetResource = operationProperties["targetResource"];
    log.data($("Target Resource Id:  "), operationTargetResource["id"]);
    log.data($("Target Resource Name:"), operationTargetResource["resourceName"]);
    log.data($("Target Resource Type:"), operationTargetResource["resourceType"]);
    log.data($("---------------------"));
    log.data($("")); };};