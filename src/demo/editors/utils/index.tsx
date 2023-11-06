export function uuid(len = 6) {
  const seed = "abcdefhijkmnprstwxyz";
  const maxPos = seed.length;
  let rtn = "";
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return "u_" + rtn;
}

export function schemaToJson(schema) {
  let json = {};

  for (let key in schema.properties) {
      let value = schema.properties[key];
      if (value.type === 'object') {
          json[key] = schemaToJson(value);
      } else if (value.type === 'array') {
          json[key] = value.items && value.items.type === 'object' ? [schemaToJson(value.items)] : [];
      } else {
          switch (value.type) {
              case 'string':
                  json[key] = value.title || value.description || '';
                  break;
              case 'number':
                  json[key] = 0;
                  break;
              case 'boolean':
                  json[key] = false;
                  break;
              default:
                  json[key] = null;
          }
      }
  }

  return json;
}
