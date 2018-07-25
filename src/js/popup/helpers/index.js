export const formToJson = form => {
  const data = new FormData(form);
  const object = {};

  data.forEach((value, key) => {
    object[key] = value;
  });

  return object;
};

export const processForm = e => {
  e.preventDefault();

  return formToJson(e.target);
};

export const downloadFile = (data, filename = 'Default.mm', type = 'text/plain;charset=utf-8') => {
  const file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
};

const clickElem = elem => {
  const eventMouse = document.createEvent('MouseEvents');
  eventMouse.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elem.dispatchEvent(eventMouse);
};

export const readFile = callBack => {
  const readFile = function(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      const contents = e.target.result;
      fileInput.func(contents);
      document.body.removeChild(fileInput);
    };
    reader.readAsText(file);
  };
  const fileInput = document.createElement('input');

  fileInput.type = 'file';
  fileInput.accept = '.mm';
  fileInput.style.display = 'none';
  fileInput.onchange = readFile;
  fileInput.func = callBack;
  document.body.appendChild(fileInput);
  clickElem(fileInput);
};
