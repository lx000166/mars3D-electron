/*
 * @Date: 2023-04-19 16:50:20
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-23 17:54:08
 * @Description: mars3d mapStore
 */
import * as mars3d from "mars3d";

/** 默认配置文件路径 /config/config.json */
const defaultConfigUrl = `/config/config.json?time=${new Date().getTime()}`;

/**
 * 有关地图实例与相关方法与生命周期的store
 */
export const useMarsMapStore = defineStore("MarsMap", () => {
  // * state
  const state: Stores.MarsMap.MapStoreState = reactive({
    map: null,
    mountedList: [],
    unMountedList: []
  });

  // * getter
  /** marsmap实例 */
  const mapIns = computed(() => state.map);

  // * action
  /**
   * 读取配置文件,创建地图
   * @param id 地图容器id
   * @param options 覆盖json读取的默认配置
   * @param options json配置文件地址,默认 public/config/config.json
   */
  const setMap = async (ElementId: string, options = {}, configUrl: string = defaultConfigUrl) => {
    const { map3d: asyncOption } = await mars3d.Util.fetchJson({ url: configUrl });
    const option = mars3d.Util.merge(options, asyncOption); // 合并配置
    state.map = new mars3d.Map(ElementId, option); // map实例
    state.mountedList.forEach((mapMounted) => mapMounted(state.map as mars3d.Map));
  };

  /**
   * 启用map.ts生命周期,且 map实例未创建时,将mapMounted生命周期添加到mountedList
   * 生命周期列表,列表中的生命周期函数将在map实例生成时被调用
   * @param fn map.ts => mapMounted生命周期函数
   * 
   * 如果有其它想要在生成map实例后执行的方法,但不确定当时map实例是否创建,也可以通过暴露的addMounted方法将其添加到启动队列
   * @example 
   * // xxxx.vue
   * const store = useMarsMapStore();
   * const xxx = (map:mars3d.Map)=>{...}
   * store.mapIns.value ? xxx(store.mapIns.value) : store.addMounted(xxx)
   */
  const addMounted = (fn: Stores.MarsMap.MountedFunc) => state.mountedList.push(fn);
  /**
   * 启用map.ts生命周期时,将mapUnMounted生命周期添加到unMountedList
   * 生命周期列表,列表中的生命周期函数将在map实例销毁前被调用
   * @param fn map.ts => mapUnMounted生命周期函数
   */
  const addUnMounted = (fn: Stores.MarsMap.Func) => state.unMountedList.push(fn);

  /**
   * @param mapMounted 如果map实例已创建,直接调用生命周期函数.如果map实例未创建,添加到待调用生命周期列表mountedList,等待map实例创建后调用.
   * @param mapUnMounted  将生命周期函数添加到unMountedList生命周期列表,map实例销毁前调用
   */
  const mapLifeCycle: Stores.MarsMap.MapLifeCycle = ({ mapMounted, mapUnMounted }) => {
    mapMounted && (mapIns.value ? mapMounted(mapIns.value) : addMounted(mapMounted));
    mapUnMounted && addUnMounted(mapUnMounted);
  };
  const removeMap = () => {
    if (state.map) {
      state.unMountedList.forEach((mapUnMounted) => mapUnMounted());
      state.map.destroy();
      state.map = null;
      state.mountedList = []
      state.unMountedList = []
    }
    console.log("map销毁完成", state.map, state.unMountedList);
  };
  return { setMap, removeMap, mapLifeCycle, mapIns };
});
