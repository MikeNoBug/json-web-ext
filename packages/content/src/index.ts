const main = () => {
  document.addEventListener("contextmenu", (e) => {
    console.log("content", e);
  });
};

main();
