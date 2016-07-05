/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var __ = require("underscore");















var util = require("util");
var utils = require("../../../util/utils");
var $ = utils.getLocaleString;
var constants = require("./constants");
var NetworkConfig = require("./networkConfig");
var Nsg = require("./nsg");

function Subnet(cli, networkManagementClient) {
  this.networkManagementClient = networkManagementClient;
  this.networkConfig = new NetworkConfig(cli, networkManagementClient);
  this.nsgCrud = new Nsg(cli, networkManagementClient);
  this.output = cli.output;
  this.interaction = cli.interaction;};


__.extend(Subnet.prototype, {
  create: function create__1(vnetName, subnetName, options, _) { var self, networkConfiguration, vNetList, vNet, subnetsList, subnet, nsg, subnetInput, progress, __this = this; var __frame = { name: "create__1", line: 33 }; return __func(_, this, arguments, create__1, 3, __frame, function __$create__1() { self = __this;

      return self.networkConfig.get(__cb(_, __frame, 2, 50, function ___(__0, __1) { networkConfiguration = __1;
        vNetList = networkConfiguration.VirtualNetworkConfiguration.VirtualNetworkSites;
        vNet = utils.findFirstCaseIgnore(vNetList, { Name: vnetName });
        if (!vNet) {
          return _(new Error(util.format($("A virtual network with name \"%s\" not found"), vnetName))); } ;

        if (!vNet.Subnets) {
          vNet.Subnets = []; } ;


        subnetsList = vNet.Subnets;
        subnet = utils.findFirstCaseIgnore(subnetsList, { Name: subnetName });
        if (subnet) {
          return _(new Error(util.format($("A subnet with name \"%s\" already exists in the virtual network\"%s\""), subnetName, vnetName))); } ; return (function __$create__1(__then) {


          if (options.networkSecurityGroupName) {
            return self.nsgCrud.get(options.networkSecurityGroupName, constants.nsg.levelDef, __cb(_, __frame, 19, 29, function ___(__0, __2) { nsg = __2;
              if (!nsg) {
                return _(new Error(util.format($("A network security group with name \"%s\" not found"), options.networkSecurityGroupName))); } ; __then(); }, true)); } else { __then(); } ; })(function __$create__1() {



          subnetInput = {
            Name: subnetName,
            AddressPrefix: options.addressPrefix };


          subnetsList.push(subnetInput);
          progress = self.interaction.progress(util.format($("Creating subnet \"%s\""), subnetName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$create__1() {

                return self.networkConfig.set(networkConfiguration, __cb(_, __frame, 33, 25, function __$create__1() { return (function __$create__1(__then) {
                    if (options.networkSecurityGroupName) {
                      return self.addNsg(options.networkSecurityGroupName, vnetName, subnetName, options, __cb(_, __frame, 35, 13, __then, true)); } else { __then(); } ; })(function __$create__1() { _(null, null, true); }); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$create__1() {


                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$create__1() {

              return self.show(vnetName, subnetName, options, __cb(_, __frame, 40, 9, function __$create__1() { _(); }, true)); }); }); }); }, true)); }); },


  set: function set__2(vnetName, subnetName, options, _) { var self, networkConfiguration, vNetList, vNet, subnetList, subnet, progress, __this = this; var __frame = { name: "set__2", line: 76 }; return __func(_, this, arguments, set__2, 3, __frame, function __$set__2() { self = __this;

      return self.networkConfig.get(__cb(_, __frame, 2, 50, function ___(__0, __1) { networkConfiguration = __1;
        vNetList = networkConfiguration.VirtualNetworkConfiguration.VirtualNetworkSites;
        vNet = utils.findFirstCaseIgnore(vNetList, { Name: vnetName });
        if (!vNet) {
          return _(new Error(util.format($("A virtual network with name \"%s\" not found"), vnetName))); } ;


        subnetList = vNet.Subnets;
        subnet = utils.findFirstCaseIgnore(subnetList, { Name: subnetName });
        if (!subnet) {
          return _(new Error(util.format($("A virtual network \"%s\" does not contain a subnet with name \"%s\""), vnetName, subnetName))); } ;


        if (options.addressPrefix) {
          subnet.AddressPrefix = options.addressPrefix; } ;


        progress = self.interaction.progress(util.format($("Updating subnet \"%s\""), subnetName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$set__2() {

              return self.networkConfig.set(networkConfiguration, __cb(_, __frame, 21, 25, function __$set__2() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$set__2() {

                progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$set__2() {

            return self.show(vnetName, subnetName, options, __cb(_, __frame, 25, 9, function __$set__2() { _(); }, true)); }); }); }, true)); }); },


  list: function list__3(vnetName, options, _) { var self, vNetList, vnet, __this = this; var __frame = { name: "list__3", line: 104 }; return __func(_, this, arguments, list__3, 2, __frame, function __$list__3() { self = __this;

      return self._getNetworkSites(options, __cb(_, __frame, 2, 24, function ___(__0, __1) { vNetList = __1;

        vnet = utils.findFirstCaseIgnore(vNetList, { Name: vnetName });
        if (vnet) {
          self.interaction.formatOutput(vnet.Subnets, function(data) {
            if ((!data || (data.length === 0))) {
              throw new Error($("No virtual network subnets found")); }
             else {
              self.output.table(data, function(row, item) {
                row.cell($("Name"), item.Name);
                row.cell($("Address prefix"), item.AddressPrefix); }); } ; }); }



         else {
          self.output.warn(util.format($("Virtual network with name \"%s\" not found"), vnetName)); } ; _(); }, true)); }); },



  get: function get__4(vnetName, subnetName, options, _) { var self, progress, vNetList, vnet, subnetList, __this = this; var __frame = { name: "get__4", line: 125 }; return __func(_, this, arguments, get__4, 3, __frame, function __$get__4() { self = __this;

      progress = self.interaction.progress(util.format($("Looking up the subnet \"%s\""), subnetName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$get__4() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$get__4() {

                  return self._getNetworkSites(options, __cb(_, __frame, 4, 26, function ___(__0, __1) { vNetList = __1;
                    vnet = utils.findFirstCaseIgnore(vNetList, { Name: vnetName });
                    if (!vnet) {
                      self.output.warn(util.format($("Virtual network with name \"%s\" not found"), vnetName)); return _(null); } ;



                    subnetList = vnet.Subnets;
                    if ((!subnetList || (subnetList.length === 0))) {
                      return _(new Error($("Virtual network has no subnets"))); } ;

                    return _(null, utils.findFirstCaseIgnore(subnetList, { Name: subnetName })); }, true)); }); })(function ___(e, __result) { __catch(function __$get__4() { if (e) {

                    if ((e.statusCode === 404)) {
                      return _(null, null); } ;

                    return _(e); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$get__4() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$get__4() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$get__4() { _(); }); }); }); },



  show: function show__5(vnetName, subnetName, options, _) { var self, subnet, __this = this; var __frame = { name: "show__5", line: 151 }; return __func(_, this, arguments, show__5, 3, __frame, function __$show__5() { self = __this;

      return self.get(vnetName, subnetName, options, __cb(_, __frame, 2, 22, function ___(__0, __1) { subnet = __1;

        self.interaction.formatOutput(subnet, function(subnet) {
          if (subnet) {
            self.output.nameValue($("Name"), subnet.Name);
            self.output.nameValue($("Address prefix"), subnet.AddressPrefix); }
           else {
            if (self.output.format().json) {
              self.output.json({ }); }
             else {
              self.output.warn(util.format($("A virtual network subnet with name \"%s\" not found"), subnetName)); } ; } ; }); _(); }, true)); }); },





  delete: function delete__6(vnetName, subnetName, options, _) { var self, networkConfiguration, vnet, index, __this = this; var __frame = { name: "delete__6", line: 169 }; return __func(_, this, arguments, delete__6, 3, __frame, function __$delete__6() { self = __this;

      return self.networkConfig.get(__cb(_, __frame, 2, 50, function ___(__0, __2) { networkConfiguration = __2;

        vnet = utils.findFirstCaseIgnore(networkConfiguration.VirtualNetworkConfiguration.VirtualNetworkSites, { Name: vnetName });
        if (!vnet) {
          return _(new Error(util.format($("A virtual network with name \"%s\" not found"), vnetName))); } ;


        index = utils.indexOfCaseIgnore(vnet.Subnets, { Name: subnetName });
        if ((index === -1)) {
          return _(new Error(util.format($("Virtual network subnet with name \"%s\" not found in virtual network \"%s\""), subnetName, vnetName))); } ; return (function __$delete__6(_) {


          var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return self.interaction.confirm(util.format($("Delete the virtual network subnet \"%s\" ? [y/n] "), subnetName), __cb(_, __frame, 14, 44, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -168, 17, function ___(__0, __3) { return (function __$delete__6(__then) { if (__3) { return _(null); } else { __then(); } ; })(function __$delete__6() {



            vnet.Subnets.splice(index, 1);
            return self.networkConfig.set(networkConfiguration, __cb(_, __frame, 19, 23, function __$delete__6() { _(); }, true)); }); }, true)); }, true)); }); },


  addNsg: function addNsg__7(nsgName, vnetName, subnetName, options, _) { var self, nsg, subnet, parameters, progress, __this = this; var __frame = { name: "addNsg__7", line: 191 }; return __func(_, this, arguments, addNsg__7, 4, __frame, function __$addNsg__7() { self = __this;

      return self.nsgCrud.get(nsgName, constants.nsg.levelDef, __cb(_, __frame, 2, 27, function ___(__0, __1) { nsg = __1;
        if (!nsg) {
          return _(new Error(util.format($("A network security group with name \"%s\" not found"), nsgName))); } ;


        return self.get(vnetName, subnetName, options, __cb(_, __frame, 7, 22, function ___(__0, __2) { subnet = __2;
          if (!subnet) {
            return _(new Error(util.format($("A subnet with name \"%s\" was not found in virtual network \"%s\""), subnetName, vnetName))); } ;


          parameters = {
            name: nsgName };


          progress = self.interaction.progress(util.format($("Creating a network security group \"%s\""), nsgName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$addNsg__7() {

                return self.networkManagementClient.networkSecurityGroups.addToSubnet(vnetName, subnetName, parameters, __cb(_, __frame, 18, 57, function __$addNsg__7() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$addNsg__7() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$addNsg__7() { _(); }); }); }, true)); }, true)); }); },



  removeNsg: function removeNsg__8(nsgName, vnetName, subnetName, options, _) { var self, nsg, subnet, progress, __this = this; var __frame = { name: "removeNsg__8", line: 215 }; return __func(_, this, arguments, removeNsg__8, 4, __frame, function __$removeNsg__8() { self = __this;

      return self.nsgCrud.get(nsgName, constants.nsg.levelDef, __cb(_, __frame, 2, 27, function ___(__0, __2) { nsg = __2;
        if (!nsg) {
          return _(new Error(util.format($("A network security group with name \"%s\" not found"), nsgName))); } ;


        return self.get(vnetName, subnetName, options, __cb(_, __frame, 7, 22, function ___(__0, __3) { subnet = __3;
          if (!subnet) {
            return _(new Error(util.format($("A subnet with name \"%s\" was not found in virtual network \"%s\""), subnetName, vnetName))); } ; return (function __$removeNsg__8(_) {


            var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return self.interaction.confirm(util.format($("Delete nsg \"%s\" and subnet \"%s\" association? [y/n] "), nsgName, subnetName), __cb(_, __frame, 12, 44, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -214, 17, function ___(__0, __4) { return (function __$removeNsg__8(__then) { if (__4) { return _(null); } else { __then(); } ; })(function __$removeNsg__8() {



              progress = self.interaction.progress(util.format($("Creating a network security group \"%s\""), nsgName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$removeNsg__8() {

                    return self.networkManagementClient.networkSecurityGroups.removeFromSubnet(vnetName, subnetName, nsgName, __cb(_, __frame, 18, 57, function __$removeNsg__8() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$removeNsg__8() {

                      progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$removeNsg__8() { _(); }); }); }); }, true)); }, true)); }, true)); }); },



  _getNetworkSites: function _getNetworkSites__9(options, _) { var self, networkConfiguration, __this = this; var __frame = { name: "_getNetworkSites__9", line: 239 }; return __func(_, this, arguments, _getNetworkSites__9, 1, __frame, function __$_getNetworkSites__9() { self = __this;

      return self.networkConfig.get(__cb(_, __frame, 2, 50, function ___(__0, __1) { networkConfiguration = __1;
        if (!networkConfiguration.VirtualNetworkConfiguration) {
          networkConfiguration.VirtualNetworkConfiguration = { }; } ;

        return _(null, networkConfiguration.VirtualNetworkConfiguration.VirtualNetworkSites); }, true)); }); }});



module.exports = Subnet;
