function save_options() {
  var timestamp = document.getElementById('timestamp').checked;
  chrome.storage.sync.set({
    timestamp: timestamp
  }, function () {
    window.close();
  });
}

function restore_options() {
  chrome.storage.sync.get({
    timestamp: false
  }, function (items) {
    document.getElementById('timestamp').checked = items.timestamp;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
