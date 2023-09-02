module.exports = {
  transform: {
    "^.*\\.tsx?$": "ts-jest",
  },
  testRegex: "^.*\\.test\\.(jsx?|tsx?)$",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^.*\\.css$": "<rootDir>/src/__mocks__/styleMock.cjs",
    "^src/(.*)": "<rootDir>/src/$1",
  },
};
