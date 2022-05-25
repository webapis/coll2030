import IntersectionObserver from "intersection-observer-polyfill";

export default class Intersetion {
  constructor({ items, callback, threehold, triggerOnce = false }) {
    if (items == null) return;
    this.items = items;

    const options = {
      threshold: threehold
    };

    this.observer = new IntersectionObserver(observables => {
      observables.forEach(observable => {
        if (observable.isIntersecting) {
     
          if (triggerOnce) this.observer.unobserve(observable.target);
        }

        callback(observable.isIntersecting, observable);
      });
    }, options);

    this.browseItems();
  }

  browseItems() {
    this.items.forEach(item => {
      this.observer.observe(item);
    });
  }
}