import Ember from 'ember'
import RSVP from 'rsvp'
import { moduleFor, test } from 'ember-qunit'
import sinon from 'sinon'

moduleFor('route:application', 'Unit | Route | application', {
  beforeEach: function beforeEach () {
    /**
     * Stubbing the Session Service.
     * @type {service}
     */
    const sessionStub = Ember.Service.extend({ login: sinon.stub() })
    this.register('service:session', sessionStub)
    this.inject.service('session')
  }
})

/**
 * When trying to access the app when not authenticated, the user should be
 * redirected to the login page.
 */
test('Accessing the app without being authenticated', function (assert) {
  assert.expect(1)
  // Create route instance.
  let route = this.subject()

  // Stub the Session Service login function to return that the user is not
  // authenticated.
  route.get('session.login').returns(RSVP.Promise.reject())

  // Stub the function used to redirect the user.
  sinon.stub(route, 'redirectToLogin')

  // Invoke the function to be tested.
  return route.beforeModel().then(() => {
    // Verify that the user has been redirected.
    assert.strictEqual(route.redirectToLogin.callCount, 1)
  })
})

/**
 * When trying to access the app when authenticated, the user should be allowed
 * to enter the app.
 */
test('Accessing the app while being authenticated', function (assert) {
  assert.expect(1)
  // Create route instance.
  let route = this.subject()

  // Stub the Session Service login function to return that the user is
  // authenticated.
  route.get('session.login').returns(RSVP.Promise.resolve())

  // Stub the function used to redirect the user.
  sinon.stub(route, 'redirectToLogin')

  // Invoke the function to be tested.
  return route.beforeModel().then(() => {
    // Verify that the user has not been redirected.
    assert.strictEqual(route.redirectToLogin.callCount, 0)
  })
})
