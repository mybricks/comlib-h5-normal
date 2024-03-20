import { Data } from "./types";
import { ExpressionSandbox } from "../utils/com-utils";
export default function ({
  data,
  inputs,
  outputs,
  onError,
}: RuntimeParams<Data>) {
  const { judged_field } = data;
  inputs["inputContext"]((context:any) => {
    const sandbox: ExpressionSandbox = new ExpressionSandbox({
      context,
      prefix: "inputValue",
    });

    try{
      const ret = sandbox.executeWithTemplate(judged_field);
      if(ret === null || ret === undefined || ret === "" || ret === 0){
        outputs["isEmpty"](context);
      } else {
        outputs["notEmpty"](context);
      }
    } catch (error: any) {
      onError?.(`[${judged_field}]: ${error}`);
    }
  });
}
