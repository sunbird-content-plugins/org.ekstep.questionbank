/**
 * Plugin to add questions in question stage.
 * @class org.ekstep.questionbank
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Swati Singh <swati.singh@tarento.com>
 */
org.ekstep.questionbank = {};
org.ekstep.questionbank.EditorPlugin = org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.questionbank",
  _plugins : [],
  initialize: function () {
    ecEditor.addEventListener(this.manifest.id + ":showpopup", this.loadHtml, this);
    ecEditor.addEventListener(this.manifest.id + ":getPlugins", this.getplugins, this);
    var templatePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'editor/questionbankmodal.html');
    var controllerPath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'editor/questionbankcontroller.js');
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
  },
  /**
   * Open window to add question and options
   * @memberOf org.ekstep.questionbank
   * @param {string} event Type of event
   * @param {Object} dataObj Object passed when dispatched
   */
  loadHtml: function (event, dataObj) {
    var instance = this;
    this.loadQSPlugins();
    instance.callback = dataObj.callback;
    instance.editData = (!ecEditor._.isUndefined(dataObj.data)) ? dataObj.data : '';
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).open({
      template: 'QuestionFormTemplate',
      controller: 'QuestionFormController',
      controllerAs: '$ctrl',
      resolve: {
        'pluginInstance': function () {
          return instance;
        }
      }
    });
  },
  loadQSPlugins: function(){
    var instance = this;
    var qsManifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.questionset");
    var qsVesrion = qsManifest.ver.split('.')[0];
    var data = {
      "request": {
        "filters": {
          "objectType": ["Content"],
          "contentType": ["Plugin"],
          "targets.id": "org.ekstep.questionset",
          "targets.ver": {'<=': Number(qsVesrion)},
          "status": "Live"
        },
        "limit": 50,
        "fields": ['contentType','semanticVersion','appIcon']
      }
    };

    var pluginsData;
    if(_.isFunction(ecEditor.getService('search').pluginsSearch)){
      var url = ecEditor.getConfig('pluginsRepoUrl') ? ecEditor.getConfig('pluginsRepoUrl') : undefined; 
      ecEditor.getService('search').pluginsSearch(url, data, function(err, resp) {
       if(!err){ 
          pluginsData = resp.data.result.content;
          instance.pluginsRespHandler(pluginsData);
       }
      });
    }else{
      ecEditor.getService('search').search(data, function(err, resp) {
       if(!err){ 
          pluginsData = resp.data.result.content;
          instance.pluginsRespHandler(pluginsData);
       }
     });
    }
  },
  pluginsRespHandler: function(pluginsData){
    var instance = this;
    instance._plugins = pluginsData;
    var plugins = [];
    ecEditor._.forEach(pluginsData, function(value, key) { // eslint-disable-line no-unused-vars
      if (value) {
        var obj = {
          "id": value.identifier,
          "ver": value.semanticVersion,
          "type": 'plugin'
        }
        plugins.push(obj);
      }
    });
    org.ekstep.pluginframework.pluginManager.loadAllPlugins(_.isArray(plugins) ? plugins : [plugins], []);
  },
  getplugins: function(event, callback){
    var instance = this;
    callback(instance._plugins);
  }
});
//# sourceURL=questionBankPlugin.js