/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__tryCatch=__rt.__tryCatch; var util = require("util");



























var profile = require("../../../util/profile");
var tagUtils = require("../tag/tagUtils");
var utils = require("../../../util/utils");

var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;

  var powerbiembeddedcli = cli.category("powerbi").description($("Commands to manage your Azure Power BI Embedded Workspace Collections"));





  powerbiembeddedcli.command("create <resourceGroup> <name> <location> [tags]").description($("Create a new workspace collection")).option("-g --resource-group <resourceGroup>", $("Name of the resource group")).option("-n --name <name>", $("The name of the new workspace collection")).option("-l --location <location>", $("The location (azure region/datacenter) where the workspace collection will be provisioned")).option("-t --tags [tags]", $((("Tags to set to the resource group. Can be multiple. " + "In the format of 'name=value'. Name is required and value is optional. ") + "For example, -t 'tag1=value1;tag2'. Providing an empty string '' will delete the tags."))).option("-s --subscription [subscription]", $("The subscription identifier")).execute(function __1(resourceGroup, name, location, tags, options, _) { var subscription, client, tagsObject, workspaceCollectionCreationOptions, progress, workspaceCollection; var __frame = { name: "__1", line: 53 }; return __func(_, this, arguments, __1, 5, __frame, function __$__1() {










      options.location = (options.location || location);
      options.tags = (options.tags || tags);


      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } ;

      if (!name) {
        return _(null, cli.missingArgument("name")); } ;



      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createPowerbiManagementClient(subscription);


      tagsObject = { };
      if (options.tags) {
        tagsObject = tagUtils.buildTagsParameter(null, options); } ;


      workspaceCollectionCreationOptions = {
        location: options.location,
        tags: tagsObject,
        sku: {
          name: "S1",
          tier: "Standard" } };



      progress = cli.interaction.progress(util.format($("Creating workspace collection: %s"), name)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__1() {


            return client.workspaceCollections.create(resourceGroup, name, workspaceCollectionCreationOptions, __cb(_, __frame, 35, 58, function ___(__0, __1) { workspaceCollection = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__1() {


              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__1() {


          log.info("WorkspaceCollection created:");
          cli.interaction.formatOutput(workspaceCollection, function(workspaceCollection) {
            var workspaceCollectionProperties = [{
              key: "name", value: workspaceCollection.name
            },{ key: "location", value: workspaceCollection.location



            },{ key: "tags", value: tagUtils.getTagsInfo(workspaceCollection.tags) },];


            log.table(workspaceCollectionProperties, function(row, workspaceCollectionProperty) {
              row.cell($("Property"), workspaceCollectionProperty.key);
              row.cell($("Value"), workspaceCollectionProperty.value); }); }); _(); }); }); }); });

































































































  powerbiembeddedcli.command("list [resourceGroup]").description($("List workspace collections within subscription or within resource group")).option("-g --resource-group [resourceGroup]", $("Name of the resource group")).option("-s --subscription [subscription]", $("The subscription identifier")).execute(function __2(resourceGroup, options, _) { var subscription, client, workspaceCollections, progress; var __frame = { name: "__2", line: 209 }; return __func(_, this, arguments, __2, 2, __frame, function __$__2() {





      options.resourceGroup = (options.resourceGroup || resourceGroup);


      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createPowerbiManagementClient(subscription); return (function __$__2(__then) {




        if (options.resourceGroup) {
          progress = cli.interaction.progress($(((("Getting workspace collections in subscription " + subscription.id) + " and within resource group: ") + options.resourceGroup))); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__2() {

                return client.workspaceCollections.listByResourceGroup(options.resourceGroup, __cb(_, __frame, 14, 61, function ___(__0, __1) { workspaceCollections = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__2() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, __then); }); } else {



          progress = cli.interaction.progress($(("Getting workspace collections in subscription: " + subscription.id))); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__2() {

                return client.workspaceCollections.listBySubscription(__cb(_, __frame, 22, 61, function ___(__0, __2) { workspaceCollections = __2; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__2() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, __then); }); } ; })(function __$__2() {




        cli.interaction.formatOutput(workspaceCollections, function(workspaceCollections) {
          if ((workspaceCollections.length === 0)) {
            log.info($("No workspace collections found."));
            return; } ;


          log.table(workspaceCollections, function(row, workspaceCollection) {
            var resourceGroup = null;
            var resourceGroupMatches = workspaceCollection.id.match(/resourceGroups\/([^\/]+)/);
            if (resourceGroupMatches) {
              resourceGroup = resourceGroupMatches[1]; } ;


            row.cell($("Name"), workspaceCollection.name);
            row.cell($("Group"), resourceGroup);
            row.cell($("Location"), workspaceCollection.location);
            row.cell($("Provisioning State"), workspaceCollection.properties.provisioningState);
            row.cell($("Tags"), tagUtils.getTagsInfo(workspaceCollection.tags)); }); }); _(); }); }); });







  var keys = powerbiembeddedcli.category("keys").description($("Commands to manage your Power BI Workspace Collection keys"));


  keys.command("list <resourceGroup> <name>").description($("Get access keys for a workspace collection")).option("-g --resource-group <resourceGroup>", $("Name of the resource group")).option("-n --name <name>", $("Name of workspace collection")).option("-s --subscription [subscription]", $("The subscription identifier")).execute(function __3(resourceGroup, name, options, _) { var subscription, client, progress, accessKeys; var __frame = { name: "__3", line: 271 }; return __func(_, this, arguments, __3, 3, __frame, function __$__3() {






      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } ;

      if (!name) {
        return _(null, cli.missingArgument("name")); } ;



      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createPowerbiManagementClient(subscription);


      progress = cli.interaction.progress($("Getting workspace collection access keys...")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__3() {


            return client.workspaceCollections.getAccessKeys(resourceGroup, name, __cb(_, __frame, 17, 49, function ___(__0, __1) { accessKeys = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__3() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__3() {



          cli.interaction.formatOutput(accessKeys, function(accessKeys) {
            var keys = [{
              name: "key1 (Primary)", key: accessKeys.key1
            },{ name: "key2 (Secondary)", key: accessKeys.key2 },];


            log.table(keys, function(row, key) {
              row.cell($("Name"), key.name);
              row.cell($("Key"), key.key); }); }); _(); }); }); }); });







  keys.command("renew <resourceGroup> <name>").description($("Get access keys for a workspace collection")).option("-g --resource-group <resourceGroup>", $("Name of the resource group")).option("-n --name <name>", $("Name of workspace collection")).option("--primary", $("Renew the Primary key")).option("--secondary", $("Renew the Secondary key")).option("-s --subscription [subscription]", $("The subscription identifier")).execute(function __4(resourceGroup, name, options, _) { var keyName, subscription, client, progress, accessKeys, body, key1name, key2name; var __frame = { name: "__4", line: 317 }; return __func(_, this, arguments, __4, 3, __frame, function __$__4() {








      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } ;

      if (!name) {
        return _(null, cli.missingArgument("name")); } ;


      if ((!options.primary && !options.secondary)) {
        return _(new Error($("Need to specify either --primary or --secondary"))); } else {
        if ((options.primary && options.secondary)) {
          return _(new Error($("Only one of primary or secondary keys can be renewed at a time"))); } ; } ;


      keyName = "key1";
      if (options.secondary) {
        keyName = "key2"; } ;



      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createPowerbiManagementClient(subscription);


      progress = cli.interaction.progress($(("Regenerate workspace collection access key: " + keyName)));


      body = {
        keyName: keyName }; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__4() {


            return client.workspaceCollections.regenerateKey(resourceGroup, name, body, __cb(_, __frame, 32, 49, function ___(__0, __1) { accessKeys = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__4() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__4() {



          key1name = "key1 (Primary)";
          if ((keyName === "key1")) {
            key1name += " (Regenerated)"; } ;


          key2name = "key2 (Secondary)";
          if ((keyName === "key2")) {
            key2name += " (Regenerated)"; } ;


          cli.interaction.formatOutput(accessKeys, function(accessKeys) {
            var keys = [{
              name: key1name, key: accessKeys.key1
            },{ name: key2name, key: accessKeys.key2 },];


            log.table(keys, function(row, key) {
              row.cell($("Name"), key.name);
              row.cell($("Key"), key.key); }); }); _(); }); }); }); });







  var workspaces = powerbiembeddedcli.category("workspaces").description($("Commands to manage your Power BI Workspaces"));


  workspaces.command("list <resourceGroup> <name>").description($("Get workspaces within given workspace collection")).option("-g --resource-group <resourceGroup>", $("Name of the resource group")).option("-n --name <name>", $("Name of workspace collection")).option("-s --subscription [subscription]", $("The subscription identifier")).execute(function __5(resourceGroup, name, options, _) { var subscription, client, progress, workspaces; var __frame = { name: "__5", line: 389 }; return __func(_, this, arguments, __5, 3, __frame, function __$__5() {






      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } ;

      if (!name) {
        return _(null, cli.missingArgument("name")); } ;



      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createPowerbiManagementClient(subscription);


      progress = cli.interaction.progress($("Fetching workspaces...")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__5() {



            return client.workspaces.list(resourceGroup, name, __cb(_, __frame, 18, 39, function ___(__0, __1) { workspaces = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__5() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__5() {



          cli.interaction.formatOutput(workspaces, function(workspaces) {
            if ((workspaces.length === 0)) {
              log.info($("No workspaces found."));
              return; } ;


            log.table(workspaces, function(row, workspace) {
              row.cell($("Name"), workspace.name); }); }); _(); }); }); }); });};
