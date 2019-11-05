import init from './initpg.js';

const main = function () {
    init.bindEventListeners();
    init.render();
};

$(main);