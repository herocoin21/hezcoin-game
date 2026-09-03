let coins = 0.000000;
let energy = 5;
const maxEnergy = 5;
const rechargeTime = 300;
let timer = rechargeTime;

const translations = {
  ku: { energy: "ئێنێرجی", coins: "کوین", adBtn: "تەماشای ڕێکلامێ بکە (+1 ئێنێرجی)", noEnergy: "ئێنێرجی نەما! بڕوێنە ٥ خولەکان." },
  ar: { energy: "الطاقة", coins: "عملة", adBtn: "شاهد إعلان (+1 طاقة)", noEnergy: "لا توجد طاقة! انتظر 5 دقائق." },
  en: { energy: "Energy", coins: "Coins", adBtn: "Watch Ad (+1 Energy)", noEnergy: "No Energy! Wait 5 minutes." }
};

let currentLang = 'ku';

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById('energy-label').innerText = translations[lang].energy;
  document.getElementById('coins-label').innerText = translations[lang].coins;
  document.getElementById('ad-btn').innerText = translations[lang].adBtn;
  document.body.dir = (lang === 'en') ? 'ltr' : 'rtl';
}

document.getElementById('groover-btn').addEventListener('click', () => {
  if (energy > 0) {
    energy -= 1;
    coins += 0.000001;
    updateUI();
  } else {
    alert(translations[currentLang].noEnergy);
  }
});

setInterval(() => {
  if (energy < maxEnergy) {
    timer--;
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    document.getElementById('timer-text').innerText = `ئێنێرجیا دی ل: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (timer <= 0) {
      energy += 1;
      timer = rechargeTime;
    }
    updateUI();
  } else {
    document.getElementById('timer-text').innerText = "ئێنێرجی या پڕە";
  }
}, 1000);

function watchAd() {
  if (energy < maxEnergy) {
    energy += 1;
    updateUI();
    alert("+1 ئێنێرجی هاتە زێدەکرن!");
  } else {
    alert("ئێنێرجیا تە یا پڕە!");
  }
}

function updateUI() {
  document.getElementById('coins').innerText = coins.toFixed(6);
  document.getElementById('energy').innerText = energy;
  document.getElementById('energy-fill').style.width = (energy / maxEnergy * 100) + '%';
}
