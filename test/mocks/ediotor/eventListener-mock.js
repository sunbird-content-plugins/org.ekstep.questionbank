windowmock.open = function(url, target, settings) {
  return {
    addEventListener: function(event, callback) {
      if (event == 'loadstart') {
        callback({
          url: 'URL',
          originalEvent: {},
        });
      }
    },
    close: function() {}
  }
}