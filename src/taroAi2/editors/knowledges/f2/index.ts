import Base from "./base.md";
import Area from "./area.md";
import Funnel from "./funnel.md";
import Column from "./column.md";
import Bar from "./bar.md";
import Line from "./line.ts";
import Pie from "./pie.md";
import Heatmap from "./heatmap.md";
import Radar from "./radar.md";

const mdMap = {
  BASE: Base,
  AREA: Area,
  FUNNEL: Funnel,
  COLUMN: Column,
  BAR: Bar,
  LINE: Line,
  PIE: Pie,
  HEATMAP: Heatmap,
  RADAR: Radar,
};

export default function getKnowledge(packageName: string, com: string) {
  if (packageName === "f2-for-taro") {
    const upperCom = com.toUpperCase();
    return mdMap[upperCom];
  }
}
