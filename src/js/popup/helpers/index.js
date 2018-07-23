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
