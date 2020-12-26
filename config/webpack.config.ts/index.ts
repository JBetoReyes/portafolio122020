export default (env = "production") => {
  process.env.NODE_ENV = "development";
  return [require("./client.dev.ts").default, require("./server.dev").default];
};
