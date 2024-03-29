import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('app-select-chip-bot-room', 'Integration | Component | app select chip bot room', {
  integration: true
})

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value')
  // Handle any actions with this.on('myAction', function(val) { ... })

  this.render(hbs`{{app-select-chip-bot-room}}`)

  assert.equal(this.$().text().trim(), '')

  // Template block usage:
  this.render(hbs`
    {{#app-select-chip-bot-room}}
      template block text
    {{/app-select-chip-bot-room}}
  `)

  assert.equal(this.$().text().trim(), 'template block text')
})
