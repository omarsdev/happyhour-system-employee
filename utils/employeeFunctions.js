function checkEmailName(str) {
    emailRegex = new RegExp(
      "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@grayscale-ag.com$"
    );
    return emailRegex.test(str);
  }

  function checkPassword(str) {
    strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return strongRegex.test(str);
  }

  module.exports = { checkEmailName, checkPassword }