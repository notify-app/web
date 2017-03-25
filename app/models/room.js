import DS from 'ember-data'

export default DS.Model.extend({
  /**
   * session is used to get the details of the current logged in user.
   * @type {service:session}
   */
  session: Ember.inject.service(),

  /**
   * name of the room.
   */
  name: DS.attr('string'),

  /**
   * image name.
   */
  image: DS.attr('string'),

  /**
   * indicates whether the room is a private room.
   */
  private: DS.attr('boolean'),

  /**
   * users who are inside the room.
   */
  users: DS.hasMany('user', {
    inverse: 'rooms'
  }),

  /**
   * messages written in the room.
   */
  messages: DS.hasMany('message', {
    inverse: 'room'
  }),

  /**
   * uiName is the room name used in the UI. Show the room's name if it has one
   * assigned, else use the concatination of the usernames of its members
   * (excluding the logged in user).
   */
  uiName: Ember.computed('name', function () {
    // If the room has been assigned a name, use the assigned name.
    if (this.get('name') != null) return this.get('name')

    // In case the room hasn't got a name, the name of the room should be the
    // concatination of the room member's usernames (excluding the logged in
    // user).
    return this.get('users')
      .filter(friend => friend !== this.get('session.user'))
      .map(friend => friend.get('username'))
      .join(', ') || 'New Room'
  }),

  /**
   * uiImage is the image name used in the UI. Show the room's image if it has
   * one assigned, else use the image of a user
   */
  uiImage: Ember.computed('image', function () {
    // Get room image
    const image = this.get('image')

    // If the room has been assigned an image, use the assigned image.
    if (image != null) return image

    // In case the room hasn't got an image:
    //   > First try to use the image of a random member.
    //   > If no member has an image, display the default image.
    const users = this.get('users')

    for (let index = 0; index < users.get('length'); index++) {
      // Ignore user if it is the logged in user.
      if (users.objectAt(index) === this.get('session.user')) continue

      // Retrieve user image.
      const userImage = users.objectAt(index).get('image')

      // Ignore user if he doesn't have an image.
      if (userImage == null) continue

      // Set image.
      return userImage
    }

    // Else return the default image.
    return 'no-conversation-image.png'
  })
})
