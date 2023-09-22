export default function ({ data, input }) {
  if (!input.get("noticeText")) {
    input.add("noticeText", "设置内容", { type: "string" });
  }
}
