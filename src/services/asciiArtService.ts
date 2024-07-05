import axios from 'axios';
import { ASCII_ART_URL } from '../config/constants';
import { getUrlPath } from '../utils/helpers';
// import logger from '../utils/logger';

export async function getAscii(input: string): Promise<string> {
  const path = getUrlPath(input);
  const url = `${ASCII_ART_URL}/${path}/${input}.txt`;
  try {
    const response = await axios.get<string>(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch ASCII art');
  }
}
