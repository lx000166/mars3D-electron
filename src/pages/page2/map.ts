import * as mars3d from "mars3d";
const Cesium = mars3d.Cesium;
let map: mars3d.Map;
// ! 生命周期方法
const mapMounted = (mapIns: mars3d.Map) => {
  map = mapIns;
};
const mapUnMounted = () => {};
// ! 生命周期方法 end

export const lifeCycle = { mapMounted, mapUnMounted };
