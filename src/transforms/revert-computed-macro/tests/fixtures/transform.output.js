import {PropTypes} from 'ember-prop-types'
import {computed, get, getWithDefault} from '@ember/object';
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
  simple: computed('planned.above', 'plannedTotal.{test1,test2}', function() {
    const above = get(this, 'planned.above');
    const total1 = get(this, 'plannedTotal.test1');
    const total2 = get(this, 'plannedTotal.test2');
    return this.getPercent(above, total1 + total2)
  }).readOnly(),

  complex: computed(
    'managementSessionData.managementSessions.@each.{discoveryState,profile}',
    'managementSessionData.neProfiles.[]',
    function() {
      const managementSessions = getWithDefault(this, 'managementSessionData.managementSessions', []);
      const neProfiles = get(this, 'managementSessionData.managementSessions');
      return managementSessions
    }
  ).readOnly(),

  withVariable: computed(DEPENDENCY_KEY, 'plannedTotal.{test1,test2}', function() {
    const planned = get(this, DEPENDENCY_KEY);
    const total1 = get(this, 'plannedTotal.test1');
    const total2 = get(this, 'plannedTotal.test2');
    return this.getPercent(planned.above, total1 + total2)
  }).readOnly(),

  withDefaultValues: computed('planned.normal', 'plannedTotal', function() {
    const normal = getWithDefault(this, 'planned.normal', 1);
    const total = getWithDefault(this, 'plannedTotal', 2);
    return this.getPercent(normal, total)
  }).readOnly(),

  withUnusedValues: computed('planned.normal', 'plannedTotal', function() {
    const normal = getWithDefault(this, 'planned.normal', 1);
    const total = getWithDefault(this, 'plannedTotal', 2);
    const unUsedVariable = null;
    return this.getPercent(normal, total)
  }).readOnly(),

  withDefaultValuesAndObjectDestructuring: computed('planned.legendData', function() {
    const {staticLegendData = [], dynamicLegendData = []} = getWithDefault(this, 'planned.legendData', {});
    return {
      staticLegendData: [
        ...staticLegendData
      ],
      dynamicLegendData
    }
  }).readOnly(),

  withDefaultValuesAndArrayDestructuring: computed('planned.legendData.[]', function() {
    const [staticLegendData = [], dynamicLegendData = []] = getWithDefault(this, 'planned.legendData', [[], []]);
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
