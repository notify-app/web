import { moduleForModel, test } from 'ember-qunit'

moduleForModel('token', 'Unit | Model | token', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
})

test('it exists', function (assert) {
  assert.expect(1)
  let model = this.subject()
  // let store = this.store()
  assert.ok(!!model)
})
