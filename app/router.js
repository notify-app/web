import Ember from 'ember'
import config from './config/environment'

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('chat', { path: '/app' }, function () {
    this.route('room', { path: 'room/:room_id' })
    this.route('bots')
  })
})

export default Router
