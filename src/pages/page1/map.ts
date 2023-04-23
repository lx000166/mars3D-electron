import * as mars3d from "mars3d";

const mapMounted = (map: mars3d.Map) => {
  console.log("mapMounted");
};
const mapUnMounted = () => {};

export const lifeCycle = { mapMounted, mapUnMounted };
