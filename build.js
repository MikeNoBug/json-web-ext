import fs from "fs-extra";

const main = () => {
  fs.copySync("./packages/config/manifest.json", "dist/manifest.json");
  fs.copySync("./packages/config/icons", "dist/icons");
};

main();
