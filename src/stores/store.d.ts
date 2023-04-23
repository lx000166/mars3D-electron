namespace Stores {
  namespace MarsMap {
    type Func = () => void;
    type MountedFunc = (mapIns: mars3d.Map) => void;
    interface MapStoreState {
      map: mars3d.Map | null;
      mountedList: MountedFunc[];
      unMountedList: Func[];
    }
    interface MapLifeCycleParams {
      mapMounted?: MountedFunc;
      mapUnMounted?: Func;
    }
    type MapLifeCycle = (params: MapLifeCycleParams) => void;
  }
}
