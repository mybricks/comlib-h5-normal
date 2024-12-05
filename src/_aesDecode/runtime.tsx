import * as Taro from "@tarojs/taro";
import CryptoJS from "crypto-js";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["call"]((val: string) => {
      //
      if (!val || !data.key || !data.iv) {
        outputs["result"]("");
        return;
      }

      // 密钥修复：超长截取/不足补0
      const fixedKey = CryptoJS.enc.Utf8.parse(
        data.key.padEnd(32, "0").slice(0, 32)
      );
      const fixedIv = CryptoJS.enc.Utf8.parse(
        data.iv.padEnd(16, "0").slice(0, 16)
      );

      // AES 解密
      const decrypted = CryptoJS.AES.decrypt(val, fixedKey, {
        iv: fixedIv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      // 输出解密后的结果
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

      // 输出解密结果
      outputs["result"](decryptedText);
    });
  }
}