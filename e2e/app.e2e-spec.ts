import { TvimsAngularPage } from './app.po';

describe('tvims-angular App', () => {
  let page: TvimsAngularPage;

  beforeEach(() => {
    page = new TvimsAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
