import Area from "./area.md";
import Funnel from "./funnel.md";
import Interval1 from "./interval1.md";
import Interval2 from "./interval2.md";
import Line from "./line.md";
import Pie from "./pie.md";
import Polygon from "./polygon.md";
import Radar from "./radar.md";

const mdMap = {
  AREA: Area,
  FUNNEL: Funnel,
  INTERVAL1: Interval1,
  INTERVAL2: Interval2,
  LINE: Line,
  PIE: Pie,
  POLYGON: Polygon,
  RADAR: Radar,
};

export default function getKnowledge(packageName: string, com: string) {
  if (packageName === "useF2") {
    const upperCom = com.toUpperCase();
    return mdMap[upperCom];
  }
}
