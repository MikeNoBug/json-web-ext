import chokdir from "chokidar";
import fs from "fs-extra";

function main() {
  console.log("config-dev-start");
  chokdir.watch("./src").on("all", () => {
    fs.copySync("./src/manifest.json", "../../dist/manifest.json");
    fs.copySync("./src/icons", "../../dist/icons");
    console.log("config changed");
  });
}

main();
