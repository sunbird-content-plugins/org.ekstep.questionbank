describe("EditorPlugin", function() {
  var plugin, popupService,dataObj,event;

  beforeEach(module('org.ekstep.questionbank'));

  beforeEach(function() {
    plugin = new org.ekstep.questionbank.EditorPlugin({}, {}, {});
    spyOn(plugin, "initialize").and.callThrough();
    spyOn(plugin, "loadHtml").and.callThrough();
    spyOn(plugin, "loadQSPlugins").and.callThrough();
    dataObj = {callback:undefined,data:undefined};
    event = {target:undefined,type:"org.ekstep.questionbank:showpopup"};
    popupService = jasmine.createSpyObj("popupService", ["loadNgModules", "open"]);
    spyOn(ecEditor, "getService").and.callFake(function(serviceName) {
      if (serviceName === ServiceConstants.POPUP_SERVICE) {
        return popupService;
      }
    });
  });
  describe("initialize", function() {
    it("should initialize dependancy plugins", function() {
      plugin.initialize();
      expect(ecEditor.getService).toHaveBeenCalled();
    });
  });

  describe("load HTML", function() {
    it("should call load html", function() {
      plugin.loadHtml(event,dataObj);
    });
  });
  describe("load All QS plugins", function() {
    it("should call load plugins", function() {
      var qsManifest = {"ver":1};
      expect(plugin.loadQSPlugins).toHaveBeenCalled();
    });
  });

}); 
