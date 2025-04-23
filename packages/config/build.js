import fs from "fs-extra";

function main() {
  console.log("config-build-start");
  fs.copySync()("./src/manifest.json", "../../dist/manifest.json");
  fs.copySync("./src/icons", "../../dist/icons");
  console.log("config-build-end");
}

main();
