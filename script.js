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

// Variables
const monthFormat = 'MMMM - yyyy';
// Set the current month
let currentMonth = format(new Date(), monthFormat);
// Selected date
let selectedDate = new Date().getDate();

// Toggle the date picker
datePickerButton.addEventListener('click', () => {
  datePickerEl.classList.toggle('show');
});

// Display the current date on the button
datePickerButton.textContent = format(new Date(), 'MMMM do, yyyy');
// Display the current month
currentMonthEl.textContent = currentMonth;

prevMonthButton.addEventListener('click', () => {
  // Update the current month by subtracting 1 month
  currentMonth = format(
    subMonths(parse(currentMonth, monthFormat, new Date()), 1),
    monthFormat
  );
  // Display the  updated month
  currentMonthEl.textContent = currentMonth;
  // Fill the days of the previous month
  fillInDays();
});

nextMonthButton.addEventListener('click', () => {
  // Update the current month by adding 1 month
  currentMonth = format(
    addMonths(parse(currentMonth, monthFormat, new Date()), 1),
    monthFormat
  );
  // Display the  updated month
  currentMonthEl.textContent = currentMonth;
  // Fill the days of the next month
  fillInDays();
});

function fillInDays() {
  // Remove all the html from the date picker before filling in the new days
  datePickerDates.innerHTML = '';

  //   Get the total days of the current month
  const daysOfCurrentMonth = getDaysInMonth(
    parse(currentMonth, monthFormat, new Date())
  );
  //   Get the day of the week the month starts 0(Sunday) - 6(Saturday)]
  const startOfCurrentMonth = startOfMonth(
    parse(currentMonth, monthFormat, new Date())
  ).getDay();
  //   Get the day of the week the month end [0(Sunday) - 6(Saturday)]
  const endOfCurrentMonth = endOfMonth(
    parse(currentMonth, monthFormat, new Date())
  ).getDay();

  // Get the total number of days of the previous month
  const totalDaysOfPreviousMonth = getDaysInMonth(
    subMonths(parse(currentMonth, monthFormat, new Date()), 1)
  );

  // For the previous month it start from the start of current month day - 1 and counts backwards subtracting it from the total days of the previous month
  for (let i = startOfCurrentMonth - 1; i >= 0; i--) {
    const prevMonthDateEl = document.createElement('button');
    prevMonthDateEl.classList.add('date', 'date-picker-other-month-date');
    prevMonthDateEl.textContent = `${totalDaysOfPreviousMonth - i}`;
    datePickerDates.appendChild(prevMonthDateEl);
  }

  // Current month days must start at 1 and loop through the current month days [inclusive]
  for (let i = 1; i <= daysOfCurrentMonth; i++) {
    const currentMonthDateEl = document.createElement('button');
    currentMonthDateEl.classList.add('date');
    if (i === selectedDate) {
      currentMonthDateEl.classList.add('selected');
    }
    currentMonthDateEl.textContent = i;
    datePickerDates.appendChild(currentMonthDateEl);
  }

  // Next month days start at 1 but loop only through the remaining days of the week (6 - endOfCurrentMonth)
  for (let i = 1; i <= 6 - endOfCurrentMonth; i++) {
    const nextMonthDateEl = document.createElement('button');
    nextMonthDateEl.classList.add('date', 'date-picker-other-month-date');
    nextMonthDateEl.textContent = `${i}`;
    datePickerDates.appendChild(nextMonthDateEl);
  }
}

fillInDays();
