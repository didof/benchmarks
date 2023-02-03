# The go-like Return Style is Nice and Fast

> **Disclaimer!**
>
> I am not a professional benchmarker. If there is any error in my logic, please let me know via [mail](mailto:didonato.fr@gmail.com) or [twitter](https://twitter.com/did0f).

During a relaxed Friday evening consisting of lo-fi, chill, and code I found myself wanting to bring the syntax of go into typescript.

I refer to this:

```go
v, err := do()
if err != nil {
    os.Exit(1)
}
```

Trying to achieve:

```ts
const [v, err] = do()
if(err !== null) {
    process.exit(1)
}
```

## Implementation

```ts
type Go<T> = [T, null] | [null, Error]
```

With this very simple type, it is possible to infer this kind of syntax to the return type of a function:

```ts
function do(n: number): Go<number> {
    if (isEven(n)) {
        return [n ** n, null]
    }
    return [null, new Error("number is odd")]
}
```

So that when it is used you feel the nostalgia of goland:

```ts
const [v, err] = do()
```

## Benchmark

On my machine, the *go-syntax* seems to be much more fast than the *try-catch & throw* one.

Try it out yourself:

```bash
yarn typescript @types/node
yarn start
``` 

## Inspiration

The first time I saw this syntax was in [await-to-js](https://www.npmjs.com/package/await-to-js). This simple little library (I recommend it) achieves the same result for *promises* (if used in conjuction with `await`).
As for the synchronous world, I think this solution of mine comes closest. Although it requires explicitly writing code in a certain way -- a way, in my opinion, better than throwing stuff around :)