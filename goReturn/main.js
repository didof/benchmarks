"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var benchmarkUnaryFunc_1 = require("./benchmarkUnaryFunc");
/**
 * Go-like return signature
 */
function withGoReturn(n) {
    if ((n ^ 1) == (n + 1)) {
        return [Math.pow(n, n), null];
    }
    return [null, new Error("number is odd")];
}
/**
 * Classic throw mechanism
 */
function withThrow(n) {
    if ((n ^ 1) == (n + 1)) {
        return Math.pow(n, n);
    }
    throw new Error("number is odd");
}
var iterations = Math.pow(10, 7);
var reportGo = (0, benchmarkUnaryFunc_1.default)({
    iterations: iterations,
    param: 10,
    func: withGoReturn,
    funcCtx: function (n, func) {
        var es = 0;
        var _a = func(n), v = _a[0], e = _a[1];
        // perform work to ensure the optimizer doesn't skip array destructuring
        if (e !== null) {
            es++;
            return;
        }
        v++; // FIXME Why doesn't it infere it must me number here?
    },
}).print();
var reportThrow = (0, benchmarkUnaryFunc_1.default)({
    iterations: iterations,
    param: 10,
    func: withThrow,
    funcCtx: function (n, func) {
        var es = 0;
        try {
            var v = func(n);
            v++;
        }
        catch (err) {
            es++;
        }
    },
}).print();
console.info("The try-catch & throw has an order of magnitude of 10^".concat(reportThrow.compare(reportGo.elapsedNanoseconds), " compared to the go-syntax!"));
