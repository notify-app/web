import Ember from 'ember'
import { moduleForModel, test } from 'ember-qunit'

moduleForModel('room', 'Unit | Model | room', {
  needs: [
    'model:user',
    'model:message',
    'model:state',
    'model:grant',
    'model:message',
    'model:token'
  ],

  beforeEach: function beforeEach () {
    /**
     * Stubbing the Session Service.
     * @type {service}
     */
    const sessionStub = Ember.Service.extend({
      user: null
    })

    this.register('service:session', sessionStub)
    this.inject.service('session')
  }
})

/**
 * When a room has been assigned a name, when displaying the room's name, it
 * should display the assigned name.
 */
test('Name of a room which has been assigned a name', function (assert) {
  assert.expect(1)
  const name = 'my room'
  const room = this.subject({ name: name })
  assert.strictEqual(room.get('uiName'), name)
})

/**
 * When a room has not been assigned a name, when displaying the room's name,
 * it should display the usernames of the members (excl. the logged in user)
 * seperated by comma.
 */
test('Name of a room which has not been assigned a name', function (assert) {
  assert.expect(1)

  Ember.run(() => {
    // Room members
    const loggedUser = this.store().createRecord('user', { username: 'lucat' })
    const memberOne = this.store().createRecord('user', { username: 'pyterb' })
    const memberTwo = this.store().createRecord('user', { username: 'robbs' })

    // Create room with the above members.
    const room = this.subject({
      users: [loggedUser, memberOne, memberTwo]
    })

    // Set logged in user
    room.get('session').set('user', loggedUser)

    // Do Assertion.
    assert.strictEqual(room.get('uiName'), 'pyterb, robbs')
  })
})

/**
 * When a room has not been assigned a name, and its only member is the logged
 * in user, when displaying the room's name, it should display "New Room".
 */
test('Name of a room which has not been assigned a name and the only member is the logged in user', function (assert) {
  assert.expect(1)

  Ember.run(() => {
    // Room members
    const loggedUser = this.store().createRecord('user', { username: 'lucat' })

    // Create room with the above members.
    const room = this.subject({
      users: [loggedUser]
    })

    // Set logged in user
    room.get('session').set('user', loggedUser)

    // Do Assertion.
    assert.strictEqual(room.get('uiName'), 'New Room')
  })
})

/**
 * When a room has been assigned an image, when displaying the room's image, it
 * should display the assigned image.
 */
test('Image of a room which has been assigned an image', function (assert) {
  assert.expect(1)
  const roomImage = 'room.png'
  const room = this.subject({ image: roomImage })
  assert.strictEqual(room.get('image'), roomImage)
})

/**
 * When a room has not been assigned an image, but it has members that have been
 * assigned one, when display the room's image, it should display an image
 * of a random member (excl. the logged in user) that has an image assigned to
 * him.
 */
test('Image of a room which has not been assigned an image and has members (excl. logged in user) that have been assigned one', function (assert) {
  assert.expect(1)

  Ember.run(() => {
    // Room members
    const memberOne = this.store().createRecord('user', { username: 'pyterb' })
    const memberTwo = this.store().createRecord('user', {
      username: 'robbs',
      image: 'member-two.png'
    })
    const loggedUser = this.store().createRecord('user', {
      username: 'lucat',
      image: 'logged-in-user.png'
    })

    // Create room with the above members.
    const room = this.subject({
      users: [loggedUser, memberOne, memberTwo]
    })

    // Set logged in user.
    room.get('session').set('user', loggedUser)

    // Do Assertion.
    assert.strictEqual(room.get('uiImage'), memberTwo.get('image'))
  })
})

/**
 * When a room and all its members have not been assigned an image, when display
 * the image of the room, it should display the default image.
 */
test('Image of a room which has not been assigned an image, and has no members (excl. logged in user) who have been assigned one', function (assert) {
  assert.expect(1)

  Ember.run(() => {
    // Room members
    const memberOne = this.store().createRecord('user', { username: 'pyterb' })
    const memberTwo = this.store().createRecord('user', { username: 'robbs' })
    const loggedUser = this.store().createRecord('user', {
      username: 'lucat',
      image: 'logged-in-user.png'
    })

    // Create room with the above members.
    const room = this.subject({
      users: [loggedUser, memberOne, memberTwo]
    })

    // Set logged in user.
    room.get('session').set('user', loggedUser)

    // Do Assertion.
    assert.strictEqual(room.get('uiImage'), 'no-conversation-image.png')
  })
})

/**
 * When a room has not been assigned an image, and it has only the logged in
 * user as a member, when display the image, it should display the default
 * image.
 */
test('Image of the room who has not been assigned an image and the only member is the logged in user', function (assert) {
  assert.expect(1)

  Ember.run(() => {
    // Room members
    const loggedUser = this.store().createRecord('user', {
      username: 'lucat',
      image: 'logged-in-user.png'
    })

    // Create room with the above members.
    const room = this.subject({
      users: [ loggedUser ]
    })

    // Set logged in user.
    room.get('session').set('user', loggedUser)

    // Do Assertion.
    assert.strictEqual(room.get('uiImage'), 'no-conversation-image.png')
  })
})
