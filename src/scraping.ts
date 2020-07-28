// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import puppeteer from 'puppeteer';

const logInFacebook = async (
  browser: puppeteer.Browser,
): Promise<puppeteer.Page> => {
  // Dom element selectors for login page
  const USERNAME_SELECTOR = '#email';
  const PASSWORD_SELECTOR = '#pass';
  const BUTTON_SELECTOR = '[value="Log In"]';

  const user = process.env.FBOOK_USERNAME;
  const pass = process.env.FBOOK_PASS;
  const page = await browser.newPage();

  if (user && pass) {
    await page.goto('https://www.facebook.com');
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(user);
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(pass);
    await page.click(BUTTON_SELECTOR);

    await page.waitForNavigation();
  }
  return page;
};

export interface NewPost {
  minSince: string;
}

export const findNewPost = (body: string): NewPost | null => {
  const minRegex = /((\d{1,2}\m))\b/;

  const postInLastHour = body.match(minRegex);
  const newestPost = postInLastHour?.[0];
  return newestPost
    ? {
        minSince: newestPost,
      }
    : null;
};

const hasNewPost = async (
  page: puppeteer.Page,
  url: string,
): Promise<NewPost | null> => {
  // const hoursRegex = /(\d{2}\ hrs)/;
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });

  const elements = await page.$$eval('[role=main]', divs =>
    divs.map(d => d.innerHTML),
  );

  const body = elements[0];

  return findNewPost(body);
};

export const scrapePage = async (): Promise<NewPost | null> => {
  const url =
    'https://www.facebook.com/search/posts/?q=bernedoodles%20and%20groodles%20australia';

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--disable-notifications'],
    defaultViewport: { width: 1500, height: 1000 },
  });

  const loggedInPage = await logInFacebook(browser);
  return await hasNewPost(loggedInPage, url);
};
