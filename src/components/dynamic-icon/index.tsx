import { TaroifyIcons } from "./icons";

export default function ({ name, ...props }) {
  const allIcons = TaroifyIcons.reduce((prev, cur) => {
    return Object.assign(prev, cur.icons);
  }, {});

  if (!name || !allIcons[name]) {
    return null;
  }

  return allIcons[name](props);
}
