import Vue from 'vue';
import AddMovie from '@/components/AddMovie';
import { assert } from 'chai';

function addElemWithDataAppToBody() {
  const app = document.createElement('div');
  app.setAttribute('data-app', true);
  document.body.append(app);
}

describe('AddMovie', () => {
  let Component;
  let vm;

  addElemWithDataAppToBody();

  beforeEach(() => {
    Component = Vue.extend(AddMovie);
    vm = new Component({
      data: {
        years: ['2018', '2017', '2016', '2015'],
      },
    }).$mount();
  });

  it('equals years to ["2018", "2017", "2016", "2015"]', () => {
    expect(vm.years).to.eql(['2018', '2017', '2016', '2015']);
  });

  it('has a submit() method', () => {
    assert.deepEqual(typeof vm.submit, 'function');
  });

  it('has a clear() method', () => {
    assert.deepEqual(typeof vm.clear, 'function');
  });
});
