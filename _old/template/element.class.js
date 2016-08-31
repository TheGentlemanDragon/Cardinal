class Element {
  constructor () {
    this.name = 'element';
    this.container = {
      position: 'relative',
      width: 0,
      height: 0,
      left: 10,
      top: 10
    };
    this.style = {
      position: 'absolute',
      'font-size': 12,
      width: 60,
      height: 20
    };
    this.units = {
      left: 'px',
      top: 'px',
      width: 'px',
      height: 'px',
      'font-size': 'px'
    };
    this.attributes = {};
    this.content = 'text';
    this.layer = 'float';
  }

  get styleElement() {
    return _.transform(this.style, (result, value, key) => {
      result[key] = value + (value && this.units[key] ? this.units[key] : '');
    }, {});
  }

  get styleContainer() {
    return _.transform(this.container, (result, value, key) => {
      result[key] = value + (value && this.units[key] ? this.units[key] : '');
    }, {});
  }
};

module.exports = Element;
