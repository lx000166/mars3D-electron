/*
 * @Date: 2023-04-19 16:50:20
 * @LastEditors: lixin
 * @LastEditTime: 2023-04-20 11:02:20
 * @Description:
 */
import * as mars3d from "mars3d";
var mapOptions = {};
export const useMarsMapStore = defineStore("MarsMap", () => {
  const map: Ref<mars3d.Map | null> = ref(null);

  const setMap = (id: string) => {
    const configUrl = `/config/config.json?time=${new Date().getTime()}`;
    mars3d.Util.fetchJson({ url: configUrl }).then((data: any) => {
      const option = mars3d.Util.merge(mapOptions, data.map3d); // 合并配置
      map.value = new mars3d.Map(id, option);
    });
  };
  const mapIns = computed(() => map.value);

  return { setMap, mapIns };
});
