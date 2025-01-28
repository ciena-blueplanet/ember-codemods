// @ts-nocheck
import ObjectProxy from '@ember/object/proxy'
import {computed, get} from '@ember/object';

export function computedOverrides (mapType: string, networkMapStorage: object, configOverrides: object) {
  return computed(mapType, networkMapStorage, configOverrides, function() {
    const mapType: string = get(this, mapType);
    const networkMapStorage: object = get(this, networkMapStorage);
    const configOverrides: object = get(this, configOverrides);
    return mapType === 'shelf' ? ObjectProxy.create(
      {content: networkMapStorage, ...configOverrides}) : networkMapStorage
  }).readOnly();
}
