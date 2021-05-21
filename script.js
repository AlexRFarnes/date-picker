import {
  format,
  getUnixTime,
  fromUnixTime,
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns';

const datePickerButton = document.querySelector('.date-picker-button');
const datePicker = document.querySelector('.date-picker');
const datePickerHeaderText = document.querySelector('.current-month');
const prevMonthButton = document.querySelector('.prev-month-button');
const nextMonthButton = document.querySelector('.next-month-button');
const datePickerGridDates = document.querySelector('.date-picker-grid-dates ');
let currentDate;

function setDate(date) {
  datePickerButton.textContent = format(date, 'MMMM do, yyyy');
  datePickerButton.dataset.selectedDate = getUnixTime(date);
}

function setupDatePicker(selectedDate) {
  datePickerHeaderText.textContent = format(currentDate, 'MMMM - yyyy');
  setDaysInCalendar(selectedDate);
}

function setDaysInCalendar(selectedDate) {
  datePickerGridDates.innerHTML = '';
  const firstWeekOfMonth = startOfWeek(startOfMonth(currentDate));
  const lastWeekOfMonth = endOfWeek(endOfMonth(currentDate));
  const dates = eachDayOfInterval({
    start: firstWeekOfMonth,
    end: lastWeekOfMonth,
  });

  dates.forEach(date => {
    const dateEl = document.createElement('button');
    dateEl.innerText = date.getDate();
    dateEl.classList.add('date');
    if (!isSameMonth(date, currentDate)) {
      dateEl.classList.add('date-picker-other-month-date');
    }

    if (isSameDay(date, selectedDate)) {
      dateEl.classList.add('selected');
    }

    dateEl.addEventListener('click', () => {
      setDate(date);
      datePicker.classList.remove('show');
    });

    datePickerGridDates.appendChild(dateEl);
  });
}

// Event Listeners
datePickerButton.addEventListener('click', () => {
  datePicker.classList.toggle('show');
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  currentDate = selectedDate;
  setupDatePicker(selectedDate);
});

prevMonthButton.addEventListener('click', () => {
  currentDate = subMonths(currentDate, 1);
  //   Pass the selectedDate so if the user returns to the selected month the date is shown in blue
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  setupDatePicker(selectedDate);
});

nextMonthButton.addEventListener('click', () => {
  currentDate = addMonths(currentDate, 1);
  //   Pass the selectedDate so if the user returns to the selected month the date is shown in blue
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  setupDatePicker(selectedDate);
});

setDate(new Date());
