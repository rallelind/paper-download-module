import { ComputeModule } from "@palantir/compute-module";
import { Type } from "@sinclair/typebox";

const myModule = new ComputeModule({
  logger: console,
  definitions: {
    sum: {
      input: Type.Object({
        a: Type.Number(),
        b: Type.Number(),
      }),
      output: Type.String(),
    },
    hello: {
      input: Type.Object({
        name: Type.String(),
      }),
      output: Type.String(),
    },
  },
});
myModule
  .register("sum", async ({ a, b }) => String(a + b))
  .register("hello", async ({ name }) => `Hello, ${name}!`);
