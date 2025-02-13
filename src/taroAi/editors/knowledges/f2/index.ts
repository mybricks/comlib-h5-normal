import Area from "./area.ts";
import Funnel from "./funnel.ts";
import Column from "./column.ts";
import Bar from "./bar.ts";
import Line from "./line.ts";
import Pie from "./pie.ts";
import Heatmap from "./heatmap.ts";
import Radar from "./radar.ts";

const mdMap = {
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
