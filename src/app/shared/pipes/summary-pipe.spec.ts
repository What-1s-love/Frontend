import { SummaryPipe } from './summary-pipe';

describe('SummaryPipe', () => {
  // Створюємо екземпляр класу пайпа
  const pipe = new SummaryPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if value is empty', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should not cut text if it fits limits', () => {
    const text = 'Hello';
    expect(pipe.transform(text, 10)).toBe('Hello');
  });

  it('should cut text and add ... if too long', () => {
    const text = 'Hello World';
    // Ліміт 5 символів -> 'Hello' + '...'
    expect(pipe.transform(text, 5)).toBe('Hello...');
  });
});