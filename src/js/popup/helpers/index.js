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
