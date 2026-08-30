import "./style.css";

import create from "evented-ts";

import "./components/snippet-copy-button";
import "./components/snippet-card";
import "./components/chip-tabs";
import "./components/copyright-year";

const evented = create();
const eventName = "hello";
const payloadInput = document.querySelector<HTMLInputElement>("#event-payload");
const fireButton =
  document.querySelector<HTMLButtonElement>("[data-fire-event]");
const eventResult = document.querySelector<HTMLElement>("[data-event-result]");
const eventStatus = document.querySelector<HTMLElement>("[data-event-status]");
const eventMessage = document.querySelector<HTMLElement>(
  "[data-event-message]",
);

if (payloadInput && fireButton && eventResult && eventStatus && eventMessage) {
  evented.on<{ message: string }>(eventName, (event) => {
    eventResult.dataset.active = "true";
    eventStatus.textContent = "received";
    eventMessage.textContent = event.args?.message ?? "";
  });

  fireButton.addEventListener("click", () => {
    evented.fire(eventName, { message: payloadInput.value });
  });
}
