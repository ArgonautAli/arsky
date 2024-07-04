import { PATH_MAP, DEFAULT_PATHS, ASCII_CHARACTERS } from '../config/constants';
import sharp from 'sharp';

export function getUrlPath(input: string): string {
  const firstLetter = input.charAt(0).toLowerCase();
  return PATH_MAP[firstLetter] || DEFAULT_PATHS.find(path => path.includes(firstLetter)) || '';
}

export function asciiConversion({ data, info }: { data: Buffer; info: sharp.OutputInfo }) {
  const { width, height } = info;
  const numChars = ASCII_CHARACTERS.length - 1;
  let asciiArt = '';

  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = y * width + x;
      const pixelBrightness = data[pixelIndex];
      const charIndex = Math.floor((pixelBrightness / 255) * numChars);
      asciiArt += ASCII_CHARACTERS[charIndex];
    }
    asciiArt += '\n';
  }

  return asciiArt;
}
