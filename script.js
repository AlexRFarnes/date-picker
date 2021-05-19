import {
  format,
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';

// DOM elements
const datePickerButton = document.querySelector('.date-picker-button');
const datePickerEl = document.querySelector('.date-picker');
const currentMonthEl = document.querySelector('.current-month');
const prevMonthButton = document.querySelector('.prev-month-button');
const nextMonthButton = document.querySelector('.next-month-button');
const datePickerDates = document.querySelector('.date-picker-grid-dates');

const monthFormat = 'MMMM - yyyy';

// Set the current date
let selectedDate = new Date();
let currentMonth;

// FUNCTIONS
function displayDateOnButton(selectedDate) {
  datePickerButton.textContent = format(selectedDate, 'MMMM do, yyyy');
}

function getMonth(selectedDate) {
  currentMonth = format(selectedDate, monthFormat);
}

function displayMonth(currentMonth) {
  currentMonthEl.textContent = currentMonth;
}

function getPreviousMonth() {
  // Update the current month by subtracting 1 month
  selectedDate = subMonths(selectedDate, 1);
  getMonth(selectedDate);
  displayMonth(currentMonth);
}

function getNextMonth() {
  // Update the current month by adding 1 month
  selectedDate = addMonths(selectedDate, 1);
  getMonth(selectedDate);
  displayMonth(currentMonth);
}

function fillInDays() {
  // Remove all the html from the date picker before filling in the new days
  datePickerDates.innerHTML = '';

  // When the week of the first day of the month begins
  const firstWeekStart = startOfWeek(startOfMonth(selectedDate));
  // When the week of the last day of the month ends
  const lastWeekEnd = endOfWeek(endOfMonth(selectedDate));
  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });

  dates.forEach(date => {
    const dateButton = document.createElement('button');
    dateButton.classList.add('date');
    dateButton.textContent = date.getDate();
    if (!isSameMonth(date, selectedDate)) {
      dateButton.classList.add('date-picker-other-month-date');
    }
    if (isSameDay(date, selectedDate)) {
      dateButton.classList.add('selected');
    }

    dateButton.addEventListener('click', () => {
      selectedDate = date;
      datePickerEl.classList.remove('show');
      fillInDays();
    });
    datePickerDates.appendChild(dateButton);
  });
  displayDateOnButton(selectedDate);
  getMonth(selectedDate);
  displayMonth(currentMonth);
}

// EVENT LISTENERS
// Toggle the date picker
datePickerButton.addEventListener('click', () => {
  datePickerEl.classList.toggle('show');
});

prevMonthButton.addEventListener('click', () => {
  // Get the previous month when clicked
  getPreviousMonth();
  // Fill the days of the previous month
  fillInDays();
});

nextMonthButton.addEventListener('click', () => {
  // Get the next month when clicked
  getNextMonth();
  // Fill the days of the next month
  fillInDays();
});

// Fill in the dats with the current date
fillInDays();
