import faker from 'faker';
const randomRange = (min, max) => {
  return min + Math.random() * (max - min);
}

const randomInt = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
}

const randomEntry = (arr) => {
  return arr[randomInt(0, arr.length - 1)];
}

const weightedRand = (weightSpec) => {
  let i, j, table = [];
  for (i in weightSpec) {
    for (j=0; j<weightSpec[i]*10; j++) {
      table.push(i)
    }
  }
  return table[randomInt(0, table.length-1)];
}

const randomEmail = (_name) => {
  let name = _name.replace(/[|&;$%@"'<>()+,-_.]/g, "");
  if (!name) {
    name = faker.name.firstName() + " " + faker.name.lastName();
  }

  const mailProviders = {
    'gmail.com': 17.74,
    'yahoo.com': 17.34,
    'hotmail.com': 15.53,
    'outlook.com': 5,
    'aol.com': 3.2,
    'hotmail.co.uk': 1.27,
    'hotmail.fr': 1.24,
    'msn.com': 1.09,
    'yahoo.fr': 0.98,
    'wanadoo.fr': 0.9,
    'comcast.net': 0.76,
    'yahoo.co.uk': 0.73,
    'yahoo.com.br': 0.6,
    'yahoo.co.in': 0.6,
    'live.com': 0.56,
    'rediffmail.com': 0.51,
    'free.fr': 0.51,
    'gmx.de': 0.44,
    'web.de': 0.43,
    'yandex.ru': 0.42,
    'ymail.com': 0.41,
    'libero.it': 0.41,
    'uol.com.br': 0.34,
    'bol.com.br': 0.33,
    'mail.ru': 0.32,
    'cox.net': 0.25,
    'hotmail.it': 0.25,
    'verizon.net': 0.2
  };
  
  const randomYear = randomInt(1940, 2000);
  const mailGenFunctions = [
    (fn, ln) => (fn + ln),
    (fn, ln) => (fn + "." + ln),
    (fn, ln) => (fn + "_" + ln),
    (fn, ln) => (fn[0] + "." + ln),
    (fn, ln) => (fn[0] + "_" + ln),
    (fn, ln) => (fn + ln + randomYear),
    (fn, ln) => (fn + "." + ln + randomYear),
    (fn, ln) => (fn + "_" + ln + randomYear),
    (fn, ln) => (fn[0] + "." + ln + randomYear),
    (fn, ln) => (fn[0] + "_" + ln + randomYear),
  ];
  
  return mailGenFunctions[randomInt(0, mailGenFunctions.length-1)](name.split(' ')[0], name.split(' ')[1]) + '@' + weightedRand(mailProviders);
}

export default {
  randomRange,
  randomInt,
  randomEntry,
  weightedRand,
  randomEmail
}