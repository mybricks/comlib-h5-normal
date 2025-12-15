import allIcons from "./icons";

export default function ({ name, ...props }) {
  if (!name || !allIcons[name]) {
    return null;
  }

  return allIcons[name](props);
}
