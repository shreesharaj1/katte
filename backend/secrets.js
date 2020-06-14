// secrets.js
const secrets = {
  dbUri: 'mongodb://app_user:app1password@ds131743.mlab.com:31743/katte' 
};

export const getSecret = key => secrets[key];