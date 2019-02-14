import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.localStorage = {
  setItem(key, string) {
    global.localStorage[key] = string;
  },
  getItem(key) {
    return global.localStorage[key] || null;
  },
  removeItem(key) {
    delete global.localStorage[key];
  },
  clear() {
    global.localStorage = {};
  }
};
