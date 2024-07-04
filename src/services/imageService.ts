import sharp from 'sharp';
import fs from 'fs/promises';
import { MAX_WIDTH } from '../config/constants';
import logger from '../utils/logger';
import { asciiConversion } from '../utils/helpers';

export async function generateAsciiArt(
  imagePath: string,
  maxWidth: number = MAX_WIDTH
): Promise<string> {
  try {
    const imageBuffer = await fs.readFile(imagePath);
    const { data, info } = await sharp(imageBuffer)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    return asciiConversion({ data, info });
  } catch (err) {
    logger.error('Error generating ASCII art:', err);
    throw new Error('Failed to generate ASCII art');
  }
}
