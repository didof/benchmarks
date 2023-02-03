class BenchmarkReport {
    constructor(private funcName: string, private ns: number) { }

    public print() {
        const { info: p } = console
        const w = 18
        p("Report".padStart(w, "~").padEnd(w * 2 - "Report".length, "~"))
        p("funcName:".padEnd(w), this.funcName)
        p("ns:".padEnd(w), this.ns)
        return this
    }

    get elapsedNanoseconds(): number {
        return this.ns
    }

    compare(ns: number) {
        return Math.log10(this.ns) - Math.log10(ns)
    }
}

interface BenchmarkUnaryFuncConfiguration<T extends (...args: any) => any> {
    iterations: number
    func: (params: Parameters<T>[0]) => ReturnType<T>
    param: Parameters<T>[0]
    funcCtx?: (iterations: number, func: (params: Parameters<T>[0]) => ReturnType<T>) => void
}
export default function benchmarkUnaryFunc<T extends (...args: any) => any>({
    iterations,
    func,
    param,
}: BenchmarkUnaryFuncConfiguration<T>): BenchmarkReport {
    const start = process.hrtime()
    for (let i = 0; i < iterations; i++) {
        func(param)
    }
    const end = process.hrtime(start)
    const ns = end[0] * 1e9 + end[1]
    return new BenchmarkReport(func.name, ns)
}
