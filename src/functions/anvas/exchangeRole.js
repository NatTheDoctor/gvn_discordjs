const { setBuff } = require("../../queries/userQuery");

const exchangeBaKien = async (hadBaKien, notHaveBaKien) => {
  if (hadBaKien.isBaKien) {
    await setBuff(hadBaKien.userId, false);
    await setBuff(notHaveBaKien.userId, true);
  }
};
module.exports = { exchangeBaKien };
