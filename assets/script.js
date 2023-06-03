// Get current time and update every second
function getCurrentTime() {
  const currentTimeElement = document.getElementById('current-time')
  setInterval(() => {
    const now = new Date()
    const timeString = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    currentTimeElement.textContent = timeString
  }, 1000)
}

// Set alarm and start countdown
function setAlarm() {
  const alarmTime = document.getElementById('alarm-time').value
  const timeLeftElement = document.getElementById('time-left')
  const alarmModal = document.getElementById('alarm-modal')
  const alarmSound = document.getElementById('alarm-sound')
  const stopAlarmBtn = document.getElementById('stop-alarm-btn')
  const resetAlarmBtn = document.getElementById('reset-alarm-btn')
  const passwordForm = document.getElementById('password-form')

  const [alarmTimeHours, alarmTimeMinutes] = alarmTime.split(':')
  const alarmTimeMs = new Date().setHours(
    alarmTimeHours,
    alarmTimeMinutes,
    0,
    0,
  )
  const currentTimeMs = new Date().getTime()
  const timeLeftMs = alarmTimeMs - currentTimeMs

  if (timeLeftMs > 0) {
    const daysLeft = Math.floor(timeLeftMs / (1000 * 60 * 60 * 24))
    const hoursLeft = Math.floor(
      (timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutesLeft = Math.floor(
      (timeLeftMs % (1000 * 60 * 60)) / (1000 * 60),
    )
    const secondsLeft = Math.floor((timeLeftMs % (1000 * 60)) / 1000)

    const timeLeftString =
      daysLeft.toString().padStart(2, '0') +
      'd:' +
      hoursLeft.toString().padStart(2, '0') +
      'h:' +
      minutesLeft.toString().padStart(2, '0') +
      'm:' +
      secondsLeft.toString().padStart(2, '0') +
      's'
    timeLeftElement.textContent = 'Time left: ' + timeLeftString

    const countdown = setInterval(() => {
      const currentTimeMs = new Date().getTime()
      const timeLeftMs = alarmTimeMs - currentTimeMs

      if (timeLeftMs <= 0) {
        clearInterval(countdown)
        timeLeftElement.textContent = ''
        alarmModal.classList.remove('hidden')
        alarmSound.play()
      } else {
        const daysLeft = Math.floor(timeLeftMs / (1000 * 60 * 60 * 24))
        const hoursLeft = Math.floor(
          (timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        )
        const minutesLeft = Math.floor(
          (timeLeftMs % (1000 * 60 * 60)) / (1000 * 60),
        )
        const secondsLeft = Math.floor((timeLeftMs % (1000 * 60)) / 1000)

        const timeLeftString =
          daysLeft.toString().padStart(2, '0') +
          'd:' +
          hoursLeft.toString().padStart(2, '0') +
          'h:' +
          minutesLeft.toString().padStart(2, '0') +
          'm:' +
          secondsLeft.toString().padStart(2, '0') +
          's'
        timeLeftElement.textContent = 'Time left: ' + timeLeftString
      }
    }, 1000)

    stopAlarmBtn.addEventListener('click', () => {
      alarmSound.pause()
      alarmSound.currentTime = 0
      passwordForm.classList.remove('hidden')
    })

    document
      .getElementById('submit-password-btn')
      .addEventListener('click', () => {
        const passwordInput = document.getElementById('password').value
        if (passwordInput === '1234') {
          alarmModal.classList.add('hidden')
          resetAlarmBtn.classList.remove('hidden')
          passwordForm.classList.add('hidden')
        } else {
          alert('Incorrect password. Alarm is still ringing!')
        }
      })

    document.getElementById('reset-alarm-btn').addEventListener('click', () => {
      resetAlarmBtn.classList.add('hidden')
      document.getElementById('alarm-time').value = ''
      timeLeftElement.textContent = ''
    })
  } else {
    alert('Please select a future time for the alarm!')
  }
}

// Initialize the alarm clock
function initAlarmClock() {
  getCurrentTime()

  document.getElementById('set-alarm-btn').addEventListener('click', setAlarm)
}

// Run the alarm clock initialization
initAlarmClock()
