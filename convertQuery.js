const fs = require("fs");

async function saveToken(accountIndex, token) {
  let tokens = {};
  if (fs.existsSync("queryIds.json")) {
    tokens = JSON.parse(fs.readFileSync("queryIds.json", "utf-8"));
  }
  tokens[`Account_${accountIndex + 1}`] = token;
  fs.writeFileSync("queryIds.json", JSON.stringify(tokens, null, 2));
}

(async function convertQueryIds() {
  const accounts = fs.readFileSync("query.txt", "utf-8").replace(/\r/g, "").split("\n").filter(Boolean);
  for (let i = 0; i < accounts.length; i++) {
    await saveToken(i, accounts[i]);
  }
})();
