const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');

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

function getPrefix(selected) {
    const prefix = selected === 'daily' ? 'Yesterday' : (selected === 'weekly') ? 'Last Week' : 'Last Month';

    for (let i = 0; i < prefixSpan.length; i++) {
        prefixSpan[i].textContent = prefix;
    }
}

function updateOptionsCSS(selected) {
    if (selected === 'daily') {
        daily.classList.add('selected_option');
        weekly.classList.remove('selected_option');
        monthly.classList.remove('selected_option');
    } else if (selected === 'weekly') {
        daily.classList.remove('selected_option');
        weekly.classList.add('selected_option');
        monthly.classList.remove('selected_option');
    } else {
        daily.classList.remove('selected_option');
        weekly.classList.remove('selected_option');
        monthly.classList.add('selected_option');
    }
}

function updateData(selected) {
    getPrefix(selected);

    updateOptionsCSS(selected);

    for (let i = 0; i < json_data.length; i++) {
        if (json_data[i].title === "Work") {
            workCurrent.textContent = `${json_data[i].timeframes[selected].current}`;
            workPrevious.textContent = `${json_data[i].timeframes[selected].previous}`;
        }
        if (json_data[i].title === "Play") {
            playCurrent.textContent = `${json_data[i].timeframes[selected].current}`;
            playPrevious.textContent = `${json_data[i].timeframes[selected].previous}`;
        }
        if (json_data[i].title === "Study") {
            studyCurrent.textContent = `${json_data[i].timeframes[selected].current}`;
            studyPrevious.textContent = `${json_data[i].timeframes[selected].previous}`;
        }
        if (json_data[i].title === "Exercise") {
            exerciseCurrent.textContent = `${json_data[i].timeframes[selected].current}`;
            exercisePrevious.textContent = `${json_data[i].timeframes[selected].previous}`;
        }
        if (json_data[i].title === "Social") {
            socialCurrent.textContent = `${json_data[i].timeframes[selected].current}`;
            socialPrevious.textContent = `${json_data[i].timeframes[selected].previous}`;
        }
        if (json_data[i].title === "Self Care") {
            selfCareCurrent.textContent = `${json_data[i].timeframes[selected].current}`;
            selfCarePrevious.textContent = `${json_data[i].timeframes[selected].previous}`;
        }
    }
}

daily.addEventListener('click', () => {
    updateData('daily');
});

weekly.addEventListener('click', () => {
    updateData('weekly');
});

monthly.addEventListener('click', () => {
    updateData('monthly');
});