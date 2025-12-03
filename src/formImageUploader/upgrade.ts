
export default function ({env, input, output, data, setDeclaredStyle }): boolean {

  if(data?.disabled === undefined){
    data.disabled = false;
  }
  return true;
}
