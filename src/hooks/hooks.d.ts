namespace Hooks {
  namespace LifeCycle {
    interface LifeCycleParams {
      mapMounted?: MountedFunc;
      mapUnMounted?: Func;
    }
    type LifeCycle = (params: LifeCycleParams) => void;
  }
}
