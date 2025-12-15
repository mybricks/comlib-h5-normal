import HarmonyIcon from "./harmony-icons";
import TaroiIcon from "./taroify-icons";

type DynamicIconProps = {
  name: string;
  size?: number;
  color?: string;
  className?: string;
};

export default function (props: DynamicIconProps) {
  const { name } = props;
  if (!name) {
    return HarmonyIcon({
      ...props,
      name: "HM_plus",
    });
  }

  // 兼容taroi图标
  if (!name.startsWith("HM_")) {
    return TaroiIcon(props);
  }

  return HarmonyIcon(props);
}
