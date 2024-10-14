import { readFileSync } from "fs";
import path from "path";
import { startTimer } from "../index";

//-==-=-=-=- Integration tests
// Read the HTML file
const html = readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");
beforeEach(() => {
  document.body.innerHTML = html;
});
//0
test("driverInput value should be 0", () => {
  const driverInput = document.getElementById("driverInput");

  const inputValue = parseInt((driverInput as HTMLInputElement).value, 10);
  expect(inputValue).toBe(0);
});

//1 test for increamenting the input by 10
test("driverInput value should increment by 10 when up arrow is clicked", () => {
  const driverInput = document.getElementById(
    "driverInput"
  ) as HTMLInputElement;

  driverInput.stepUp();

  const inputValue = parseInt(driverInput.value, 10);
  expect(inputValue).toBe(10);
});

//-==-=-=-=- unit tests-===-=-=-|
