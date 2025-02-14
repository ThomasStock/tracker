const fs = require("fs");
const path = require("path");

const VERSION_FILE_PATH = path.join(__dirname, "src", "version.txt");

function getCurrentVersion() {
  try {
    if (fs.existsSync(VERSION_FILE_PATH)) {
      return fs.readFileSync(VERSION_FILE_PATH, "utf8").trim();
    }
    return "0.0000.0000";
  } catch (error) {
    console.error("Error reading version file:", error);
    return "0.0000.0000";
  }
}

function generateNewVersion() {
  const currentVersion = getCurrentVersion();
  const [buildCount] = currentVersion.split(".");
  const newBuildCount = parseInt(buildCount || "0", 10) + 1;

  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const datetime = `${month}${day}.${hours}${minutes}`;

  return `${newBuildCount}.${datetime}`;
}

function updateVersion() {
  const newVersion = generateNewVersion();
  try {
    fs.writeFileSync(VERSION_FILE_PATH, newVersion);
    console.log(`Version updated to: ${newVersion}`);
  } catch (error) {
    console.error("Error writing version file:", error);
    process.exit(1);
  }
}

updateVersion();
