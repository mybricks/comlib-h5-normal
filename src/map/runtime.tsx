import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Map, View, MapProps } from "@tarojs/components";
import * as Taro from "@tarojs/taro";
import { uuid } from "./../utils";
import css from "./style.less";

interface MapGeo {
  polylines?: MapProps.polyline[];
  markers?: MapProps.marker[];
  fitPoints?: any[];
}
interface DrawOption extends MapGeo {
  autofit?: boolean;
}

const EMPTY_GEO = {
  polylines: [],
  markers: [],
  fitPoints: []
};

export default function ({ env, data, inputs, outputs }) {
  const [scale,setScale] = useState(16)
  const [state, setState] = useState<any>({
    longitude: 116.4,
    latitude: 39.9,
    autofit: false,
  });

  const [geo, setGeo] = useState<MapGeo>({
    ...EMPTY_GEO,
  });

  const mapId = useRef(uuid());
  const mapRef = useRef<Taro.MapContext>(null as any);


  const handleDraw = useCallback((opt: DrawOption) => {
    const { polylines, markers, autofit = false } = opt ?? {};


    const fitPoints: any = [];

    /** 自动适配 */
    if (autofit) {
      /** 绘制线的情况： 将起点和终点加入适配点里 */
      polylines?.forEach((polyline) => {
        if (Array.isArray(polyline.points) && polyline.points.length > 2) {
          fitPoints.push(polyline.points[0]);
          fitPoints.push(polyline.points[polyline.points.length - 1]);
        }
      });

      /** 绘制点的情况： 将所有点加入适配点里 */
      markers?.forEach((marker) => {
        fitPoints.push({
          latitude: marker.latitude,
          longitude: marker.longitude,
        });
      });
    }

    return {
      polylines,
      markers,
      fitPoints
    };
  }, []);

  useEffect(() => {
    mapRef.current = Taro.createMapContext(mapId.current);
  }, [mapId.current]);

  useMemo(() => {
    inputs["setPos"]((res, outputRels) => {
      const { longitude, latitude } = res ?? {};
      setState((c) => ({ ...c, longitude, latitude }));

      setTimeout(() => {
        outputRels["onSetPosOk"]();
      }, 300)
    });

    inputs["setMarkers"]((res, outputRels) => {
      setGeo((c) => ({ ...c, markers: res }));
      setTimeout(() => {
        outputRels["onSetMarkersOk"]();
      }, 300)
    })
  }, [])

  useEffect(() => {
    // inputs["setPos"]?.((res) => {
    //   const { longitude, latitude } = res ?? {};
    //   setState((c) => ({ ...c, longitude, latitude }));
    // });

    /** 重新绘制 */
    inputs["draw"]?.((opt: DrawOption) => {
      const { polylines, markers, fitPoints } = handleDraw(opt);

      setGeo({
        ...EMPTY_GEO, // 用来添加默认值，清空之前的数据，比如输入没有markers就会清空
        polylines,
        markers,
        fitPoints
      });
    });

    /** 追加绘制 */
    inputs["addDraw"]?.((opt: DrawOption) => {
      const { polylines, markers, fitPoints } = handleDraw(opt);

      setGeo((c) => {
        return {
          polylines: c.polylines?.concat(polylines ?? []),
          markers: c.markers?.concat(markers ?? []),
          fitPoints
        };
      });
    });

    inputs["setPolyline"]?.((polylines) => {
      if (Array.isArray(polylines)) {
        setGeo((c) => ({ ...c, polylines: polylines }));
      }
    });

    inputs["includePoints"]?.((points) => {
      mapRef.current.includePoints(points);
    });

    inputs["setScale"]?.((scale)=>{
      setScale(scale)
    })
    
  }, []);

  /** 安卓下猜测会因为重复渲染定位到props的经纬度而闪屏，所以等渲染后再缩放吧 */
  useEffect(() => {
    const { fitPoints } = geo ?? {}
    if (fitPoints && fitPoints.length) {
      mapRef.current.includePoints({
        points: fitPoints,
        padding: [30, 30, 30, 30]
      });
    }
  }, [geo.fitPoints])

  return (
    <Map
      id={mapId.current}
      setting={{
        latitude: state.latitude,
        longitude: state.longitude
      }}
      latitude={state.latitude}
      longitude={state.longitude}
      {...data}
      className={`${css.map} mybricks-map`}
      polyline={geo.polylines}
      markers={geo.markers}
      scale={scale}
    ></Map>
  );
}
