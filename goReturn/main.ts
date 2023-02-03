import benchmarkUnaryFunc from "./benchmarkUnaryFunc"

/**
 * Hypohesis:
 * A return signature in the manner of go in addition to being more streamlined than a try-catch,
 * is also more performant since the throw mechanism does not occur.
 */

type Go<T> = [T, null] | [null, Error]

/**
 * Go-like return signature
 */
function withGoReturn(n: number): Go<number> {
    if ((n ^ 1) == (n + 1)) {
        return [n ** n, null]
    }
    return [null, new Error("number is odd")]
}

/**
 * Classic throw mechanism
 */
function withThrow(n: number): number {
    if ((n ^ 1) == (n + 1)) {
        return n ** n
    }
    throw new Error("number is odd")
}

const iterations = Math.pow(10, 7)

const reportGo = benchmarkUnaryFunc({
    iterations,
    param: 10,
    func: withGoReturn,
    funcCtx: (n, func) => {
        let es = 0
        let [v, e] = func(n)

        // perform work to ensure the optimizer doesn't skip array destructuring
        if (e !== null) {
            es++
            return
        }
        v!++ // FIXME Why doesn't it infere it must me number here?
    },
}).print()

const reportThrow = benchmarkUnaryFunc<typeof withThrow>({
    iterations,
    param: 10,
    func: withThrow,
    funcCtx: (n, func) => {
        let es = 0
        try {
            let v = func(n)
            v++
        } catch (err) {
            es++
        }
    },
}).print()

console.info(`The try-catch & throw has an order of magnitude of 10^${reportThrow.compare(reportGo.elapsedNanoseconds)} compared to the go-syntax!`)