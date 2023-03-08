import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('button[data-start]')
const datetime_picker = document.querySelector("#datetime-picker");
const timerEl = document.querySelector(".timer")

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date;
        if (selectedDates[0] < currentDate) {
            window.alert("Please choose a date in the future")
            btnStart.setAttribute('disabled', true)
        } else {
            btnStart.removeAttribute('disabled')
        }
        console.log(selectedDates[0]);
    },
};

flatpickr("#datetime-picker", options)

const timer = {
    intervalId: null,

    start(rootSelector) {
        this.intervalId = setInterval(() => {
            const futureDate = new Date(datetime_picker.value);
            const currentDate = new Date;
            const diff_miliseconds = futureDate.getTime() - currentDate.getTime();
            if (diff_miliseconds < 0) {
                this.stop()
                return
            }
            const timer = convertMs(diff_miliseconds);

            rootSelector.querySelector('[data-days]').textContent = addLeadingZero(timer.days);
            rootSelector.querySelector('[data-hours]').textContent = addLeadingZero(timer.hours);
            rootSelector.querySelector('[data-minutes]').textContent = addLeadingZero(timer.minutes);
            rootSelector.querySelector('[data-seconds]').textContent = addLeadingZero(timer.seconds);
        }, 1000)
    },
    stop() {
        clearInterval(this.intervalId)
    }

}
btnStart.addEventListener('click', () => {
    timer.start(timerEl)

})
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}


console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}