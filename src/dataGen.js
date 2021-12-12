const cities = {
  'Lancaster': 'Pennsylvania',
  'Omaha': 'Nebraska',
  'Battle Creek': 'Michigan',
  'Memphis': 'Tennessee'
};

const urlsByCity = {
  'Lancaster': [
    'https://jobs.kellogg.com/job/Lancaster-Permanent-Production-Associate-Lancaster-PA-17601/817684800/#',
  ],
  'Omaha': [
    'https://jobs.kellogg.com/job/Omaha-Permanent-Production-Associate-Omaha-NE-68103/817685900/z'
  ],
  'Battle Creek': [
    'https://jobs.kellogg.com/job/Battle-Creek-Permanent-Production-Associate-Battle-Creek-MI-49014/817685300/'
  ],
  'Memphis': [
    'https://jobs.kellogg.com/job/Memphis-Permanent-Production-Associate-Memphis-TN-38114/817685700/'
  ]
};

const signupData = {
  'email': '//*[@id="fbclc_userName"]',
  'email-retype': '//*[@id="fbclc_emailConf"]',
  'pass': '//*[@id="fbclc_pwd"]',
  'pass-retype': '//*[@id="fbclc_pwdConf"]',
  'first_name': '//*[@id="fbclc_fName"]',
  'last_name': '//*[@id="fbclc_lName"]',
  'pn': '//*[@id="fbclc_phoneNumber"]'
};

const applyData = {
  'resume': '//*[@id="49:_file"]',
  'addy': '//*[@id="69:_txtFld"]',
  'city': '//*[@id="73:_txtFld"]',
  'zip': '//*[@id="81:_txtFld"]',
  'job': '//*[@id="101:_txtFld"]',
  'salary': '//*[@id="172:_txtFld"]',
  'country': '//*[@id="195:_select"]'
};

const zip_codes = {
  'Lancaster': ['17573', '17601', '17602', '17605', '17606', '17699'],
  'Omaha': ['68104', '68105', '68106', '68124', '68127', '68134'],
  'Battle Creek': ['49014', '49015', '49016', '49017', '49018', '49037'],
  'Memphis': ['38116', '38118', '38122', '38127', '38134', '38103'],
};


export default {
  urlsByCity,
  signupData,
  applyData,
  cities,
  zip_codes
}