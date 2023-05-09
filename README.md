# logger-exercise

## Example

```typescript
const logger = new Logger([
  { logLevel: "debug", target: "console" },
]);

// Prints only console
logger.log("hello world");

logger.addTargetConfigs([
  { logLevel: "error", target: "email" },
]);

// prints console and email
logger.log("hello world", "error");
// Prints only console
logger.log("hello world");

```

## Considerations

- Using `for` loop with cached length and number comparisons for greatest performance.
- Multi-Threading doesn't really apply for Javascript/Typescript codebases.
- Using Typescript for self-explanatory code and typings.
- Could be improved by a function which let's us remove target configs.
- Adding tests would improve the codebase quality.