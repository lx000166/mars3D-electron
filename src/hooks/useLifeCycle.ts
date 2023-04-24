export const useLifeCycle: Hooks.LifeCycle.LifeCycle = ({ mapMounted, mapUnMounted }) => {
  const mars = useMarsMapStore();

  onBeforeMount(() => {
    mapMounted && (mars.mapIns ? mapMounted(mars.mapIns) : mars.addMounted(mapMounted));
  });

  onBeforeUnmount(() => {
    mapUnMounted && mapUnMounted();
  });
};
