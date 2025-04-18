export default function (slot, value) {
  if (!slot) return;

  switch (true) {
    case value.position === "smart":
      slot.setLayout("smart");
      break;

    case value.position === "absolute":
      slot.setLayout(value.position);
      break;

    case value.display === "flex":
      if (value.flexDirection === "row") {
        slot.setLayout("flex-row");
      } else if (value.flexDirection === "column") {
        slot.setLayout("flex-column");
      } 

      slot.setAlignItems(value.alignItems);
      slot.setJustifyContent(value.justifyContent);
      break;
  }
}
