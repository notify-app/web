import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('chat-room-item', 'Integration | Component | chat room item', {
  integration: true
})

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value')
  // Handle any actions with this.on('myAction', function (val) { ... })

  this.render(hbs`{{chat-room-item}}`)

  assert.equal(this.$().text().trim(), '')

  // Template block usage:
  this.render(hbs`
    {{#chat-room-item}}
      template block text
    {{/chat-room-item}}
  `)

  assert.equal(this.$().text().trim(), 'template block text')
})
