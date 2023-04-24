/*
 * @Date: 2023-04-23 16:33:24
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-24 15:46:01
 * @Description:
 */
/*
 * @Date: 2023-04-23 16:33:24
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-24 09:25:13
 * @Description:
 */
import * as mars3d from "mars3d";
const Cesium = mars3d.Cesium;

let map: mars3d.Map;
let tiles3dLayer: mars3d.layer.TilesetLayer;
let wallLayer: mars3d.layer.GraphicLayer;

// ! 生命周期方法
const mapMounted = (mapIns: mars3d.Map) => {
  map = mapIns;
  map.flyToPoint([117.259124, 31.803044, 3276.7], { radius: 2000 });

  setTilesetLayer();
  setWallLayer();
};
const mapUnMounted = () => {
  clearTiles(tiles3dLayer);
  clearGraphic(wallLayer);
};
// ! 生命周期方法 end

// 加载合肥市建筑物
function setTilesetLayer() {
  clearTiles(tiles3dLayer);
  // 模型
  tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "合肥市建筑物",
    url: "//data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    position: { alt: -50 },
    popup: [
      { field: "objectid", name: "编号" },
      { field: "name", name: "名称" },
      { field: "height", name: "楼高", unit: "米" }
    ]
  });
  map.addLayer(tiles3dLayer);
  tiles3dLayer.on(mars3d.EventType.click, (e) => {
    console.log("被点击的楼栋数据:", e);
  });
}

// * 楼栋围墙
const points = [
  [117.259898, 31.843134, 162.6],
  [117.267515, 31.839099, 45.6],
  [117.286666, 31.845907, 120.3],
  [117.281288, 31.836315, 169.6],
  [117.267589, 31.858725, 176.5]
];
const createWallGraph = (point: number[]) => {
  // 圆柱墙坐标
  const positions = mars3d.PolyUtil.getEllipseOuterPositions({
    position: new mars3d.LngLatPoint(point[0], point[1], -50),
    radius: 55, // 半径
    count: 50 // 共返回(count*4)个点
  });
  // 圆柱墙
  const cylinderGraphic = new mars3d.graphic.WallEntity({
    positions: positions,
    name: "圆柱墙",
    allowDrillPick:true,
    style: {
      zIndex: 111,
      diffHeight: point[2],
      closure: true,
      // 动画线材质
      materialType: mars3d.MaterialType.LineFlow,
      materialOptions: {
        image: "images/fence.png",
        color: "#dd3a11e6",
        speed: 5,
        axisY: true
      }
    }
  });
  // 四面体
  const tetrahedronPrimitive = new mars3d.graphic.Tetrahedron({
    position: Cesium.Cartesian3.fromDegrees(point[0], point[1], point[2] + 50),
    style: {
      width: 40,
      height: 60,
      color: new Cesium.Color(0.8, 0.8, 0, 0.8),
      animation: true,
      moveHeight: 30,
      moveDuration: 1,
      rotationAngle: 1
    },
    attr: { remark: "示例3" }
  });
  return [cylinderGraphic, tetrahedronPrimitive];
};
const setWallLayer = () => {
  wallLayer = new mars3d.layer.GraphicLayer({ id: "city-wall-hf", });
  map.addLayer(wallLayer);
  points.forEach((point) => {
    wallLayer.addGraphic(createWallGraph(point));
  });
};
// * 围墙结束

export const lifeCycle = { mapMounted, mapUnMounted };
