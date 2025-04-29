import fs from "fs-extra";

const main = () => {
  fs.copySync("./packages/config/src/manifest.json", "dist/manifest.json");
  fs.copySync("./packages/config/src/icons", "dist/icons");
};

main();
