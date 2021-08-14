const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

const { ALPHABET, normalizeProbabilityMatrix } = require("./helpers.js");
const { context } = require("./generator.js");

const CELL_SIZE = 12;
const CELL_SPACING = 2;
const MARGIN = 40;

const getCanvasFrom2DArray = (alphabet, symbol, probabilities) => {
  const imgSize = MARGIN * 2 + CELL_SIZE * alphabet.length + CELL_SPACING * (alphabet.length - 1);

  const canvas = createCanvas(imgSize, imgSize);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, imgSize, imgSize);

  ctx.font = "regular 10pt Arial";
  ctx.fillStyle = "black";
  for (let x = 0; x < alphabet.length; x++) {
    ctx.fillText(alphabet[x], MARGIN + x * CELL_SIZE + (x - 1) * CELL_SPACING + CELL_SIZE * 0.2, MARGIN / 2 + CELL_SIZE * 0.8);
  }
  ctx.textAlign = "right";
  for (let y = 0; y < alphabet.length; y++)
  {
    ctx.fillStyle = "black";
    ctx.fillText(alphabet[y], MARGIN - 10, MARGIN + y * CELL_SIZE + (y - 1) * CELL_SPACING + CELL_SIZE * 0.8);
    for (let x = 0; x < alphabet.length; x++)
    {
      const p = probabilities[alphabet[y]][alphabet[x]];
      ctx.fillStyle = `rgba(255, 0, 0, ${p} * 255)`;
      ctx.fillRect(
        MARGIN + x * CELL_SIZE + (x - 1) * CELL_SPACING,
        MARGIN + y * CELL_SIZE + (y - 1) * CELL_SPACING,
        CELL_SIZE,
        CELL_SIZE,
      );
    }
  }

  ctx.font = "bold 14pt Arial";
  ctx.fillStyle = "black";
  const w = ctx.measureText(symbol).width;
  ctx.fillText(symbol, imgSize - MARGIN - w, imgSize - MARGIN);

  return canvas;
};

const exportProbabilityMatrix = ({ folderPath = "./probability-matrix", onlyLetters = true } = {}) => {
  const matrix = normalizeProbabilityMatrix(context.countTable, context.nItems);
  if (fs.existsSync(folderPath))
    fs.rmdirSync(folderPath, { recursive: true, force: true });
  fs.mkdirSync(folderPath, { recursive: true });

  let alphabet = [...ALPHABET];
  if (onlyLetters) alphabet = alphabet.slice(0, 26);
  for (let i = 0; i < alphabet.length; i++) {
    const canvas = getCanvasFrom2DArray(alphabet, alphabet[i], matrix[alphabet[i]]);  
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(path.join(folderPath, `${i.toString().padStart(2, "0")}-${alphabet[i]}.png`), buffer);
  }
};

module.exports = {
  exportProbabilityMatrix,
};
