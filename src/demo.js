import create from "evented-ts";

window.addEventListener("DOMContentLoaded", () => {
  const demo = document.querySelector(".demo");
  const button = demo.querySelector("button");
  const list = demo.querySelector("ul");

  button.addEventListener("click", () => {
    evented.fire("serve", "&#x1F3BE;");
  });

  const evented = create();

  const onEvent = (e) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${
      e.name
    }</strong> was fired at ${new Date().toLocaleTimeString("en")} with args: ${
      e.args
    }`;
    list.appendChild(item);

    if (e.name === "serve") {
      window.setTimeout(() => {
        evented.fire("return", "&#x1F3BE;");
      }, 1000);
    }
  };

  evented.on("serve", onEvent);
  evented.on("return", onEvent);
});
