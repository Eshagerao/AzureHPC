/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var __ = require("underscore");

















var fs = require("fs");
var util = require("util");
var batchUtil = require("./batch.util");
var batchShowUtil = require("./batch.showUtil");
var utils = require("../../util/utils");
var startProgress = batchUtil.startProgress;
var endProgress = batchUtil.endProgress;

var $ = utils.getLocaleString;




exports.init = function(cli) {


  batchUtil.init(cli);




  var batch = cli.category("batch");

  var task = batch.category("task").description($("Commands to manage your Batch tasks"));

  var logger = cli.output;

  var interaction = cli.interaction;

  task.command("create [jobId] [json-file]").description($("Create a Batch task")).option("-j, --job-id <jobId>", $("the id of the job to which the task is to be added")).option("-f, --json-file <json-file>", $("the file containing either a single task object or an array of task objects in JSON format, if this parameter is specified, --id and --command-line parameters are ignored")).option("-i, --id <taskId>", $("the Batch task id")).option("-c, --command-line <command-line>", $("the command line of the task")).option("--affinity-id <affinity-id>", $("the opaque string representing the location of compute node or a task that has run previously")).option("--max-wall-clock-time <max-wall-clock-time>", $("the maximum elapsed time that the task may run, measured from the time the task starts, in ISO 8601 duration formation")).option("--max-task-retry-count <max-task-retry-count>", $("the maximum number of times the task may be retried")).option("--retention-time <retention-time>", $("the time in which the working directory for the task is retained, in ISO 8601 duration formation")).option("-e, --environment-settings <environment-settings>", $("the semicolon separated list of environment variable settings for the task, ex: name1=value1;name2=value2")).option("-r, --resources-files <resources-files>", $("the semicolon separated list of files that Batch will download to the compute node before running the command line, ex: blob1=file1;blob2=file2")).appendBatchAccountOption().execute(createTask);














  task.command("list [jobId]").description($("List Batch tasks under a job")).option("-j, --job-id <jobId>", $("the id of the job from which you want to get a list of tasks")).appendODataFilterOption(true, true, true).appendBatchAccountOption().execute(listTasks);






  task.command("show [jobId] [taskId]").description($("Show information on the specified Batch task")).option("-j, --job-id <jobId>", $("the Batch job id")).option("-i, --id <taskId>", $("the Batch task id")).option("--subtasks", $("display information about the subtasks of a multi-instance task")).appendODataFilterOption(true, false, true).appendCommonHeaderFilterOption(true, true).appendBatchAccountOption().execute(showTask);









  task.command("delete [jobId] [taskId]").description($("Delete the specified Batch task")).option("-j, --job-id <jobId>", $("the Batch job id")).option("-i, --id <taskId>", $("the Batch task id")).option("-q, --quiet", $("remove the specified Batch task without confirmation")).appendCommonHeaderFilterOption(true, true).appendBatchAccountOption().execute(deleteTask);








  task.command("set [jobId] [taskId]").description($("Update the properties of the specified Batch task")).option("-j, --job-id <jobId>", $("the Batch job id")).option("-i, --id <taskId>", $("the Batch task id")).option("--max-wall-clock-time <max-wall-clock-time>", $("the maximum elapsed time that the task may run, measured from the time the task starts, in ISO 8601 duration formation")).option("--max-task-retry-count <max-task-retry-count>", $("the maximum number of times the task may be retried")).option("--retention-time <retention-time>", $("the time in which the working directory for the task is retained, in ISO 8601 duration formation")).appendCommonHeaderFilterOption(true, true).appendBatchAccountOption().execute(updateTask);










  task.command("stop [jobId] [taskId]").description($("Terminate the specified Batch task")).option("-j, --job-id <jobId>", $("the Batch job id")).option("-i, --id <taskId>", $("the Batch task id")).option("-q, --quiet", $("terminate the specified Batch task without confirmation")).appendCommonHeaderFilterOption(true, true).appendBatchAccountOption().execute(terminateTask);



















  function createTask(jobId, jsonFile, options, _) { var parsedJson, multiTasks, addTask, client, resultMapper, commandLine, constraint, ref, objJson, tips, batchOptions, result; var __frame = { name: "createTask", line: 120 }; return __func(_, this, arguments, createTask, 3, __frame, function __$createTask() {
      if (!jobId) {
        jobId = options.jobId; } ;

      return interaction.promptIfNotGiven($("Job id: "), jobId, __cb(_, __frame, 4, 24, function ___(__0, __1) { jobId = __1;
        if (!jsonFile) {
          jsonFile = options.jsonFile; } ;


        parsedJson = null;
        multiTasks = false;
        addTask = null;
        client = batchUtil.createBatchServiceClient(options); return (function __$createTask(__then) {


          if (!jsonFile) { return (function __$createTask(__then) {
              if (!options.id) {
                return interaction.promptIfNotGiven($("JSON file name: "), jsonFile, __cb(_, __frame, 17, 31, function ___(__0, __2) { jsonFile = __2; __then(); }, true)); } else {

                parsedJson = { id: options.id };
                commandLine = options.commandLine; return (function __$createTask(__then) {
                  if (!commandLine) {
                    return cli.interaction.promptIfNotGiven($("Command Line: "), commandLine, __cb(_, __frame, 22, 40, function ___(__0, __3) { commandLine = __3; __then(); }, true)); } else { __then(); } ; })(function __$createTask() {

                  __.extend(parsedJson, { commandLine: commandLine });

                  if (options.affinityId) {
                    __.extend(parsedJson, { affinityInfo: { affinityId: options.affinityId } }); } ;


                  constraint = { };
                  if (options.maxWallClockTime) {
                    __.extend(constraint, { maxWallClockTime: options.maxWallClockTime }); } ;

                  if (options.maxTaskRetryCount) {
                    __.extend(constraint, { maxTaskRetryCount: Number(options.maxTaskRetryCount) }); } ;

                  if (options.retentionTime) {
                    __.extend(constraint, { retentionTime: options.retentionTime }); } ;

                  if (!__.isEmpty(constraint)) {

                    __.extend(parsedJson, { constraints: constraint }); } ;



                  if (options.environmentSettings) {
                    ref = [];
                    options.environmentSettings.split(";").forEach(function(entry) {
                      var item = entry.split("=");
                      ref.push({ name: item[0], value: item[1] }); });

                    __.extend(parsedJson, { environmentSettings: ref }); } ;

                  if (options.resourcesFiles) {
                    ref = [];
                    options.resourcesFiles.split(";").forEach(function(entry) {
                      var item = entry.split("=");
                      ref.push({ blobSource: item[0], filePath: item[1] }); });

                    __.extend(parsedJson, { resourceFiles: ref }); } ;


                  resultMapper = new client.models["TaskAddParameter"]().mapper();
                  addTask = client.deserialize(resultMapper, parsedJson, "result"); __then(); }); } ; })(__then); } else { __then(); } ; })(function __$createTask() {



          if (jsonFile) {
            objJson = fs.readFileSync(jsonFile).toString();
            parsedJson = JSON.parse(objJson);

            resultMapper = new client.models["TaskAddParameter"]().mapper();
            addTask = client.deserialize(resultMapper, parsedJson, "result");
            if ((!addTask || (Object.keys(addTask).length === 0))) {
              if ((parsedJson.length > 100)) {
                return _(new Error($("Too many tasks specified. The maximum number of tasks that can be added in a single request is 100."))); } ;

              if ((parsedJson.length === 0)) {
                return _(new Error($("Invalid json file."))); } ;

              addTask = [];
              parsedJson.forEach(function(entry) {
                addTask.push(client.deserialize(resultMapper, entry, "result")); });

              multiTasks = true; } ; } ;



          tips = $("Creating Batch task");
          batchOptions = { };

          startProgress(tips); return (function __$createTask(__then) {

            if (multiTasks) {
              batchOptions.taskAddCollectionOptions = batchUtil.getBatchOperationDefaultOption();

              result = null; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$createTask() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$createTask() {

                          return client.task.addCollection(jobId, addTask, batchOptions, __cb(_, __frame, 99, 29, function ___(__0, __4) { result = __4; __then(); }, true)); }); })(function ___(err, __result) { __catch(function __$createTask() { if (err) {

                            if (err.message) {
                              if ((typeof err.message === "object")) {
                                err.message = err.message.value; } ; } ;



                            return _(err); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$createTask() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$createTask() {


                      endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$createTask() {


                  cli.interaction.formatOutput(result.value, function(outputData) {
                    if ((outputData.length === 0)) {
                      logger.info($("No task creation result found")); }
                     else {
                      logger.table(outputData, function(row, item) {
                        row.cell($("Task Id"), item.taskId);
                        row.cell($("Status"), item.status);
                        row.cell($("Error"), (item.error ? item.error.code : "")); }); } ; }); __then(); }); }); } else {




              batchOptions.taskAddOptions = batchUtil.getBatchOperationDefaultOption(); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$createTask() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$createTask() {


                          return client.task.add(jobId, addTask, batchOptions, __cb(_, __frame, 128, 20, __then, true)); }); })(function ___(err, __result) { __catch(function __$createTask() { if (err) {

                            if (err.message) {
                              if ((typeof err.message === "object")) {
                                err.message = err.message.value; } ; } ;



                            return _(err); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$createTask() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$createTask() {


                      endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$createTask() {


                  logger.verbose(util.format($("Task %s has been created successfully"), addTask.id));
                  return showTask(jobId, addTask.id, options, __cb(_, __frame, 143, 6, __then, true)); }); }); } ; })(_); }); }, true)); }); };










  function showTask(jobId, taskId, options, _) { var client, tips, batchOptions, batchSubtaskOptions, task, subTasks; var __frame = { name: "showTask", line: 274 }; return __func(_, this, arguments, showTask, 3, __frame, function __$showTask() {
      client = batchUtil.createBatchServiceClient(options);
      if (!jobId) {
        jobId = options.jobId; } ;

      return interaction.promptIfNotGiven($("Job id: "), jobId, __cb(_, __frame, 5, 24, function ___(__0, __1) { jobId = __1;
        if (!taskId) {
          taskId = options.id; } ;

        return interaction.promptIfNotGiven($("Task id: "), taskId, __cb(_, __frame, 9, 25, function ___(__0, __2) { taskId = __2;
          tips = $("Getting Batch task information");

          batchOptions = { };
          batchOptions.taskGetOptions = batchUtil.getBatchOperationDefaultOption();

          if (options.selectClause) {
            batchOptions.taskGetOptions.select = options.selectClause; } ;

          if (options.expandClause) {
            batchOptions.taskGetOptions.expand = options.expandClause; } ;


          batchSubtaskOptions = { };
          batchSubtaskOptions.taskListSubtasksOptions = batchUtil.getBatchOperationDefaultOption();

          if (options.selectClause) {
            batchSubtaskOptions.taskGetOptions.select = options.selectClause; } ;


          task = null;
          subTasks = null;

          startProgress(tips); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$showTask() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$showTask() {

                      return client.task.get(jobId, taskId, batchOptions, __cb(_, __frame, 34, 25, function ___(__0, __3) { task = __3; return (function __$showTask(__then) {
                          if (options.subtasks) {
                            return client.task.listSubtasks(jobId, taskId, batchSubtaskOptions, __cb(_, __frame, 36, 31, function ___(__0, __4) { subTasks = __4; __then(); }, true)); } else { __then(); } ; })(__then); }, true)); }); })(function ___(e, __result) { __catch(function __$showTask() { if (e) {


                        if (batchUtil.isNotFoundException(e)) {
                          return _(new Error(util.format($("Task %s does not exist"), taskId))); }
                         else {
                          if (e.message) {
                            if ((typeof e.message === "object")) {
                              e.message = e.message.value; } ; } ;



                          return _(e); } ; __then(); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$showTask() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$showTask() {


                  endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$showTask() {


              batchShowUtil.showCloudTask(task, subTasks, cli.output); _(); }); }); }, true)); }, true)); }); };








  function listTasks(jobId, options, _) { var client, tips, batchOptions, tasks, nextLink; var __frame = { name: "listTasks", line: 337 }; return __func(_, this, arguments, listTasks, 2, __frame, function __$listTasks() {
      client = batchUtil.createBatchServiceClient(options);
      if (!jobId) {
        jobId = options.jobId; } ;

      return interaction.promptIfNotGiven($("Job id: "), jobId, __cb(_, __frame, 5, 24, function ___(__0, __1) { jobId = __1;
        tips = $("Listing Batch tasks");
        batchOptions = { };
        batchOptions.taskListOptions = batchUtil.getBatchOperationDefaultOption();

        if (options.selectClause) {
          batchOptions.taskListOptions.select = options.selectClause; } ;

        if (options.expandClause) {
          batchOptions.taskListOptions.expand = options.expandClause; } ;

        if (options.filterClause) {
          batchOptions.taskListOptions.filter = options.filterClause; } ;


        tasks = [];
        startProgress(tips); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$listTasks() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$listTasks() {


                    return client.task.list(jobId, batchOptions, __cb(_, __frame, 24, 27, function ___(__0, __2) { result = __2;
                      result.forEach(function(task) {
                        tasks.push(task); });

                      nextLink = result.odatanextLink; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$listTasks() { __more = false;

                          var __6 = nextLink; if (__6) {
                            batchOptions = batchUtil.getBatchOperationDefaultOption();
                            options.taskListOptions = batchOptions;
                            return client.task.listNext(nextLink, batchOptions, __cb(_, __frame, 33, 29, function ___(__0, __3) { result = __3;
                              result.forEach(function(task) {
                                tasks.push(task); });

                              nextLink = result.odatanextLink; while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); }, true)); }); })(function ___(err, __result) { __catch(function __$listTasks() { if (err) {



                      if (err.message) {
                        if ((typeof err.message === "object")) {
                          err.message = err.message.value; } ; } ;



                      return _(err); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$listTasks() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$listTasks() {

                endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$listTasks() {


            cli.interaction.formatOutput(tasks, function(outputData) {
              if ((outputData.length === 0)) {
                logger.info($("No task found")); }
               else {
                logger.table(outputData, function(row, item) {
                  row.cell($("Id"), item.id);
                  row.cell($("State"), item.state);
                  row.cell($("Command Line"), item.commandLine); }); } ; }); _(); }); }); }, true)); }); };












  function deleteTask(jobId, taskId, options, _) { var client, tips, batchOptions; var __frame = { name: "deleteTask", line: 409 }; return __func(_, this, arguments, deleteTask, 3, __frame, function __$deleteTask() {
      client = batchUtil.createBatchServiceClient(options);
      if (!jobId) {
        jobId = options.id; } ;

      return interaction.promptIfNotGiven($("Job id: "), jobId, __cb(_, __frame, 5, 24, function ___(__0, __1) { jobId = __1;
        if (!taskId) {
          taskId = options.id; } ;

        return interaction.promptIfNotGiven($("Task id: "), taskId, __cb(_, __frame, 9, 25, function ___(__0, __2) { taskId = __2;
          tips = util.format($("Deleting task %s"), taskId);
          batchOptions = { };
          batchOptions.taskDeleteMethodOptions = batchUtil.getBatchOperationDefaultOption();

          if (options.ifMatch) {
            batchOptions.taskDeleteMethodOptions.ifMatch = options.ifMatch; } ;

          if (options.ifNoneMatch) {
            batchOptions.taskDeleteMethodOptions.ifNoneMatch = options.ifNoneMatch; } ;

          if (options.ifModifiedSince) {
            batchOptions.taskDeleteMethodOptions.ifModifiedSince = options.ifModifiedSince; } ;

          if (options.ifUnmodifiedSince) {
            batchOptions.taskDeleteMethodOptions.ifUnmodifiedSince = options.ifUnmodifiedSince; } ; return (function __$deleteTask(__then) {


            if (!options.quiet) {
              return interaction.confirm(util.format($("Do you want to delete task %s? [y/n]: "), taskId), __cb(_, __frame, 28, 23, function ___(__0, __4) { var __3 = !__4; return (function __$deleteTask(__then) { if (__3) { return _(null); } else { __then(); } ; })(__then); }, true)); } else { __then(); } ; })(function __$deleteTask() {




            startProgress(tips); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$deleteTask() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$deleteTask() {


                        return client.task.deleteMethod(jobId, taskId, batchOptions, __cb(_, __frame, 36, 18, __then, true)); }); })(function ___(err, __result) { __catch(function __$deleteTask() { if (err) {

                          if (batchUtil.isNotFoundException(err)) {
                            return _(new Error(util.format($("Task %s does not exist"), taskId))); }
                           else {
                            if (err.message) {
                              if ((typeof err.message === "object")) {
                                err.message = err.message.value; } ; } ;



                            return _(err); } ; __then(); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$deleteTask() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$deleteTask() {


                    endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$deleteTask() {


                logger.info(util.format($("Task %s has been deleted successfully"), taskId)); _(); }); }); }); }, true)); }, true)); }); };









  function terminateTask(jobId, taskId, options, _) { var client, tips, batchOptions; var __frame = { name: "terminateTask", line: 472 }; return __func(_, this, arguments, terminateTask, 3, __frame, function __$terminateTask() {
      client = batchUtil.createBatchServiceClient(options);
      if (!jobId) {
        jobId = options.id; } ;

      return interaction.promptIfNotGiven($("Job id: "), jobId, __cb(_, __frame, 5, 24, function ___(__0, __1) { jobId = __1;
        if (!taskId) {
          taskId = options.id; } ;

        return interaction.promptIfNotGiven($("Task id: "), taskId, __cb(_, __frame, 9, 25, function ___(__0, __2) { taskId = __2;
          tips = util.format($("Terminating task %s"), taskId);
          batchOptions = { };
          batchOptions.taskTerminateOptions = batchUtil.getBatchOperationDefaultOption();

          if (options.ifMatch) {
            batchOptions.taskTerminateOptions.ifMatch = options.ifMatch; } ;

          if (options.ifNoneMatch) {
            batchOptions.taskTerminateOptions.ifNoneMatch = options.ifNoneMatch; } ;

          if (options.ifModifiedSince) {
            batchOptions.taskTerminateOptions.ifModifiedSince = options.ifModifiedSince; } ;

          if (options.ifUnmodifiedSince) {
            batchOptions.taskTerminateOptions.ifUnmodifiedSince = options.ifUnmodifiedSince; } ; return (function __$terminateTask(__then) {


            if (!options.quiet) {
              return interaction.confirm(util.format($("Do you want to terminate task %s? [y/n]: "), taskId), __cb(_, __frame, 28, 23, function ___(__0, __4) { var __3 = !__4; return (function __$terminateTask(__then) { if (__3) { return _(null); } else { __then(); } ; })(__then); }, true)); } else { __then(); } ; })(function __$terminateTask() {




            startProgress(tips); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$terminateTask() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$terminateTask() {


                        return client.task.terminate(jobId, taskId, batchOptions, __cb(_, __frame, 36, 18, __then, true)); }); })(function ___(err, __result) { __catch(function __$terminateTask() { if (err) {

                          if (batchUtil.isNotFoundException(err)) {
                            return _(new Error(util.format($("Task %s does not exist"), taskId))); }
                           else {
                            if (err.message) {
                              if ((typeof err.message === "object")) {
                                err.message = err.message.value; } ; } ;



                            return _(err); } ; __then(); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$terminateTask() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$terminateTask() {


                    endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$terminateTask() {


                logger.info(util.format($("Task %s has been terminated successfully"), taskId)); _(); }); }); }); }, true)); }, true)); }); };










  function updateTask(jobId, taskId, jsonFile, options, _) { var constraint, client, resultMapper, updateTaskParam, tips, batchOptions; var __frame = { name: "updateTask", line: 536 }; return __func(_, this, arguments, updateTask, 4, __frame, function __$updateTask() {
      if (!jobId) {
        jobId = options.jobId; } ;

      return interaction.promptIfNotGiven($("Job id: "), jobId, __cb(_, __frame, 4, 24, function ___(__0, __1) { jobId = __1;
        if (!taskId) {
          taskId = options.id; } ;

        return interaction.promptIfNotGiven($("Task id: "), taskId, __cb(_, __frame, 8, 25, function ___(__0, __2) { taskId = __2;

          if (((!options.maxWallClockTime && !options.maxTaskRetryCount) && !options.retentionTime)) {
            return _(new Error($("You must specify at least one of the folowing: --max-wall-clock-time, --max-task-retry-count and --retention-time."))); } ;

          constraint = { };
          if (options.maxWallClockTime) {
            __.extend(constraint, { maxWallClockTime: options.maxWallClockTime }); } ;

          if (options.maxTaskRetryCount) {
            __.extend(constraint, { maxTaskRetryCount: Number(options.maxTaskRetryCount) }); } ;

          if (options.retentionTime) {
            __.extend(constraint, { retentionTime: options.retentionTime }); } ;


          client = batchUtil.createBatchServiceClient(options);
          resultMapper = new client.models["TaskUpdateParameter"]().mapper();
          updateTaskParam = client.deserialize(resultMapper, { constraints: constraint }, "result");

          tips = util.format($("Updating task %s"), taskId);

          batchOptions = { };
          batchOptions.taskUpdateOptions = batchUtil.getBatchOperationDefaultOption();


          batchOptions.constraints = updateTaskParam.constraints;

          if (options.ifMatch) {
            batchOptions.taskUpdateOptions.ifMatch = options.ifMatch; } ;

          if (options.ifNoneMatch) {
            batchOptions.taskUpdateOptions.ifNoneMatch = options.ifNoneMatch; } ;

          if (options.ifModifiedSince) {
            batchOptions.taskUpdateOptions.ifModifiedSince = options.ifModifiedSince; } ;

          if (options.ifUnmodifiedSince) {
            batchOptions.taskUpdateOptions.ifUnmodifiedSince = options.ifUnmodifiedSince; } ;


          startProgress(tips); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$updateTask() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$updateTask() {


                      return client.task.update(jobId, taskId, batchOptions, __cb(_, __frame, 52, 18, __then, true)); }); })(function ___(err, __result) { __catch(function __$updateTask() { if (err) {

                        if (batchUtil.isNotFoundException(err)) {
                          return _(new Error(util.format($("Task %s does not exist"), taskId))); }
                         else {
                          if (err.message) {
                            if ((typeof err.message === "object")) {
                              err.message = err.message.value; } ; } ;



                          return _(err); } ; __then(); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$updateTask() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$updateTask() {


                  endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$updateTask() {


              logger.verbose(util.format($("Task %s has been updated successfully"), taskId));
              return showTask(jobId, taskId, options, __cb(_, __frame, 70, 4, function __$updateTask() { _(); }, true)); }); }); }, true)); }, true)); }); };};
