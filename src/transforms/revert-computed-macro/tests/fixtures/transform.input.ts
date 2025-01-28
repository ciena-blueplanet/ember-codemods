// @ts-nocheck
import ObjectProxy from '@ember/object/proxy'
// @ts-expect-error
import computed from 'ember-macro-helpers/computed'

export function computedOverrides (mapType: string, networkMapStorage: object, configOverrides: object) {
  return computed(mapType, networkMapStorage, configOverrides, function
  (mapType: string, networkMapStorage: object, configOverrides: object) {
    return mapType === 'shelf' ? ObjectProxy.create(
      {content: networkMapStorage, ...configOverrides}) : networkMapStorage
  }).readOnly()
}
