'use strict';

const Base = require('./base.js');

module.exports = class extends Base {
    indexAction() {
        console.log("indexPage");
        console.log(this);
        return this.display();
    }
};
//# sourceMappingURL=index.js.map