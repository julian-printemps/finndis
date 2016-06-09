import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),

  userLabels: Ember.computed(function() {
    var labels = this.get('store').peekAll('label');
    return labels;
  }),

  didInsertElement: function() {
      var lastScrollTop = 0;
      $(window).scroll(function(event){
         var st = $(this).scrollTop();
         if (st > lastScrollTop && st > 150){
             if( !$('#navigation').hasClass('__hidden') ){
               $('#navigation').addClass('__hidden');
             }
         } else {
           if( $('#navigation').hasClass('__hidden') ){
             $('#navigation').removeClass('__hidden');
           }
         }
         lastScrollTop = st;
      });
  },

  actions: {

    willTransition(){
      this._super();
      this.set('labelPanelClass', '');
    },

    showMenuPanel() {
      this.set('labelPanelClass', 'show');
      $('body').toggleClass('__noscroll');
    },

    closeMenuPanel() {
      this.set('labelPanelClass', '');
      $('body').toggleClass('__noscroll');
    },

    logout() {
      this.get('session').invalidate();
    },

  }
});
