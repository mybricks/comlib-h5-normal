import jsSHA from "jssha";

class UploadOssHelper {
  constructor(options) {
    this.accessKeyId = options.accessKeyId;
    this.accessKeySecret = options.accessKeySecret;
    this.timeout = options.timeout || 1;
    this.maxSize = options.maxSize || 10;
  }

  createUploadParams() {
    const policy = this.getPolicyBase64();
    const signature = this.signature(policy);
    return {
      OSSAccessKeyId: this.accessKeyId,
      policy: policy,
      signature: signature,
    };
  }

  getPolicyBase64() {
    let date = new Date();
    date.setHours(date.getHours() + this.timeout);
    let srcT = date.toISOString();
    const policyText = {
      expiration: srcT,
      conditions: [
        ["content-length-range", 0, this.maxSize * 1024 * 1024],
      ],
    };
    const policy = JSON.stringify(policyText);
    return btoa(unescape(encodeURIComponent(policy)));
  }

  signature(policy) {
    const shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.setHMACKey(this.accessKeySecret, "TEXT");
    shaObj.update(policy);
    return shaObj.getHMAC("B64");
  }
}

export default UploadOssHelper;