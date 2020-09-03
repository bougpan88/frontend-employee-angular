import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatPipe(undefined);
    expect(pipe).toBeTruthy();
  });
});
