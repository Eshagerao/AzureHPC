/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var __ = require("underscore");















var util = require("util");
var utils = require("../../../util/utils");
var validation = require("../../../util/validation");
var $ = utils.getLocaleString;
var resourceUtils = require("../resource/resourceUtils");
var tagUtils = require("../tag/tagUtils");

function LocalNetworkGateway(cli, networkManagementClient) {
  this.networkManagementClient = networkManagementClient;
  this.output = cli.output;
  this.interaction = cli.interaction;};


__.extend(LocalNetworkGateway.prototype, {



  create: function create__1(resourceGroupName, gatewayName, options, _) { var self, parameters, gateway, progress, __this = this; var __frame = { name: "create__1", line: 34 }; return __func(_, this, arguments, create__1, 3, __frame, function __$create__1() { self = __this;


      parameters = {
        location: options.location,
        localNetworkAddressSpace: {
          addressPrefixes: [] } };



      parameters = self._parseGateway(parameters, options);

      return self.get(resourceGroupName, gatewayName, __cb(_, __frame, 12, 23, function ___(__0, __1) { gateway = __1;
        if (gateway) {
          return _(new Error(util.format($("A local network gateway with name \"%s\" already exists in the resource group \"%s\""), gatewayName, resourceGroupName))); } ;


        progress = self.interaction.progress(util.format($("Creating local network gateway \"%s\""), gatewayName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$create__1() {

              return self.networkManagementClient.localNetworkGateways.createOrUpdate(resourceGroupName, gatewayName, parameters, __cb(_, __frame, 19, 66, function ___(__0, __2) { gateway = __2; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$create__1() {

                progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$create__1() {

            self._showGateway(gateway, resourceGroupName, gatewayName); _(); }); }); }, true)); }); },


  set: function set__2(resourceGroupName, gatewayName, options, _) { var self, gateway, progress, __this = this; var __frame = { name: "set__2", line: 60 }; return __func(_, this, arguments, set__2, 3, __frame, function __$set__2() { self = __this;


      return self.get(resourceGroupName, gatewayName, __cb(_, __frame, 3, 23, function ___(__0, __1) { gateway = __1;
        if (!gateway) {
          return _(new Error(util.format($("A local network gateway with name \"%s\" not found in the resource group \"%s\""), gatewayName, resourceGroupName))); } ;


        gateway = self._parseGateway(gateway, options);

        progress = self.interaction.progress(util.format($("Updating local network gateway \"%s\""), gatewayName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$set__2() {

              return self.networkManagementClient.localNetworkGateways.createOrUpdate(resourceGroupName, gatewayName, gateway, __cb(_, __frame, 12, 66, function ___(__0, __2) { gateway = __2; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$set__2() {

                progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$set__2() {


            self._showGateway(gateway, resourceGroupName, gatewayName); _(); }); }); }, true)); }); },


  list: function list__3(resourceGroupName, options, _) { var self, gateways, progress, __this = this; var __frame = { name: "list__3", line: 80 }; return __func(_, this, arguments, list__3, 2, __frame, function __$list__3() { self = __this;


      gateways = null;
      progress = self.interaction.progress($("Looking up local network gateways")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$list__3() {


            return self.networkManagementClient.localNetworkGateways.list(resourceGroupName, __cb(_, __frame, 7, 67, function ___(__0, __1) { gateways = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$list__3() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$list__3() {


          self.interaction.formatOutput(gateways, function(gateways) {
            if ((gateways.length === 0)) {
              self.output.warn($("No local network gateways found")); }
             else {
              self.output.table(gateways, function(row, gateway) {
                row.cell($("Name"), gateway.name);
                row.cell($("Location"), gateway.location);
                var resInfo = resourceUtils.getResourceInformation(gateway.id);
                row.cell($("Resource group"), resInfo.resourceGroup);
                row.cell($("Provisioning state"), gateway.provisioningState);
                row.cell($("IP Address"), gateway.gatewayIpAddress);
                var addressPrefixes = gateway.localNetworkAddressSpace.addressPrefixes;
                var address = "";
                if ((addressPrefixes.length > 0)) { address = addressPrefixes[0]; };
                if ((addressPrefixes.length > 1)) { address += ", ..."; };
                row.cell($("Address prefixes"), address); }); } ; }); _(); }); }); }); },





  show: function show__4(resourceGroupName, gatewayName, options, _) { var self, gateway, __this = this; var __frame = { name: "show__4", line: 113 }; return __func(_, this, arguments, show__4, 3, __frame, function __$show__4() { self = __this;

      return self.get(resourceGroupName, gatewayName, __cb(_, __frame, 2, 23, function ___(__0, __1) { gateway = __1;

        self._showGateway(gateway, resourceGroupName, gatewayName); _(); }, true)); }); },


  delete: function delete__5(resourceGroupName, gatewayName, options, _) { var self, gateway, progress, __this = this; var __frame = { name: "delete__5", line: 120 }; return __func(_, this, arguments, delete__5, 3, __frame, function __$delete__5() { self = __this;

      return self.get(resourceGroupName, gatewayName, __cb(_, __frame, 2, 23, function ___(__0, __2) { gateway = __2;

        if (!gateway) {
          return _(new Error(util.format($("A local network gateway with name \"%s\" not found in the resource group \"%s\""), gatewayName, resourceGroupName))); } ; return (function __$delete__5(_) {


          var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return self.interaction.confirm(util.format($("Delete local network gateway \"%s\"? [y/n] "), gatewayName), __cb(_, __frame, 8, 44, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -119, 17, function ___(__0, __3) { return (function __$delete__5(__then) { if (__3) { return _(null); } else { __then(); } ; })(function __$delete__5() {



            progress = self.interaction.progress(util.format($("Deleting local network gateway \"%s\""), gatewayName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$delete__5() {

                  return self.networkManagementClient.localNetworkGateways.deleteMethod(resourceGroupName, gatewayName, __cb(_, __frame, 14, 56, function __$delete__5() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$delete__5() {

                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$delete__5() { _(); }); }); }); }, true)); }, true)); }); },



  get: function get__6(resourceGroupName, gatewayName, _) { var self, progress, gateway, __this = this; var __frame = { name: "get__6", line: 140 }; return __func(_, this, arguments, get__6, 2, __frame, function __$get__6() { self = __this;

      progress = self.interaction.progress(util.format($("Looking up local network gateway \"%s\""), gatewayName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$get__6() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$get__6() {


                  return self.networkManagementClient.localNetworkGateways.get(resourceGroupName, gatewayName, null, __cb(_, __frame, 5, 70, function ___(__0, __1) { gateway = __1;
                    return _(null, gateway); }, true)); }); })(function ___(e, __result) { __catch(function __$get__6() { if (e) {

                    if ((e.statusCode === 404)) {
                      return _(null, null); } ;

                    return _(e); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$get__6() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$get__6() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$get__6() { _(); }); }); }); },






  _parseGateway: function(gateway, options) {
    if (options.ipAddress) {
      gateway.gatewayIpAddress = validation.isIP(options.ipAddress, "--ip-address"); } ;


    if (options.addressSpace) {
      if (utils.argHasValue(options.tags)) {
        options.addressSpace.split(",").forEach(function(addressPrefix) {
          validation.isCIDR(addressPrefix, "--address-space");
          gateway.localNetworkAddressSpace.addressPrefixes.push(addressPrefix); }); }

       else {
        gateway.localNetworkAddressSpace.addressPrefixes = []; } ; } ;



    if (options.tags) {
      if (utils.argHasValue(options.tags)) {
        tagUtils.appendTags(gateway, options); }
       else {
        gateway.tags = { }; } ; } ;



    return gateway; },


  _showGateway: function(gateway, resourceGroupName, gatewayName) {
    var self = this;

    self.interaction.formatOutput(gateway, function(gateway) {
      if ((gateway === null)) {
        self.output.warn(util.format($("A local network gateway with name \"%s\" not found in the resource group \"%s\""), gatewayName, resourceGroupName));
        return; } ;


      self.output.nameValue($("Id"), gateway.id);
      self.output.nameValue($("Name"), gateway.name);
      self.output.nameValue($("Type"), gateway.type);
      self.output.nameValue($("Location"), gateway.location);
      self.output.nameValue($("Provisioning state"), gateway.provisioningState);
      self.output.nameValue($("Tags"), tagUtils.getTagsInfo(gateway.tags));
      self.output.nameValue($("IP Address"), gateway.gatewayIpAddress);

      if ((gateway.localNetworkAddressSpace.addressPrefixes.length > 0)) {
        self.output.header("Address prefixes");
        gateway.localNetworkAddressSpace.addressPrefixes.forEach(function(address) {
          self.output.listItem(address, 2); }); } ; }); }});






module.exports = LocalNetworkGateway;
