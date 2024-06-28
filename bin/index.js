#!/usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const axios = require("axios");
const sharp = require("sharp");
const boxen = require("boxen");

const pathMap = {
  a: "ab", b: "ab", c: "c", s: "s", t: "t",
};

const defaultPaths = ["def", "ghi", "jkl", "mno", "pqr", "uvw", "xyz"];

const asciiArtHeader = `
     **             ******** **             
    ****           **////// /**      **   **
   **//**   ******/**       /**  ** //** ** 
  **  //** //**//*/*********/** **   //***  
 ********** /** / ////////**/****     /**   
/**//////** /**          /**/**/**    **    
/**     /**/***    ******** /**//**  **     
//      // ///    ////////  //  //  //      
`;

const usage = chalk.keyword("violet")(
  `\n\n${boxen(chalk.green("\nGet ASCII art or create new one from terminal\n"), {
    padding: 1,
    borderColor: "green",
    dimBorder: true
  })}\n`
);

const argv = yargs
  .usage(usage)
  .option("g", {
    alias: "get",
    describe: "Input text to get art",
    type: "string",
  })
  .option("c", {
    alias: "create",
    describe: "Input path to create art",
    type: "string",
  })
  .option("s", {
    alias: "search",
    describe: "Input text to search & generate art",
    type: "string",
  })
  .help()
  .argv;

function showHelp() {
  console.log(asciiArtHeader);
  console.log(usage);
  console.log("\nOptions:");
  console.log("  --version     Show version number                 [boolean]");
  console.log("  -g, --get     Get ASCII image from the web        [string]");
  console.log("  -c, --create  Create new from your image path     [string]");
  console.log("  -s, --search  Search & generate ASCII image from google [string]");
  console.log("  --help        Show help                           [boolean]");
}

const getUrlPath = (input) => {
  const firstLetter = input.charAt(0).toLowerCase();
  return pathMap[firstLetter] || defaultPaths.find(path => path.includes(firstLetter)) || "";
};

async function getAscii(input) {
  const path = getUrlPath(input);
  const url = `http://ascii-art.de/ascii/${path}/${input}.txt`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching ASCII art:', error.message);
    console.log("No ASCII art found. Do you want to create your own?");
  }
}

async function generateAsciiArt(imagePath, maxWidth = 90) {
  try {
    const { data, info } = await sharp(imagePath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height } = info;
    const characters = " .`'^\",:;Il!i<>~+_-?][}{1()|/ftjxrnuvcXzYUJCLQ0OZmwpqbdkhao*#MW&8%B@$";
    const numChars = characters.length - 1;

    let asciiArt = "";

    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x++) {
        const pixelIndex = y * width + x;
        const pixelBrightness = data[pixelIndex];
        const charIndex = Math.floor((pixelBrightness / 255) * numChars);
        asciiArt += characters[charIndex];
      }
      asciiArt += "\n";
    }

    console.log(asciiArt);
  } catch (err) {
    console.error("Error generating ASCII art:", err.message);
  }
}

async function searchKeyWord(keyword) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(keyword)}&gl=us&hl=en`;
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  };
  try {
    const response = await axios.get(url, { headers });
    console.log("Search results:", response.data);
  } catch (error) {
    console.error("Error searching:", error.message);
  }
}

async function main() {
  const { g: text, c: imgPath, s: searchKey } = argv;

  if (!text && !imgPath && !searchKey) {
    showHelp();
    return;
  }

  if (text) {
    await getAscii(text);
  } else if (imgPath) {
    await generateAsciiArt(imgPath, 90);
  } else if (searchKey) {
    await searchKeyWord(searchKey);
  }
}

main().catch(console.error);