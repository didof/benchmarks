"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BenchmarkReport = /** @class */ (function () {
    function BenchmarkReport(funcName, ns) {
        this.funcName = funcName;
        this.ns = ns;
    }
    BenchmarkReport.prototype.print = function () {
        var p = console.info;
        var w = 18;
        p("Report".padStart(w, "~").padEnd(w * 2 - "Report".length, "~"));
        p("funcName:".padEnd(w), this.funcName);
        p("ns:".padEnd(w), this.ns);
        return this;
    };
    Object.defineProperty(BenchmarkReport.prototype, "elapsedNanoseconds", {
        get: function () {
            return this.ns;
        },
        enumerable: false,
        configurable: true
    });
    BenchmarkReport.prototype.compare = function (ns) {
        return Math.log10(this.ns) - Math.log10(ns);
    };
    return BenchmarkReport;
}());
function benchmarkUnaryFunc(_a) {
    var iterations = _a.iterations, func = _a.func, param = _a.param;
    var start = process.hrtime();
    for (var i = 0; i < iterations; i++) {
        func(param);
    }
    var end = process.hrtime(start);
    var ns = end[0] * 1e9 + end[1];
    return new BenchmarkReport(func.name, ns);
}
exports.default = benchmarkUnaryFunc;
