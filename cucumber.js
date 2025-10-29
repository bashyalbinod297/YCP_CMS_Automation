module.exports = {
  default: {
    require: [
      "ts-node/register",
      "steps/**/*.ts",
      "support/**/*.ts"
    ],
    paths: [
      "features/**/*.feature"
    ],
    publishQuiet: true,
    format: ["progress"]
  }
}