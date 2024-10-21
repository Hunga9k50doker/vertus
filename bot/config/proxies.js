const path = require("path");
const fs = require("fs");

function covertProxy(proxies) {
  if (proxies.length > 0) {
    return proxies.map((proxy) => {
      const item = proxy.replace("@", ":").replace("//", "").trim().split(":");
      return {
        protocol: item[0],
        username: item[1],
        password: item[2],
        ip: item[3],
        port: item[4],
      };
    });
  } else return [];
}

function loadProxies() {
  const proxyFile = path.join(__dirname, "proxies.txt");
  return fs.readFileSync(proxyFile, "utf8").replace(/\r/g, "").split("\n").filter(Boolean);
}

const proxies = (() => {
  try {
    const items = loadProxies();
    const listProxies = covertProxy(items);
    return listProxies;
  } catch (error) {
    console.error(`Lỗi convert proxy: ${error.message}`);
    return null;
  }
})();

module.exports = proxies;
