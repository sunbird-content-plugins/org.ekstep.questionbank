describe("Question bank EditorPlugin", function() {
  var plugin, $controller, $window, $scope,assessmentService,searchService,question;

  beforeEach(module('createquestionapp'));

  beforeEach(function(done) {
    plugin = new org.ekstep.questionbank.EditorPlugin({}, {}, {});
    plugin.manifest = { "id": "org.ekstep.questionbank", "ver": "1.0", "author": "Swati singh", "title": "Question bank Plugin", "description": "Plugin to create questions", "editor": { "main": "editor/plugin.js", "dependencies": [{ "type": "css", "src": "editor/style.css" }, { "type": "js", "src": "editor/question.js" }, { "type": "plugin", "plugin": "org.ekstep.questionunit.mcq", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.questionunit.ftb", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.questionset.preview", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.questionunit.mtf", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.sunbirdmetadata", "ver": "1.0" }], "menu": [], "init-data": {}, "configManifest": [{}], "help": { "src": "editor/help.md", "dataType": "text" }, "sidebarMenu": [] }, "renderer": { "main": "renderer/plugin.js", "dependencies": [{ "type": "plugin", "plugin": "org.ekstep.questionset.preview", "ver": "1.0" }, { "type": "plugin", "plugin": "org.ekstep.questionunit.mcq", "ver": "1.0" }] }, "icon": "assets/icon.png", "languages": ["English"], "categories": [""], "keywords": [""] };
    setTimeout(function() {
      inject(function(_$rootScope_, _$controller_, _$window_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        $window = _$window_;
        $scope.closeThisDialog = function() {};
        $scope.$safeApply = function() {};
        done();
      });
    }, 2000);
    spyOn(ecEditor,"getContext").and.callFake(function(){
      return 123;
    });
    question = {
      "board":undefined,
      "body": "{\"data\":{\"data\":{\"question\":{\"text\":\"<p>choose the color of the sky</p>\\n\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\"},\"options\":[{\"text\":\"blue\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":true,\"$$hashKey\":\"object:797\"},{\"text\":\"red\",\"image\":\"\",\"audio\":\"\",\"hint\":\"\",\"isCorrect\":false,\"$$hashKey\":\"object:798\"}],\"questionCount\":1,\"media\":[]},\"config\":{\"metadata\":{\"category\":\"MCQ\",\"title\":\"choose the color of the sky\\n\",\"medium\":\"English\",\"qlevel\":\"EASY\",\"gradeLevel\":[\"Grade 1\"],\"concepts\":[{\"identifier\":\"LO4\",\"name\":\"Understanding of Grammar/Syntax\"}],\"description\":\"choose the color of the sky\",\"max_score\":1},\"max_time\":0,\"max_score\":1,\"partial_scoring\":true,\"layout\":\"Horizontal\",\"isShuffleOption\":false,\"questionCount\":1},\"media\":[]}}",
      "category":"MCQ",
      "channel":undefined,
      "code":"NA",
      "createdBy":"390",
      "description":undefined,
      "identifier":"do_1125344822483271681479",
      "isSelected":true,
      "isShuffleOption":false,
      "itemType":"UNIT",
      "max_score":1,
      "medium":"Hindi",
      "name":"m,,↵",
      "options":[],
      "qlevel":"EASY",
      "question":"<p>m,,</p>↵",
      "subject":undefined,
      "template":"NA",
      "template_id":"NA",
      "title":"m,,↵",
      "type":"mcq",
      "version":2,
      "plugin":{
        "id": "org.ekstep.questionunit.mcq",
        "ver":1.0
      }
    };
    questionBody = {
      "data": {
        "plugin": {
          "id": "org.ekstep.questionunit.mcq",
          "version": "1.0",
          "templateId": "horizontalMCQ"
        },
        "data": {
          "question": {
            "text": "<p>m,,</p>\n",
            "image": "",
            "audio": "",
            "hint": ""
          },
          "options": [{
            "text": "l",
            "image": "",
            "audio": "",
            "hint": "",
            "isCorrect": true,
            "$$hashKey": "object:1274"
          }, {
            "text": "l",
            "image": "",
            "audio": "",
            "hint": "",
            "isCorrect": false,
            "$$hashKey": "object:1275"
          }],
          "questionCount": 0,
          "media": []
        },
        "config": {
          "metadata": {
            "category": "MCQ",
            "title": "m,,\n",
            "medium": "Hindi",
            "qlevel": "EASY",
            "gradeLevel": ["Grade 1"],
            "concepts": [{
              "identifier": "SC7",
              "name": "Earth"
            }],
            "max_score": 2
          },
          "max_time": 0,
          "max_score": 1,
          "partial_scoring": true,
          "layout": "Horizontal",
          "isShuffleOption": false,
          "questionCount": 0
        },
        "media": []
      }
    }
    assessmentService = jasmine.createSpyObj("assessment", ["getQuestions","getItem"]);
    searchService = jasmine.createSpyObj("search", ["search"]);
    metaService = jasmine.createSpyObj("meta", ["getCategorys"]);
    spyOn(ecEditor, "getService").and.callFake(function(serviceName) {
      if (serviceName === 'assessment') {
        return assessmentService;
      }
      else if (serviceName === 'search') {
        return searchService;
      }else if(serviceName === 'meta'){
        return metaService;
      }
    });    
  });

describe("Question Bank", function() {
  beforeEach(function() {
    ctrl = $controller('QuestionFormController', { $scope: $scope, pluginInstance: plugin});
    var window = $window;
    spyOn($scope, "init").and.callThrough();
    spyOn($scope, "searchQuestions").and.callThrough();
    spyOn($scope, "selectQuestion").and.callThrough();
    spyOn($scope, "selectQuestionData").and.callThrough();
    spyOn($scope, "removeQuestion").and.callThrough();
    spyOn($scope, "editConfig").and.callThrough();
    spyOn($scope, "closeConfigForm").and.callThrough();
    spyOn($scope, "createQuestionSet").and.callThrough();
    spyOn($scope, "createTotalItemRange").and.callThrough();
    spyOn($scope, "setDisplayandScore").and.callThrough();
    spyOn($scope, "previewItem").and.callThrough();
    spyOn(ecEditor, "dispatchEvent").and.callThrough();
    spyOn(ecEditor, "addEventListener").and.callThrough();
    spyOn($scope, "sendForPreview").and.callThrough();
    spyOn($scope, "saveConfig").and.callThrough();
    window.context = { "content_id": "", "sid": "rctrs9r0748iidtuhh79ust993", "user": { "id": "390", "name": "Chetan Sachdev", "email": "chetan.sachdev@tarento.com", "avtar": "https://release.ekstep.in/media/com_easysocial/defaults/avatars/user/medium.png", "logout": "https://release.ekstep.in/index.php?option=com_easysocial&view=login&layout=logout" }, "baseURL": "https://release.ekstep.in/", "editMetaLink": "/component/ekcontent/contentform/do_10097535?Itemid=0", "contentId": "do_112467889506631680131", "uid": "390", "etags": { "app": [], "partner": [], "dims": [] }, "pdata": { "id": "in.ekstep", "ver": "1.0", "pid": "contenteditor" } };
    iFrameArea = document.createElement('iframe');
    iFrameArea.id = 'iframeArea';
    document.body.appendChild(iFrameArea);
    mockPreviewInstance = new function() {
      this.manifest = {
        "id": "org.ekstep.questionset.preview",
        "ver": "1.0",
        "shortId": "qs",
        "author": "Rajeev Sathish",
        "title": "Question Set Preview Plugin",
        "description": "Plugin to create the preview content for question set",
        "publishedDate": "",
        "editor": {
          "main": "editor/plugin.js",
          "configManifest": []
        }
      },
      this.attributes = {
        "x": null,
        "y": null,
        "w": null,
        "h": null
      },
      this.editorData = {
        "x": null,
        "y": null,
        "w": null,
        "h": null
      },
      this.children = [],
      this.id = "2b570c0b-45d6-4a07-844e-aa293e43e4e6",
      this.config = {
        "opacity": 100,
        "strokeWidth": 1,
        "stroke": "rgba(255, 255, 255, 0)",
        "autoplay": false,
        "visible": true
      },
      this.configManifest = [{
        "propertyName": "autoplay",
        "title": "Auto play",
        "description": "Set the element's playability",
        "dataType": "boolean",
        "required": true,
        "defaultValue": false
      },
      {
        "propertyName": "visible",
        "title": "Visible",
        "description": "Set the element's Visibility",
        "dataType": "boolean",
        "required": true,
        "defaultValue": true
      },
      {
        "propertyName": "stroke",
        "title": "Border Color",
        "description": "Set the border color for element",
        "dataType": "colorpicker",
        "required": true,
        "defaultValue": "rgba(255, 255, 255, 0)"
      }]
    }
    spyOn(ecEditor, "getPluginInstances").and.callFake(function() {
      return {
        '2b570c0b-45d6-4a07-844e-aa293e43e4e6': mockPreviewInstance
      };
    });
  });
  it("should set $scope not to be undefined", function() {
    expect($scope).not.toBeUndefined();
  });
  it("should Call init", function() {
    expect($scope).not.toBeUndefined();
  });
  it("Should call search questions function", function() {
    $scope.searchQuestions();
    expect($scope.searchQuestions).toHaveBeenCalled();
    expect(ecEditor.getService('search').search).toHaveBeenCalled();
    expect(ecEditor.getService('assessment').getQuestions).toHaveBeenCalled();
  });
  it("Should call selectQuestion function", function() {
    $scope.selectQuestion(question);
    expect($scope.selectQuestion).toHaveBeenCalled();
  });
  it("Should call selectQuestionData function", function() {
    $scope.selectQuestionData(question);
    expect($scope.selectQuestionData).toHaveBeenCalled();
  });
  it("Should call removeQuestion function", function() {
    $scope.removeQuestion(question);
    expect($scope.removeQuestion).toHaveBeenCalled();
    $scope.editConfig();
    expect($scope.editConfig).toHaveBeenCalled();
  });
  it("Should call closeConfigForm function", function() {
    $scope.closeConfigForm();
    expect($scope.closeConfigForm).toHaveBeenCalled();
  });
  it("Should call createTotalItemRange function", function() {
    $scope.createTotalItemRange();
    expect($scope.createTotalItemRange).toHaveBeenCalled();
  });
  it("Should call setDisplayandScore function", function() {
    $scope.setDisplayandScore();
    expect($scope.setDisplayandScore).toHaveBeenCalled();
  });
  it("Should call previewItem function", function() {
    $scope.previewItem(questionBody, true);
    expect($scope.previewItem).toHaveBeenCalled();
  });
  it("Should call sendForPreview function", function() {
    $scope.sendForPreview(questionBody, question.version);
    expect($scope.sendForPreview).toHaveBeenCalled();
    expect(ecEditor.dispatchEvent).toHaveBeenCalled();
  });
  it("Should call saveConfig function", function() {
    // $scope.saveConfig(questionBody, question.version);
    // expect($scope.saveConfig).toHaveBeenCalled();
  });
});


});

 //# sourceURL=questionbankctrl.spec.js
