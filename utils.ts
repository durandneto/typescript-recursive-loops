
import { useEventLoopLowPriority} from "./EventLoopLowPriority"
import { useCallStack} from "./CallStack"
import { useEventLoopHighPriority} from "./EventLoopHighPriority"

const video = document.querySelector("#videoElement");
const appWrapper = document.querySelector("#app-wrapper");
const cameraWrapper = document.querySelector("#camera-container");
const animationTemplate = `<div class="animation"></div>`;

const limitBoxes = 10;
const limitLoops = 100;

const Array1 = [...new Array(limitLoops)].map((item, index)=> index +1 );
const counters =  Array(limitBoxes).fill(0);
const dynamicCounter = [];
const timers = [];
let stop = false; 

export const componentTemplate = (id) => {
  return new Promise((resolve, reject) => {
    const component = document.createElement("div");
    component.className = "component";
    component.id = `cp-${id}`;

    const label = document.createElement("p");
    label.className = "label"; 
    label.innerHTML = `Loop ${id +1}`;

    const result = document.createElement("div");
    result.className = "result"; 
    result.innerHTML = `(
      <span class="text_result" id="cp-${id}-counter">
        0
      </span>
    )`;

    label.appendChild(result);
    component.appendChild(label);

    appWrapper.appendChild(component);
    resolve()
  })
}


export const enableStream = () => {

 const video = document.getElementById("videoElement");

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }
}


export const addCounter = (index) => {
  const current = index !== undefined ? index : (dynamicCounter.push(0) - 1);

  if (!stop) {
    dynamicCounter[current] ++
    if (dynamicCounter[current] === 1) {
      componentTemplate(current)
       .then(r => {
          document.getElementById(`cp-${current}-counter`).innerHTML = dynamicCounter[current];
       })
    } else {
        document.getElementById(`cp-${current}-counter`).innerHTML = dynamicCounter[current];
    }
  }

  timers[current] = setTimeout(addCounter, 10, current);
}


export const stopCounter = () => {
  stop = true;
}

export const resumeCounter = () => {
  stop = false;
}

export const startCounter = (index) => {
document.getElementById(`cp-running`).innerHTML = 0;
  const currentIndex = index || 0;
  componentTemplate(currentIndex)
    .then(r => {
      

      
      //using a while loop
      const myLoop = useCallStack;

      // using recursive function and promises
      // const myLoop = useEventLoopHighPriority; 

      // using recursive function and setTimeout
      // const myLoop = useEventLoopLowPriority;

      // mixing promises and settimeout
      // const myLoop = currentIndex % 2 === 0 ? useEventLoopHighPriority : useEventLoopLowPriority

      myLoop(Array1, ([,,,isFristItem,isLastItem]) => {
        document.getElementById(`cp-${currentIndex}-counter`).innerHTML = ++counters[currentIndex];
        if (isFristItem) {

         document.getElementById(`cp-started`).innerHTML = parseInt(document.getElementById(`cp-started`).innerHTML) + limitLoops
        } 

         document.getElementById(`cp-running`).innerHTML = parseInt(document.getElementById(`cp-running`).innerHTML) + 1 


        if (isLastItem) {
          document.getElementById(`cp-${currentIndex}`).classList.add("success");
         document.getElementById(`cp-completed`).innerHTML = parseInt(document.getElementById(`cp-completed`).innerHTML) + limitLoops
 
           document.getElementById(`cp-running`).innerHTML = document.getElementById(`cp-running`).innerHTML - limitLoops
        }
      })
      if (currentIndex < limitBoxes -1) {
        // setTimeout(() => {
          startCounter(currentIndex + 1)
        // },0)
      }
    });
}