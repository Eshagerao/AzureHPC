/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; var util = require("util");


















var profile = require("../../../util/profile");
var providerUtils = require("./providerUtils");
var utils = require("../../../util/utils");

var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;
  var withProgress = cli.interaction.withProgress.bind(cli.interaction);

  var provider = cli.category("provider").description($("Commands to manage resource provider registrations"));



  provider.command("list").description($("List currently registered providers in ARM")).option("-s --subscription <subscription>", $("Subscription to list providers for")).execute(withClient(function __1(client, options, _) { var providers; var __frame = { name: "__1", line: 37 }; return __func(_, this, arguments, __1, 2, __frame, function __$__1() {




      return withProgress($("Getting ARM registered providers"), function __1(log, _) { var __frame = { name: "__1", line: 40 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {

          return providerUtils.getAllProviders(client, __cb(_, __frame, 1, 36, function ___(__0, __1) { providers = __1; _(); }, true)); }); }, __cb(_, __frame, 2, 6, function __$__1() {


        cli.interaction.formatOutput(providers, function(data) {
          if ((data.length === 0)) {
            log.info($("No providers defined")); }
           else {
            log.table(data, function(row, provider) {
              row.cell($("Namespace"), provider.namespace);
              row.cell($("Registered"), provider.registrationState); }); } ; }); _(); }, true)); }); }));





  provider.command("show [namespace]").description($("Show details about the requested provider namespace")).usage("[options] <namespace>").option("-n --namespace <namespace>", $("the provider namespace to show")).option("-s --subscription <subscription", $("subscription to show provider for")).execute(withClient(function __2(client, namespace, options, _) { var provider; var __frame = { name: "__2", line: 61 }; return __func(_, this, arguments, __2, 3, __frame, function __$__2() {





      return withProgress($("Getting provider information"), function __1(log, _) { var __frame = { name: "__1", line: 63 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {

          return client.providers.get(namespace, __cb(_, __frame, 1, 34, _, true)); }); }, __cb(_, __frame, 1, 21, function ___(__0, __2) { provider = __2;

        cli.interaction.formatOutput(provider, function(data) {
          if (!data) {
            log.info($("No provider information available")); }
           else {
            log.data($("Namespace:"), data.namespace);
            log.data($("Registration state:"), data.registrationState);
            log.data("");
            log.table(data.resourceTypes, function(row, rt) {
              row.cell($("Resource Type Name"), rt.resourceType);
              row.cell($("Locations"), rt.locations.join(", ")); }); } ; }); _(); }, true)); }); }));





  provider.command("register [namespace]").description($("Register namespace provider with the subscription")).usage("[options] <namespace>").option("-n --namespace <namespace>", $("the provider namespace to register")).option("-s --subscription <subscription>", $("Subscription to register")).execute(function __3(namespace, options, _) { var subscription; var __frame = { name: "__3", line: 86 }; return __func(_, this, arguments, __3, 2, __frame, function __$__3() {





      if (!namespace) {
        return _(null, cli.missingArgument("namespace")); } ;


      subscription = profile.current.getSubscription(options.subscription);
      return withProgress(util.format($("Registering provider %s with subscription %s"), namespace, subscription.id), function __1(log, _) { var __frame = { name: "__1", line: 93 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {

          return subscription.registerArmProvider(namespace, true, __cb(_, __frame, 1, 23, function __$__1() { _(); }, true)); }); }, __cb(_, __frame, 6, 6, function __$__3() { _(); }, true)); }); });



  provider.command("unregister [namespace]").description($("Un-register namespace provider with the subscription")).usage("[options] <namespace>").option("-n --namespace <namespace>", $("the provider namespace to register")).option("-s --subscription <subscription>", $("Subscription to register")).execute(function __4(namespace, options, _) { var subscription; var __frame = { name: "__4", line: 103 }; return __func(_, this, arguments, __4, 2, __frame, function __$__4() {





      if (!namespace) {
        return _(null, cli.missingArgument("namespace")); } ;


      subscription = profile.current.getSubscription(options.subscription);
      return withProgress(util.format($("Un-registering provider %s with subscription %s"), namespace, subscription.id), function __1(log, _) { var __frame = { name: "__1", line: 110 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {

          return subscription.unRegisterArmProvider(namespace, __cb(_, __frame, 1, 23, function __$__1() { _(); }, true)); }); }, __cb(_, __frame, 6, 6, function __$__4() { _(); }, true)); }); });};




function withClient(wrappedFunction) {
  return function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var options = args[(args.length - 2)];
    var subscription = profile.current.getSubscription(options.subscription);
    var client = utils.createResourceClient(subscription);
    return wrappedFunction.apply(this, [client,].concat(args)); };};
