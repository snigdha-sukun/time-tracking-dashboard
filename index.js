const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');
const optionsContainer = document.getElementById('options-container');

const workCurrent = document.getElementById('work-current');
const playCurrent = document.getElementById('play-current');
const studyCurrent = document.getElementById('study-current');
const exerciseCurrent = document.getElementById('exercise-current');
const socialCurrent = document.getElementById('social-current');
const selfCareCurrent = document.getElementById('self-care-current');

const workPrevious = document.getElementById('work-previous');
const playPrevious = document.getElementById('play-previous');
const studyPrevious = document.getElementById('study-previous');
const exercisePrevious = document.getElementById('exercise-previous');
const socialPrevious = document.getElementById('social-previous');
const selfCarePrevious = document.getElementById('self-care-previous');
const prefixSpan = document.querySelectorAll('.prefix');

let json_data = [];

fetch('./data.json').then((response) => {
    if (!response.ok) return console.log('Oops! Something went wrong.');
    return response.json();
}).then((data) => {
    json_data = data;
    updateData('daily');
});

function updatePrefix(selected) {
    const prefix = selected === 'daily' ? 'Yesterday' : (selected === 'weekly') ? 'Last Week' : 'Last Month';

    for (let i = 0; i < prefixSpan.length; i++) {
        prefixSpan[i].textContent = prefix;
    }
}

function updateOptionsCSS(selected) {
    const lastSelectedOption = document.querySelector(".selected_option")
    const selectedClass = "selected_option"
    lastSelectedOption.classList.remove(selectedClass);

    if (selected === 'daily') {
        daily.classList.add(selectedClass);
    } else if (selected === 'weekly') {
        weekly.classList.add(selectedClass);
    } else {
        monthly.classList.add(selectedClass);
    }
}

function updateData(selected) {
    updatePrefix(selected);

    updateOptionsCSS(selected);

    for (let i = 0; i < json_data.length; i++) {
        const item = json_data[i]
        const title = item.title
        const timeframe = item.timeframes[selected]
        if (title === "Work") {
            workCurrent.textContent = `${timeframe.current}`;
            workPrevious.textContent = `${timeframe.previous}`;
        }
        if (title === "Play") {
            playCurrent.textContent = `${timeframe.current}`;
            playPrevious.textContent = `${timeframe.previous}`;
        }
        if (title === "Study") {
            studyCurrent.textContent = `${timeframe.current}`;
            studyPrevious.textContent = `${timeframe.previous}`;
        }
        if (title === "Exercise") {
            exerciseCurrent.textContent = `${timeframe.current}`;
            exercisePrevious.textContent = `${json_data[i].timeframes[selected].previous}`;
        }
        if (title === "Social") {
            socialCurrent.textContent = `${timeframe.current}`;
            socialPrevious.textContent = `${timeframe.previous}`;
        }
        if (title === "Self Care") {
            selfCareCurrent.textContent = `${timeframe.current}`;
            selfCarePrevious.textContent = `${timeframe.previous}`;
        }
    }
}

optionsContainer.addEventListener("click", (event) => {
    if (!event.target.getAttribute("data-time")) return;
    updateData(event.target.getAttribute("data-time"));
});
