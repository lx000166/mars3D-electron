// mars 通用方法
import type mars3d from "mars3d";

/**
 * TilesetLayer 清理方法
 * @param layer layer.remove(); layer = null;
 */
export const clearTiles = (layer: mars3d.layer.TilesetLayer | null) => {
  if (layer) {
    layer.remove();
    layer = null;
  }
};

/**
 * GraphicLayer 清理方法
 * @param layer    layer.clear(); layer.remove(); layer = null;
 */
export const clearGraphic = (layer: mars3d.layer.GraphicLayer | null) => {
  if (layer) {
    layer.clear();
    layer.remove();
    layer = null;
  }
};
