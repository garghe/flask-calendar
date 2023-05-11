const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const renderCalendar = (namesByDay) => {
  const calendarBody = document.getElementById("calendar-body");

  console.log("Rendering Calendar for month: " + currentMonth)

  calendarBody.innerHTML = "";

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDates.push(i);
  }

  const prevMonthDays = [];
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    prevMonthDays.push(lastDayOfPrevMonth - i);
  }

  const nextMonthDays = [];
  const totalDaysDisplayed = calendarDates.length + prevMonthDays.length;
  for (let i = 1; i <= 42 - totalDaysDisplayed; i++) {
    nextMonthDays.push(i);
  }

  let calendarHtml = "";
  let currentWeek = 0;
  for (let i = 0; i < 42; i++) {
    if (i % 7 === 0) {
      calendarHtml += "<tr>";
      currentWeek++;
    }
    if (i < prevMonthDays.length) {
      calendarHtml += `<td class="prev-month">${prevMonthDays[i]}</td>`;
    } else if (i < prevMonthDays.length + calendarDates.length) {
      const day = calendarDates[i - prevMonthDays.length];
      const names = namesByDay[day] || [];
      if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
        calendarHtml += `<td class="today">${day}`;
      } else {
        calendarHtml += `<td>${day}`;
      }
      if (names.length > 0) {
        calendarHtml += `<ul>`;
        //for (let name of names) {
          calendarHtml += `<li>${names}</li>`;
        //}
        calendarHtml += `</ul>`;
      }
      calendarHtml += `</td>`;
    } else {
      calendarHtml += `<td class="next-month">${nextMonthDays[i - prevMonthDays.length - calendarDates.length]}</td>`;
    }
    if (i % 7 === 6) {
      calendarHtml += "</tr>";
    }
  }

  calendarBody.innerHTML = calendarHtml;

  const monthYear = document.getElementById("month-year");
  monthYear.innerHTML = `${monthNames[currentMonth]} ${currentYear}`;
};



const prevMonth = () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  fetchHolidays(currentMonth, currentYear)
};

const nextMonth = () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  fetchHolidays(currentMonth, currentYear)
};

const goToday = () => {
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  fetchHolidays(currentMonth,currentYear)
};

const fetchHolidays = (month, year) => {
  console.log("fetchHolidays: " + month)
  holiday_month = month+1
  fetch('http://127.0.0.1:8080/get_holidays?month=' + holiday_month + '&year=' + year)
  .then(response => response.json())
  .then(data => renderCalendar(data))
  .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", () => {



  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  fetchHolidays(currentMonth,currentYear)


  const prevMonthButton = document.getElementById("prev-month");
  const nextMonthButton = document.getElementById("next-month");
  const goToTodayButton = document.getElementById("go-to-today");
  
  prevMonthButton.addEventListener("click", prevMonth);
  nextMonthButton.addEventListener("click", nextMonth);
  goToTodayButton.addEventListener("click", goToday);

});
