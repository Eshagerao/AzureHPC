/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var __ = require("underscore");















var util = require("util");
var utils = require("../../../util/utils");
var validation = require("../../../util/validation");
var $ = utils.getLocaleString;
var VirtualNetwork = require("./virtualNetwork");
var Nsg = require("./nsg");
var RouteTable = require("./routeTable");

function Subnet(cli, networkManagementClient) {
  this.networkManagementClient = networkManagementClient;
  this.vnetCrud = new VirtualNetwork(cli, networkManagementClient);
  this.nsgCrud = new Nsg(cli, networkManagementClient);
  this.routeTableCrud = new RouteTable(cli, networkManagementClient);
  this.output = cli.output;
  this.interaction = cli.interaction;};


__.extend(Subnet.prototype, {



  create: function create__1(resourceGroupName, vnetName, subnetName, options, _) { var self, parameters, vnet, subnet, progress, __this = this; var __frame = { name: "create__1", line: 38 }; return __func(_, this, arguments, create__1, 4, __frame, function __$create__1() { self = __this;


      parameters = { };
      return self._parseSubnet(resourceGroupName, parameters, options, __cb(_, __frame, 4, 22, function ___(__0, __1) { parameters = __1;

        return self.vnetCrud.get(resourceGroupName, vnetName, __cb(_, __frame, 6, 29, function ___(__0, __2) { vnet = __2;
          if (!vnet) {
            return _(new Error(util.format($("Virtual network \"%s\" not found in resource group \"%s\""), vnetName, resourceGroupName))); } ;


          return self.get(resourceGroupName, vnetName, subnetName, __cb(_, __frame, 11, 22, function ___(__0, __3) { subnet = __3;
            if (subnet) {
              return _(new Error(util.format($("A subnet with name \"%s\" already exists in the resource group \"%s\""), subnetName, resourceGroupName))); } ;


            progress = self.interaction.progress(util.format($("Creating subnet \"%s\""), subnetName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$create__1() {

                  return self.networkManagementClient.subnets.createOrUpdate(resourceGroupName, vnetName, subnetName, parameters, __cb(_, __frame, 18, 52, function ___(__0, __4) { subnet = __4; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$create__1() {

                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$create__1() {

                self._showSubnet(subnet, resourceGroupName, subnetName); _(); }); }); }, true)); }, true)); }, true)); }); },


  set: function set__2(resourceGroupName, vnetName, subnetName, options, _) { var self, vnet, subnet, progress, __this = this; var __frame = { name: "set__2", line: 63 }; return __func(_, this, arguments, set__2, 4, __frame, function __$set__2() { self = __this;


      return self.vnetCrud.get(resourceGroupName, vnetName, __cb(_, __frame, 3, 29, function ___(__0, __1) { vnet = __1;
        if (!vnet) {
          return _(new Error(util.format($("Virtual network \"%s\" not found in resource group \"%s\""), vnetName, resourceGroupName))); } ;


        return self.get(resourceGroupName, vnetName, subnetName, __cb(_, __frame, 8, 22, function ___(__0, __2) { subnet = __2;
          if (!subnet) {
            return _(new Error(util.format($("A subnet with name \"%s\" not found in the resource group \"%s\""), subnetName, resourceGroupName))); } ;


          return self._parseSubnet(resourceGroupName, subnet, options, __cb(_, __frame, 13, 18, function ___(__0, __3) { subnet = __3;

            progress = self.interaction.progress(util.format($("Updating subnet \"%s\""), subnetName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$set__2() {

                  return self.networkManagementClient.subnets.createOrUpdate(resourceGroupName, vnetName, subnetName, subnet, __cb(_, __frame, 17, 52, function ___(__0, __4) { subnet = __4; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$set__2() {

                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$set__2() {

                self._showSubnet(subnet, resourceGroupName, subnetName); _(); }); }); }, true)); }, true)); }, true)); }); },


  list: function list__3(resourceGroupName, vnetName, options, _) { var self, vnet, progress, subnets, __this = this; var __frame = { name: "list__3", line: 87 }; return __func(_, this, arguments, list__3, 3, __frame, function __$list__3() { self = __this;


      return self.vnetCrud.get(resourceGroupName, vnetName, __cb(_, __frame, 3, 29, function ___(__0, __1) { vnet = __1;
        if (!vnet) {
          return _(new Error(util.format($("Virtual network \"%s\" not found in resource group \"%s\""), vnetName, resourceGroupName))); } ;


        progress = self.interaction.progress($("Getting virtual network subnets "));
        subnets = null; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$list__3() {

              return self.networkManagementClient.subnets.list(resourceGroupName, vnetName, __cb(_, __frame, 11, 53, function ___(__0, __2) { subnets = __2; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$list__3() {

                progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$list__3() {


            self.interaction.formatOutput(subnets, function(subnets) {
              if ((subnets.length === 0)) {
                self.output.warn($("No subnets found")); }
               else {
                self.output.table(subnets, function(row, subnet) {
                  row.cell($("Name"), subnet.name);
                  row.cell($("Provisioning state"), subnet.provisioningState);
                  row.cell($("Address prefix"), subnet.addressPrefix); }); } ; }); _(); }); }); }, true)); }); },





  show: function show__4(resourceGroupName, vnetName, subnetName, options, _) { var self, vnet, subnet, __this = this; var __frame = { name: "show__4", line: 116 }; return __func(_, this, arguments, show__4, 4, __frame, function __$show__4() { self = __this;


      return self.vnetCrud.get(resourceGroupName, vnetName, __cb(_, __frame, 3, 29, function ___(__0, __1) { vnet = __1;
        if (!vnet) {
          return _(new Error(util.format($("Virtual network \"%s\" not found in resource group \"%s\""), vnetName, resourceGroupName))); } ;


        return self.get(resourceGroupName, vnetName, subnetName, __cb(_, __frame, 8, 22, function ___(__0, __2) { subnet = __2;
          self._showSubnet(subnet, resourceGroupName, subnetName); _(); }, true)); }, true)); }); },


  get: function get__5(resourceGroupName, vnetName, subnetName, _) { var self, progress, subnet, __this = this; var __frame = { name: "get__5", line: 128 }; return __func(_, this, arguments, get__5, 3, __frame, function __$get__5() { self = __this;

      progress = self.interaction.progress(util.format($("Looking up the subnet \"%s\""), subnetName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$get__5() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$get__5() {

                  return self.networkManagementClient.subnets.get(resourceGroupName, vnetName, subnetName, null, __cb(_, __frame, 4, 56, function ___(__0, __1) { subnet = __1;
                    return _(null, subnet); }, true)); }); })(function ___(e, __result) { __catch(function __$get__5() { if (e) {

                    if ((e.statusCode === 404)) {
                      return _(null, null); } ;

                    return _(e); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$get__5() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$get__5() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$get__5() { _(); }); }); }); },



  delete: function delete__6(resourceGroupName, vnetName, subnetName, options, _) { var self, vnet, subnet, progress, __this = this; var __frame = { name: "delete__6", line: 144 }; return __func(_, this, arguments, delete__6, 4, __frame, function __$delete__6() { self = __this;


      return self.vnetCrud.get(resourceGroupName, vnetName, __cb(_, __frame, 3, 29, function ___(__0, __2) { vnet = __2;
        if (!vnet) {
          return _(new Error(util.format($("Virtual network \"%s\" not found in resource group \"%s\""), vnetName, resourceGroupName))); } ;


        return self.get(resourceGroupName, vnetName, subnetName, __cb(_, __frame, 8, 22, function ___(__0, __3) { subnet = __3;
          if (!subnet) {
            return _(new Error(util.format($("A subnet with name \"%s\" not found in the resource group \"%s\""), subnetName, resourceGroupName))); } ; return (function __$delete__6(_) {


            var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return self.interaction.confirm(util.format($("Delete subnet \"%s\"? [y/n] "), subnetName), __cb(_, __frame, 13, 44, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -143, 17, function ___(__0, __4) { return (function __$delete__6(__then) { if (__4) { return _(null); } else { __then(); } ; })(function __$delete__6() {



              progress = self.interaction.progress(util.format($("Deleting subnet \"%s\""), subnetName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$delete__6() {

                    return self.networkManagementClient.subnets.deleteMethod(resourceGroupName, vnetName, subnetName, __cb(_, __frame, 19, 43, function __$delete__6() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$delete__6() {

                      progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$delete__6() { _(); }); }); }); }, true)); }, true)); }, true)); }); },






  _parseSubnet: function _parseSubnet__7(resourceGroupName, subnet, options, _) { var self, nsg, routeTable, __this = this; var __frame = { name: "_parseSubnet__7", line: 172 }; return __func(_, this, arguments, _parseSubnet__7, 3, __frame, function __$_parseSubnet__7() { self = __this;


      if (options.addressPrefix) {
        subnet.addressPrefix = validation.isCIDR(options.addressPrefix, "--address-prefix"); } ; return (function __$_parseSubnet__7(__then) {


        if (options.networkSecurityGroupId) {
          if (options.networkSecurityGroupName) { self.output.warn($("--network-security-group-name parameter will be ignored because --network-security-group-id and --network-security-group-name parameters are mutually exclusive")); } ;
          if (utils.argHasValue(options.networkSecurityGroupId)) {
            subnet.networkSecurityGroup = {
              id: options.networkSecurityGroupId }; }

           else {
            delete subnet.networkSecurityGroup; } ; __then(); } else { return (function __$_parseSubnet__7(__then) {

            if (options.networkSecurityGroupName) { return (function __$_parseSubnet__7(__then) {
                if (utils.argHasValue(options.networkSecurityGroupName)) {
                  return self.nsgCrud.get(resourceGroupName, options.networkSecurityGroupName, __cb(_, __frame, 18, 31, function ___(__0, __1) { nsg = __1;
                    if (!nsg) {
                      return _(new Error(util.format($("A network security group with name \"%s\" not found in the resource group \"%s\""), options.networkSecurityGroupName, resourceGroupName))); } ;

                    subnet.networkSecurityGroup = {
                      id: nsg.id }; __then(); }, true)); } else {


                  delete subnet.networkSecurityGroup; __then(); } ; })(__then); } else { __then(); } ; })(__then); } ; })(function __$_parseSubnet__7() { return (function __$_parseSubnet__7(__then) {



          if (options.routeTableId) {
            if (options.routeTableName) { self.output.warn($("--route-table-name parameter will be ignored because --route-table-id and --route-table-name parameters are mutually exclusive")); } ;
            if (utils.argHasValue(options.routeTableId)) {
              subnet.routeTable = {
                id: options.routeTableId }; }

             else {
              delete subnet.routeTable; } ; __then(); } else { return (function __$_parseSubnet__7(__then) {

              if (options.routeTableName) { return (function __$_parseSubnet__7(__then) {
                  if (utils.argHasValue(options.routeTableName)) {
                    return self.routeTableCrud.get(resourceGroupName, options.routeTableName, __cb(_, __frame, 41, 45, function ___(__0, __2) { routeTable = __2;
                      if (!routeTable) {
                        return _(new Error(util.format($("A route table with name \"%s\" not found in the resource group \"%s\""), options.routeTableName, resourceGroupName))); } ;

                      subnet.routeTable = {
                        id: routeTable.id }; __then(); }, true)); } else {


                    delete subnet.routeTable; __then(); } ; })(__then); } else { __then(); } ; })(__then); } ; })(function __$_parseSubnet__7() {



          return _(null, subnet); }); }); }); },


  _showSubnet: function(subnet, resourceGroupName, subnetName) {
    var self = this;

    self.interaction.formatOutput(subnet, function(subnet) {
      if ((subnet === null)) {
        self.output.warn(util.format($("A subnet with name \"%s\" not found in the resource group \"%s\""), subnetName, resourceGroupName));
        return; } ;


      self.output.nameValue($("Id"), subnet.id);
      self.output.nameValue($("Name"), subnet.name);
      self.output.nameValue($("Type"), subnet.type);
      self.output.nameValue($("Provisioning state"), subnet.provisioningState);
      self.output.nameValue($("Address prefix"), subnet.addressPrefix);
      if (subnet.networkSecurityGroup) {
        self.output.nameValue($("Network Security Group id"), subnet.networkSecurityGroup.id); } ;

      if (subnet.routeTable) {
        self.output.nameValue($("Route Table id"), subnet.routeTable.id); } ; }); }});





module.exports = Subnet;
