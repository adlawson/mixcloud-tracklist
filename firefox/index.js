var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "*.mixcloud.com",
  contentScriptFile: "./ext-mixcloud.js"
});
