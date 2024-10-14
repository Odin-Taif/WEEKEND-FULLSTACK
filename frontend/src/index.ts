//console.log("am woriking on the front end");

const form = document.getElementById("form") as HTMLFormElement;

const postData = async (formData: any) => {
  const params = new URLSearchParams(formData);
  console.log("Form data to post:", params.toString());

  try {
    const response = await fetch("http://localhost:4000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Response from server:", responseData);
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const driverInput = document.getElementById(
      "driverInput"
    ) as HTMLFormElement;
    const navigatorInput = document.getElementById(
      "navigatorInput"
    ) as HTMLFormElement;
    const nextNavigatorInput = document.getElementById(
      "nextNavigatorInput"
    ) as HTMLFormElement;
    const facilitatorInput = document.getElementById(
      "facilitatorInput"
    ) as HTMLFormElement;
    console.log(driverInput.value);
    const formData = {
      driver: driverInput.value,
      navigator: navigatorInput.value,
      nextNavigator: nextNavigatorInput.value,
      facilitator: facilitatorInput.value,
    };
    alert("Do you want to submit your mop session?");
    postData(formData);
    resetSession();
    fetchSubmissions();
  });
}

// timer code.
let timerInterval: any;
let timeRemaining = 0;

const secondsInput = document.getElementById(
  "secondsInput"
) as HTMLInputElement;
const startButton = document.getElementById("startButton") as HTMLButtonElement;
const pauseButton = document.getElementById("pauseButton") as HTMLButtonElement;
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;
const timerDisplay = document.getElementById("timerDisplay") as HTMLElement;

//-=-=-=-=-=-= functions
function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

function startTimer() {
  clearInterval(timerInterval); // Clear any existing timer
  timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      alert("Time's up!");
    }
  }, 1000);
}

function resetSession() {
  clearInterval(timerInterval);
  timeRemaining = 0;
  updateTimerDisplay();
  secondsInput.value = "";
}
//-=-=-=-=-=-events listenrs
pauseButton.addEventListener("click", () => {
  clearInterval(timerInterval);
});
resetButton.addEventListener("click", () => {
  resetSession();
});

startButton.addEventListener("click", () => {
  const seconds = parseInt(secondsInput.value);
  if (!isNaN(seconds) && seconds > 0) {
    timeRemaining = seconds * 60;
    updateTimerDisplay();
    startTimer();
  } else {
    alert("Please enter a valid number of minutes.");
  }
});

// submission list fetching and displaying
async function fetchSubmissions() {
  try {
    const response = await fetch("http://localhost:4000/submissions");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const submissions = await response.json();
    console.log("Fetched submissions:", submissions);
    displaySubmissions(submissions); // Call a function to display the submissions
  } catch (error) {
    console.error("Error fetching submissions:", error);
  }
}
function displaySubmissions(submissions: any) {
  const submissionsList = document.getElementById(
    "submissionsList"
  ) as HTMLElement;

  submissionsList.innerHTML = "";

  submissions.forEach((submission: any, index: number) => {
    const submissionItem = document.createElement("div");
    submissionItem.classList.add("submission-item");

    submissionItem.innerHTML = `
      <div class="border-b-4 border-red-600">
        <p class="">Session ID: <span>${index + 1}</span></p>
        <p class="">Driver: <span class="percentage">${
          submission.driver
        }%</span></p>
        <p class="">Navigator: <span class="percentage">${
          submission.navigator
        }%</span></p>
        <p class="">Next Navigator: <span class="percentage">${
          submission.nextNavigator
        }%</span></p>
        <p class="">Facilitator: <span class="percentage">${
          submission.facilitator
        }%</span></p>
      </div>
    `;
    submissionsList.appendChild(submissionItem);
  });
}
// Call the fetchSubmissions function when the page loads or based on your requirements
window.onload = fetchSubmissions;
