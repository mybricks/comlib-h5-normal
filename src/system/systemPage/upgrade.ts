import comJson from "./com.json";
import dataJson from "./data.json";

console.error('comJson', comJson);
console.error('dataJson', dataJson);

export default function ({env, input, output, data, setDeclaredStyle }): boolean {

  console.warn('input', input);
  console.warn('output', output);
  console.warn('data', data);
  console.warn('setDeclaredStyle', setDeclaredStyle);

  return true;
}
