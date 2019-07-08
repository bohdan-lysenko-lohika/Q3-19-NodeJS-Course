const some1 = require('./some-1');
const some2 = require('./some-1/some-2');
const some3 = require('./some-1/some-2/some-3');

const ARG_REVERSE_ORDER = 'reverse-order';

const argument = process.argv && process.argv[2];
const isReverseOrder = argument === ARG_REVERSE_ORDER;

function printRequiredFilesInModule(module, isReverseOrder) {
    const children = isReverseOrder
        ? module.children.slice().reverse()
        : module.children;

    children.forEach((m) => {
        console.log(m.filename);
        if (!m.children.length) {
            return;
        }
        printRequiredFilesInModule(m, isReverseOrder);
    });
}

printRequiredFilesInModule(module, isReverseOrder);
