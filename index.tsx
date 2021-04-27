import "./style.css"
import {
  componentTemplate,
  enableStream,
  startCounter,
  addCounter,
  stopCounter,
  resumeCounter,
} from "./utils"

const btStartCounter = document.getElementById(`startCounter`);
const btAddCounter = document.getElementById(`addCounter`);
const btStopCounter = document.getElementById(`stopCounter`);
const btResumeCounter = document.getElementById(`resumeCounter`);
const appWrapper = document.querySelector("#app-wrapper");

// enableStream();

btAddCounter.addEventListener("click", () => {
  addCounter()
})

btStopCounter.addEventListener("click", () => {
  stopCounter()
})

btResumeCounter.addEventListener("click", () => {
  resumeCounter()
})

btStartCounter.addEventListener("click", () => {
  appWrapper.innerHTML = "";
  startCounter()
})