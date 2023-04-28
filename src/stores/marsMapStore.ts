import * as mars3d from "mars3d";
import type Mars3d from "mars3d";

type MountedFunc = ((mapIns: mars3d.Map) => void) | (() => void);

/** 默认配置文件路径 /config/config.json */
const defaultConfigUrl = `/config/config.json?time=${new Date().getTime()}`;

/**
 * 有关地图实例与相关方法与生命周期的store
 */
export const useMarsMapStore = defineStore("MarsMap", () => {
  // * state
  const map: Ref<Mars3d.Map | null> = ref(null);
  /** mapMounted 启动队列
   * 各个页面map.ts中的"mapMounted"生命周期方法
   * 如果页面加载时map实例还未生成,会将对应的mapMounted方法添加到启动队列,在map实例生成后再调用
   */
  const mountedList: Ref<MountedFunc[]> = ref([]);

  // * getter
  /** marsmap实例 */
  const mapIns = computed(() => map.value);

  // * action
  /**
   * 读取配置文件,创建地图
   * @param id 地图容器id
   * @param options 覆盖json读取的默认配置
   * @param options json配置文件地址,默认 public/config/config.json
   */
  const setMap = async (ElementId: string, options = {}, configUrl: string = defaultConfigUrl) => {
    const { map3d: asyncOption } = await mars3d.Util.fetchJson({ url: configUrl }); // 读取地图配置
    const option = mars3d.Util.merge(options, asyncOption); // 合并配置
    map.value = new mars3d.Map(ElementId, option); // 创建map实例
    /** 生成map实例后执行启动队列 */
    mountedList.value.forEach((mapMounted) => map.value && mapMounted(map.value));
  };

  /**
   * 启用map.ts生命周期,且 map实例未创建时,将mapMounted生命周期添加到mountedList
   * 列表中的生命周期函数将在map实例生成时被调用
   * @param fn map.ts => mapMounted生命周期函数
   * 如果有其它想要在生成map实例后执行的方法,但不确定当时map实例是否创建,也可以通过暴露的addMounted方法将其添加到启动队列
   * @example
   * // xxxx.vue
   * const store = useMarsMapStore();
   * const xxx = (xx)=>{...}
   * store.mapIns.value ? xxx(store.mapIns.value) : store.addMounted(xxx)
   */
  const addMounted = (fn: MountedFunc) => mountedList.value.push(fn);

  const removeMap = () => {
    if (map.value) {
      map.value.destroy();
      map.value = null;
      mountedList.value = [];
    }
    console.log("map销毁完成", map.value);
  };
  return { setMap, removeMap, addMounted, mapIns };
});
