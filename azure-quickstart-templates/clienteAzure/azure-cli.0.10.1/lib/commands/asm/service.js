/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__tryCatch=__rt.__tryCatch; var __ = require("underscore");
















var util = require("util");

var profile = require("../../util/profile");

var utils = require("../../util/utils");

var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;

  var cloudService = cli.category("service").description($("Commands to manage your Cloud Services"));


  cloudService.command("create [serviceName]").description($("Create a cloud service")).usage("[options] <serviceName>").option("--serviceName <serviceName>", $("the cloud service name")).option("--description <description>", $("the description. Defaults to 'Service host'")).option("--location <location>", $("the location. Optional if affinitygroup is specified")).option("--affinitygroup <affinitygroup>", $("the affinity group. Optional if location is specified")).option("--label <label>", $("the label. Defaults to serviceName")).option("-s, --subscription <id>", $("the subscription id")).execute(function __1(serviceName, options, _) { var service, managementService, location, affinitygroup, createOptions, progress; var __frame = { name: "__1", line: 41 }; return __func(_, this, arguments, __1, 2, __frame, function __$__1() {









      service = utils.createComputeClient(profile.current.getSubscription(options.subscription));
      managementService = utils.createManagementClient(profile.current.getSubscription(options.subscription));

      return cli.interaction.promptIfNotGiven($("New cloud service name: "), serviceName, __cb(_, __frame, 4, 36, function ___(__0, __1) { serviceName = __1;
        location = options.location;
        affinitygroup = options.affinitygroup; return (function __$__1(__then) {

          if ((!location && !affinitygroup)) {

            return cli.interaction.chooseIfNotGiven($("Location: "), $("Getting locations"), location, function(cb) {

              managementService.locations.list(function(err, result) {
                if (err) { return cb(err); } ;

                cb(null, result.locations.map(function(location) { return location.name; })); }); }, __cb(_, __frame, 10, 35, function ___(__0, __2) { location = __2; __then(); }, true)); } else { __then(); } ; })(function __$__1() {




          createOptions = {
            serviceName: serviceName };


          if (__.isString(options.description)) {
            createOptions.description = options.description; } ;


          if (location) {
            createOptions.location = location; } ;


          if (affinitygroup) {
            createOptions.affinityGroup = affinitygroup; } ;


          if (options.label) {
            createOptions.label = options.label; }
           else {
            createOptions.label = serviceName; } ;


          progress = cli.interaction.progress($("Creating cloud service")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__1() {

                return service.hostedServices.create(createOptions, __cb(_, __frame, 44, 31, function __$__1() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__1() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__1() {


              cli.interaction.formatOutput({ serviceName: serviceName }, function(outputData) {
                log.data($("Cloud service name"), outputData.serviceName); }); _(); }); }); }); }, true)); }); });



  cloudService.command("list").description($("List Azure cloud services")).option("-s, --subscription <id>", $("the subscription id")).execute(function __2(options, _) { var service, cloudServices, progress; var __frame = { name: "__2", line: 98 }; return __func(_, this, arguments, __2, 1, __frame, function __$__2() {



      service = utils.createComputeClient(profile.current.getSubscription(options.subscription));


      progress = cli.interaction.progress($("Getting cloud services")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__2() {


            return service.hostedServices.list(__cb(_, __frame, 7, 47, function ___(__0, __1) { cloudServices = __1.hostedServices; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__2() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__2() {


          cli.interaction.formatOutput(cloudServices, function(outputData) {
            if ((outputData.length === 0)) {
              log.info($("No Cloud Services exist")); }
             else {
              log.table(outputData, function(row, item) {
                row.cell($("Name"), item.serviceName);
                row.cell($("Location"), (item.properties.location || ""));
                row.cell($("Affinity Group"), (item.properties.affinityGroup || "")); }); } ; }); _(); }); }); }); });





  cloudService.command("show [serviceName]").description($("Show Azure cloud service. Provides detailed information about deployments when used with --json option.")).usage("[options] <serviceName>").option("--serviceName <serviceName>", $("the cloud service name")).option("-s, --subscription <id>", $("the subscription id")).execute(function __3(serviceName, options, _) { var service, progress, cloudService; var __frame = { name: "__3", line: 128 }; return __func(_, this, arguments, __3, 2, __frame, function __$__3() {





      service = utils.createComputeClient(profile.current.getSubscription(options.subscription));

      return cli.interaction.promptIfNotGiven($("Cloud Service name: "), serviceName, __cb(_, __frame, 3, 36, function ___(__0, __1) { serviceName = __1;

        progress = cli.interaction.progress($("Getting cloud service")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__3() {


              return service.hostedServices.getDetailed(serviceName, __cb(_, __frame, 8, 46, function ___(__0, __2) { cloudService = __2; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__3() {

                progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__3() {


            if (cloudService) {
              cli.interaction.formatOutput(cloudService, function(outputData) {
                log.data($("Name"), outputData.serviceName);
                log.data($("Url"), outputData.uri);

                if (outputData.properties.extendedProperties) {
                  cli.interaction.logEachData($("Extended Properties"), outputData.properties.extendedProperties); } ;

                delete outputData.properties.extendedProperties;

                cli.interaction.logEachData($("Properties"), outputData.properties); }); }

             else {
              log.info($("Cloud service not found")); } ; _(); }); }); }, true)); }); });



  cloudService.command("delete [serviceName]").description($("Delete a cloud service")).usage("[options] <serviceName>").option("--serviceName <serviceName>", $("the cloud service name")).option("-q, --quiet", $("quiet mode, do not ask for delete confirmation")).option("-s, --subscription <id>", $("the subscription id")).execute(function __4(serviceName, options, _) { var service, progress; var __frame = { name: "__4", line: 164 }; return __func(_, this, arguments, __4, 2, __frame, function __$__4() {






      service = utils.createComputeClient(profile.current.getSubscription(options.subscription));

      return cli.interaction.promptIfNotGiven($("Cloud service name: "), serviceName, __cb(_, __frame, 3, 36, function ___(__0, __2) { serviceName = __2; return (function __$__4(_) {

          var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return cli.interaction.confirm(util.format($("Delete cloud service %s? [y/n] "), serviceName), __cb(_, __frame, 5, 45, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -163, 18, function ___(__0, __3) { return (function __$__4(__then) { if (__3) { return _(null); } else { __then(); } ; })(function __$__4() {



            progress = cli.interaction.progress($("Deleting cloud service")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__4() {

                  return service.hostedServices.deleteMethod(serviceName, __cb(_, __frame, 11, 31, function __$__4() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__4() {

                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__4() { _(); }); }); }); }, true)); }, true)); }); });



  cloudService.command("get-deployment-event [serviceName] [startTime] [endTime]").description($("Get details of deployment events.")).usage("[options] <serviceName> <startTime> <endTime>").option("--service-name <service-name>", $("the cloud service name")).option("-d, --deployment-name <deployment-name>", $("the deployment name")).option("-t, --start-time <start-time>", $("the start time specified in UTC e.g. 2015-06-17T17:58:50.4290652Z, 2015-06-17")).option("-e, --end-time <end-time>", $("the end time specified in UTC")).option("-s, --subscription <id>", $("the subscription id")).execute(function __5(serviceName, startTime, endTime, options, _) { var service, progress, deploymentEvents, showDeploymentEvents; var __frame = { name: "__5", line: 189 }; return __func(_, this, arguments, __5, 4, __frame, function __$__5() {








      service = utils.createComputeClient(profile.current.getSubscription(options.subscription));
      return cli.interaction.promptIfNotGiven($("Cloud service name: "), serviceName, __cb(_, __frame, 2, 36, function ___(__0, __1) { serviceName = __1;
        return cli.interaction.promptIfNotGiven($("Start time: "), startTime, __cb(_, __frame, 3, 34, function ___(__0, __2) { startTime = __2;
          return cli.interaction.promptIfNotGiven($("End time: "), endTime, __cb(_, __frame, 4, 32, function ___(__0, __3) { endTime = __3; return (function __$__5(__then) {



              if (options.deploymentName) {
                progress = cli.interaction.progress(util.format($("Getting deployment events of the deployment \"%s\" in the cloud service \"%s\""), options.deploymentName, serviceName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__5() {

                      return service.deployments.listEvents(serviceName, options.deploymentName, startTime, endTime, __cb(_, __frame, 11, 49, function ___(__0, __4) { deploymentEvents = __4; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__5() {

                        progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, __then); }); } else {


                progress = cli.interaction.progress(util.format($("Getting deployment events of deployments in the cloud service \"%s\""), serviceName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__5() {

                      return service.deployments.listEventsBySlot(serviceName, "Production", startTime, endTime, __cb(_, __frame, 18, 49, function ___(__0, __5) { deploymentEvents = __5; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__5() {

                        progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__5() {


                    showDeploymentEvents = function(events) {
                      var output = cli.output;
                      if ((events && (events.length > 0))) {
                        cli.interaction.formatOutput(events, function(events) {
                          output.header("Reboot events");
                          for (var i = 0; (i < events.length); i++) {
                            output.header(("Event #" + ((i + 1))));
                            output.nameValue();
                            var rebootEvent = events[i];
                            output.nameValue($("Role name"), rebootEvent.roleName, 2);
                            output.nameValue($("Instance name"), rebootEvent.instanceName, 2);
                            output.nameValue($("Reboot reason"), rebootEvent.rebootReason, 2);
                            output.nameValue($("Reboot start time"), rebootEvent.rebootStartTime, 2); }; }); }


                       else {
                        if (output.format().json) {
                          output.json([]); }
                         else {
                          output.warn($("No deployment events found")); } ; } ; };






                    showDeploymentEvents(deploymentEvents); __then(); }); }); } ; })(_); }, true)); }, true)); }, true)); }); });};
