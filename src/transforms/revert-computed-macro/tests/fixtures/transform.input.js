import computed from 'ember-macro-helpers/computed'
import {PropTypes} from 'ember-prop-types'
import {Component} from 'frost-core-components'
import layout from './template'

const DEPENDENCY_KEY = 'planned'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================
  layout,

  // == PropTypes =============================================================
  propTypes: {
    css: PropTypes.string,
    planned: PropTypes.object,
    plannedTotal: PropTypes.number
  },

  getDefaultProps () {
    return {
      css: 'performance-plan'
    }
  },

  // == Computed Properties ===================================================
  simple: computed('planned.above', 'plannedTotal.{test1,test2}', function (above, total1, total2) {
    return this.getPercent(above, total1 + total2)
  }).readOnly(),

  complex: computed(
    'managementSessionData.managementSessions.@each.{discoveryState,profile}',
    'managementSessionData.neProfiles.[]',
    function (managementSessions = [], neProfiles) {
      return managementSessions
    }
  ).readOnly(),

  withVariable: computed(DEPENDENCY_KEY, 'plannedTotal.{test1,test2}', function (planned, total1, total2) {
    return this.getPercent(planned.above, total1 + total2)
  }).readOnly(),

  withDefaultValues: computed('planned.normal', 'plannedTotal', function (normal = 1, total = 2) {
    return this.getPercent(normal, total)
  }).readOnly(),

  withUnusedValues: computed('planned.normal', 'plannedTotal', function (normal = 1, total = 2, unUsedVariable = null) {
    return this.getPercent(normal, total)
  }).readOnly(),

  withDefaultValuesAndObjectDestructuring: computed('planned.legendData', function ({staticLegendData = [], dynamicLegendData = []} = {}) {
    return {
      staticLegendData: [
        ...staticLegendData
      ],
      dynamicLegendData
    }
  }).readOnly(),

  withDefaultValuesAndArrayDestructuring: computed('planned.legendData.[]', function ([staticLegendData = [], dynamicLegendData = []] = [[], []]) {
    return {
      staticLegendData: [
        ...staticLegendData
      ],
      dynamicLegendData
    }
  }).readOnly(),

  // == Functions =============================================================
  getPercent (section, total) {
    return section ? Math.round((section / total) * 100) : 0
  }

  // == Tasks =================================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

})
