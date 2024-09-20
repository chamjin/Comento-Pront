function updateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const currentDate = `${year}-${month}-${date}`;
    const currentTime = `${hours}:${minutes}:${seconds}`;

    document.querySelector('.time .content-box').textContent = `${currentDate} ${currentTime}`;
}

setInterval(updateTime, 1000);

let batteryLevel = 100;

function updateBattery() {
    if (batteryLevel > 0) {
        batteryLevel -= 1;
    }

    document.querySelector('.battery .content-box').textContent = `${batteryLevel}%`;

    const alarmList = document.getElementById('alarmList');
    if (batteryLevel === 0) {
        alarmList.style.backgroundColor = '#000';
    }
}

setInterval(updateBattery, 1000);

function chargeBattery() {
    batteryLevel = 100;
    document.querySelector('.battery .content-box').textContent = `${batteryLevel}%`;
    const alarmList = document.getElementById('alarmList');
    alarmList.style.backgroundColor = '';
}

function addAlarm() {
    const alarmList = document.getElementById('alarmList');
    const alarmItems = alarmList.getElementsByClassName('alarm');

    if (alarmItems.length >= 3) {
        alert('알람은 최대 3개까지 추가할 수 있습니다.');
        return;
    }

    const hours = document.querySelector('.alarm-add input[placeholder="00"]').value || '00';
    const minutes = document.querySelector('.alarm-add input[placeholder="00"]:nth-of-type(2)').value || '00';
    const seconds = document.querySelector('.alarm-add input[placeholder="00"]:nth-of-type(3)').value || '00';
    const alarmTime = `${hours}시 ${minutes}분 ${seconds}초`;

    const alarmItem = document.createElement('p');
    alarmItem.className = 'alarm';
    alarmItem.textContent = alarmTime;
    alarmList.appendChild(alarmItem);

    document.querySelector('.alarm-add input[placeholder="00"]').value = '';
    document.querySelector('.alarm-add input[placeholder="00"]:nth-of-type(2)').value = '';
    document.querySelector('.alarm-add input[placeholder="00"]:nth-of-type(3)').value = '';
}
