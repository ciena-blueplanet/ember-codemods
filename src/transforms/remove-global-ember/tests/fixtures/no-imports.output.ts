import Ember from 'ember';
export function getComponent (): any {
  return Ember.Component()
}

export function getTesting (): boolean {
  const {testing} = Ember

  return testing
}
