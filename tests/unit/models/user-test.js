import { moduleForModel, test } from 'ember-qunit'

moduleForModel('user', 'Unit | Model | user', {
  needs: [
    'model:room',
    'model:state',
    'model:grant',
    'model:message',
    'model:token'
  ]
})

/**
 * When a user has been assigned an image, when display the user's image, it
 * should display the assigned image.
 */
test('Image of a user who has not been assigned an image', function (assert) {
  assert.expect(1)
  const model = this.subject({ image: null })
  assert.strictEqual(model.get('uiImage'), 'no-user-image.png')
})

/**
 * When a user has not been assigned an image, when displaying he user's image,
 * it should display the default app image.
 */
test('Image of a user who has been assigned an image', function (assert) {
  assert.expect(1)
  const userImage = 'user.png'
  const model = this.subject({ image: userImage })
  assert.strictEqual(model.get('uiImage'), userImage)
})
