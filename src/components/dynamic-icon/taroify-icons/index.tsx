import allIcons from "./icons";

export default function ({ name, ...props }) {
  if (!name || !allIcons[name]) {
    return allIcons["Plus"](props);
  }

  return allIcons[name](props);
}
