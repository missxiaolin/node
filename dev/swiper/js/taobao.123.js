// var swiper = new Swiper(".global-promotion", {
//   slidesPerView: 1.12,
//   slidesOffsetAfter: document.body.clientWidth * 0.115,
//   watchSlidesProgress: true,
//   on: {
//     touchMove: function () {
//       deg = this.progress * 4 * 45;
//       this.$el
//         .parents(".global")
//         .find(".global-circle")
//         .transform("rotate(-" + deg + "deg)");
//     },
//     setTransition: function (transition) {
//       deg = this.progress * 4 * 45;
//       this.$el
//         .parents(".global")
//         .find(".global-circle")
//         .transition(transition)
//         .transform("rotate(-" + deg + "deg) translate3d(0, 0, 0)");
//     },
//   },
// });

var swiper = new Swiper(".global-promotion", {
  slidesPerView: 1.12,
  slidesOffsetAfter: 15,
  slidesOffsetBefore: 15,
  watchSlidesProgress: true,
  on: {
    touchMove: function () {
      deg = this.progress * 4 * 45;
      this.$el
        .parents(".global")
        .find(".global-circle")
        .transform("rotate(-" + deg + "deg)");
    },
    setTransition: function (transition) {
      deg = this.progress * 4 * 45;
      this.$el
        .parents(".global")
        .find(".global-circle")
        .transition(transition)
        .transform("rotate(-" + deg + "deg) translate3d(0, 0, 0)");
    },
  },
});
