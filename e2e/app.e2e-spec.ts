import { CheatAtTypeshiftPage } from './app.po';

describe('cheat-at-typeshift App', () => {
  let page: CheatAtTypeshiftPage;

  beforeEach(() => {
    page = new CheatAtTypeshiftPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
