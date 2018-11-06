export const formToJson = form => {
  const data = new FormData(form);
  const object = {};

  data.forEach((value, key) => {
    if (object[key]) {
      if (Array.isArray(object[key])) {
        object[key].push(value);
      } else {
        object[key] = [object[key], value];
      }
    } else {
      object[key] = value;
    }
  });

  return object;
};

export const processForm = e => {
  e.preventDefault();

  return formToJson(e.target);
};
