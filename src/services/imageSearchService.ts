import axios from 'axios';
import cheerio from 'cheerio';
import sharp from 'sharp';
import { MAX_WIDTH } from '../config/constants';
import { asciiConversion } from '../utils/helpers';

export async function searchAscii(input: string): Promise<string> {
  const baseURL = 'https://www.google.com/search?tbm=isch&q=';
  const searchURL = `${baseURL}${encodeURIComponent(input)}`;
  try {
    const response = await axios.get<string>(searchURL);
    const html = response.data;
    const $ = cheerio.load(html);
    const imageUrls: string[] = [];

    $('img').each((index, element) => {
      const url = $(element).attr('src');
      if (url) {
        imageUrls.push(url);
      }
    });

    if (imageUrls.length === 0) {
      throw new Error('No images found');
    }

    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const imageUrl = imageUrls[randomIndex];

    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data);

    const { data, info } = await sharp(imageBuffer)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    return asciiConversion({ data, info });
  } catch (error) {
    throw new Error('Failed to fetch ASCII art');
  }
}
