const logFunc = true ? console.log : () => {};
class Log {
  static log(...args) {
    // Usually I do some normalization and enhancement here by map over the args
    const enhancedArgs = args.map(arg => JSON.stringify(arg, null, 2));
    // Call the logFunc with console
    logFunc.apply(console, enhancedArgs);
  }
}
