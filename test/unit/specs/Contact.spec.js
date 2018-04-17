import Vue from 'vue';
import Contact from '@/components/Contact';

describe('Contact.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Contact);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.contact h1').textContent)
      .to.equal('this is contact');
  });
});
