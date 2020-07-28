import { getFromMatchStore, genKey } from './matchStore';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { scrapePage } from './scraping';
import dotenv from 'dotenv';

dotenv.config();

const main = async (): Promise<void> => {
  const maybeNewPost = await scrapePage();

  if (maybeNewPost) {
    const matchKey = genKey(maybeNewPost.minSince, Date.now());
    const alreadySeen = getFromMatchStore(matchKey);
    if (!alreadySeen) {
      //generate notification and then save in match store
    }
  }
};

main();
