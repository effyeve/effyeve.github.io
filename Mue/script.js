const wrapper = document.querySelector(".wrapper")
const question = document.querySelector(".question")
const gif = document.querySelector(".gif")
const yesBtn = document.querySelector(".yes-btn")
const noBtn = document.querySelector(".no-btn")

yesBtn.addEventListener("click", () => {
    question.innerHTML = "ขอบคุณคั้บ ♡"
    gif.src = "https://media.tenor.com/-pz0HTTJ7R0AAAAi/elated-yay.gif"

    var message = "He hit the button"
    var token = ["Eoe7p4Kwwsm1ba73619dISjFUcxe2aRA1VpnDkBl505"]
    var options = {
        "method": "post",
        "payload": "message=" + message,
        "headers": {
          "Authorization": "Bearer " + token
        }
    };
    UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
    console.log(msg)
})

noBtn.addEventListener("mouseover", () => {
    const noBtnRect = noBtn.getBoundingClientRect()
    const maxX = window.innerWidth - noBtnRect.width
    const maxY = window.innerHeight - noBtnRect.height
    
    const randomX = Math.floor(Math.random() * maxX)
    const randomY = Math.floor(Math.random() * maxY)

    noBtn.style.left = randomX + "px"
    noBtn.style.top = randomY + "px"
})
