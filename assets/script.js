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
  const resetModal = document.getElementById('reset-modal')
  const alarmSound = document.getElementById('alarm-sound')
  const stopAlarmBtn = document.getElementById('stop-alarm-btn')
  const resetAlarmBtn = document.getElementById('reset-alarm-btn')
  const setAlarmBtn = document.getElementById('set-alarm-btn')
  const passwordForm = document.getElementById('password-form')

  setAlarmBtn.classList.add('hidden')
  resetAlarmBtn.classList.remove('hidden')

  const now = new Date()
  const selectedTime = new Date(now.toDateString() + ' ' + alarmTime)

  // Check if the selected time is in the past
  if (selectedTime.getTime() < now.getTime()) {
    // Add one day to the selected time
    selectedTime.setDate(selectedTime.getDate() + 1)
  }

  const timeLeftMs = selectedTime.getTime() - now.getTime()

  const daysLeft = Math.floor(timeLeftMs / (1000 * 60 * 60 * 24))
  const hoursLeft = Math.floor(
    (timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutesLeft = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60))
  const secondsLeft = Math.floor((timeLeftMs % (1000 * 60)) / 1000)

  const timeLeftText = 'Time left for Fajr Salah: '

  const timeLeftString =
    daysLeft.toString().padStart(2, '0') +
    'd:' +
    hoursLeft.toString().padStart(2, '0') +
    'h:' +
    minutesLeft.toString().padStart(2, '0') +
    'm:' +
    secondsLeft.toString().padStart(2, '0') +
    's'
  timeLeftElement.textContent = timeLeftText + timeLeftString

  const countdown = setInterval(() => {
    const now = new Date()
    const timeLeftMs = selectedTime.getTime() - now.getTime()

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
      timeLeftElement.textContent = timeLeftText + timeLeftString
    }
  }, 1000)

  stopAlarmBtn.addEventListener('click', () => {
    passwordForm.classList.remove('hidden')
  })

  document
    .getElementById('submit-password-btn')
    .addEventListener('click', () => {
      const passwordInput = document.getElementById('password').value
      if (passwordInput === '1234') {
        alarmSound.pause()
        alarmSound.currentTime = 0
        alarmModal.classList.add('hidden')
        resetAlarmBtn.classList.remove('hidden')
        passwordForm.classList.add('hidden')
        resetAlarm()
      } else {
        alert('Incorrect Password. Alarm is still ringing!')
      }
    })

  function resetAlarm() {
    clearInterval(countdown)
    setAlarmBtn.classList.remove('hidden')
    resetAlarmBtn.classList.add('hidden')
    document.getElementById('alarm-time').value = ''
    timeLeftElement.textContent = ''
  }

  function resetAuthentication() {
    const resetInput = document.getElementById('reset-password').value
    resetModal.classList.remove('hidden')
    if (resetInput === '12') {
      resetModal.classList.add('hidden')
      resetAlarm()
    } else {
      alert('Wrong Password')
    }
  }

  document
    .getElementById('reset-password-btn')
    .addEventListener('click', resetAuthentication)

  document
    .getElementById('reset-alarm-btn')
    .addEventListener('click', () => resetModal.classList.remove('hidden'))

  document
    .getElementById('reset-modal-close-btn')
    .addEventListener('click', () => resetModal.classList.add('hidden'))
}

// Initialize the alarm clock
function initAlarmClock() {
  getCurrentTime()

  document.getElementById('set-alarm-btn').addEventListener('click', setAlarm)
}

// Run the alarm clock initialization
initAlarmClock()
