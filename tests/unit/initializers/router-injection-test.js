import Ember from 'ember'
import RouterInjectionInitializer from 'notify/initializers/router-injection'
import { module, test } from 'qunit'

let application

module('Unit | Initializer | router injection', {
  beforeEach () {
    Ember.run(function () {
      application = Ember.Application.create()
      application.deferReadiness()
    })
  }
})

// Replace this with your real tests.
test('it works', function (assert) {
  RouterInjectionInitializer.initialize(application)

  // you would normally confirm the results of the initializer here
  assert.ok(true)
})
