import {
  format,
  subMonths,
  addMonths,
  parse,
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

// DOM elements
const datePickerButton = document.querySelector('.date-picker-button');
const datePickerEl = document.querySelector('.date-picker');
const currentMonthEl = document.querySelector('.current-month');
const prevMonthButton = document.querySelector('.prev-month-button');
const nextMonthButton = document.querySelector('.next-month-button');
const datePickerDates = document.querySelector('.date-picker-grid-dates');

const monthFormat = 'MMMM - yyyy';

// Set the current month
let currentMonth = format(new Date(), monthFormat);
console.log(currentMonth);
// Selected date
let selectedDate = new Date().getDate();

// Display the current date on the button
datePickerButton.textContent = format(new Date(), 'MMMM do, yyyy');
// Display the current month
currentMonthEl.textContent = currentMonth;

// FUNCTIONS
function getPreviousMonth() {
  // Update the current month by subtracting 1 month
  currentMonth = format(
    subMonths(parse(currentMonth, monthFormat, new Date()), 1),
    monthFormat
  );
  // Display the  updated month
  currentMonthEl.textContent = currentMonth;
}

function getNextMonth() {
  // Update the current month by adding 1 month
  currentMonth = format(
    addMonths(parse(currentMonth, monthFormat, new Date()), 1),
    monthFormat
  );
  // Display the updated month
  currentMonthEl.textContent = currentMonth;
}

function fillInDays() {
  // Remove all the html from the date picker before filling in the new days
  datePickerDates.innerHTML = '';

  // Get the total days of the current month
  const daysOfCurrentMonth = getDaysInMonth(
    parse(currentMonth, monthFormat, new Date())
  );
  // Get the day of the week the month starts 0(Sunday) - 6(Saturday)]
  const startOfCurrentMonth = startOfMonth(
    parse(currentMonth, monthFormat, new Date())
  ).getDay();
  // Get the day of the week the month end [0(Sunday) - 6(Saturday)]
  const endOfCurrentMonth = endOfMonth(
    parse(currentMonth, monthFormat, new Date())
  ).getDay();

  // Get the total number of days of the previous month
  const totalDaysOfPreviousMonth = getDaysInMonth(
    subMonths(parse(currentMonth, monthFormat, new Date()), 1)
  );

  // For the previous month it start from the start of current month day(0 - 6) - 1 until it gets to 0
  for (let i = startOfCurrentMonth - 1; i >= 0; i--) {
    const prevMonthDateEl = document.createElement('button');
    prevMonthDateEl.classList.add('date', 'date-picker-other-month-date');
    // Subtract i from the total days of the previous month
    prevMonthDateEl.textContent = `${totalDaysOfPreviousMonth - i}`;
    datePickerDates.appendChild(prevMonthDateEl);
  }

  // Current month days must start at 1 and loop through the current month days [inclusive]
  for (let i = 1; i <= daysOfCurrentMonth; i++) {
    const currentMonthDateEl = document.createElement('button');
    currentMonthDateEl.classList.add('date');
    if (i == selectedDate) {
      currentMonthDateEl.classList.add('selected');
    }
    currentMonthDateEl.textContent = i;
    datePickerDates.appendChild(currentMonthDateEl);
  }

  // Next month days start at 1 and loops only through the remaining days of the week (6 - endOfCurrentMonth)
  for (let i = 1; i <= 6 - endOfCurrentMonth; i++) {
    const nextMonthDateEl = document.createElement('button');
    nextMonthDateEl.classList.add('date', 'date-picker-other-month-date');
    nextMonthDateEl.textContent = `${i}`;
    datePickerDates.appendChild(nextMonthDateEl);
  }
}

// EVENT LISTENERS
// Toggle the date picker
datePickerButton.addEventListener('click', () => {
  datePickerEl.classList.toggle('show');
});

prevMonthButton.addEventListener('click', () => {
  // Get the previous month when clicked
  getPreviousMonth();
  // Set the selected date to none
  selectedDate = '';
  // Fill the days of the previous month
  fillInDays();
});

nextMonthButton.addEventListener('click', () => {
  // Get the next month when clicked
  getNextMonth();
  // Set the selected date to none
  selectedDate = '';
  // Fill the days of the next month
  fillInDays();
});

// Because buttons are generated every time the month changes use event delegation
datePickerDates.addEventListener('click', e => {
  // Check to see if the target of the click is not a date and exit the function
  if (!e.target.matches('.date')) return;

  // Set the selected date to the button's text
  selectedDate = e.target.textContent;

  // Check to see if the target is a date from another month
  if (e.target.matches('.date-picker-other-month-date')) {
    // If the date selected is greater than 20 then the date is from the previous month
    if (parseInt(e.target.textContent) > 20) {
      // Call getPreviousMonth()
      getPreviousMonth();
    } else {
      // Else the date is from the next month and call getNextMonth()
      getNextMonth();
    }
  }
  // Change the button's text to the selected date
  datePickerButton.textContent = format(
    parse(`${selectedDate} - ${currentMonth}`, 'd - MMMM - yyyy', new Date()),
    'MMMM do, yyyy'
  );
  // Hide the date picker
  datePickerEl.classList.remove('show');

  // Fill in the days with the updated selected date
  fillInDays();
});

// Fill in the dats with the current date and month
fillInDays();
