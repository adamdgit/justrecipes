import '@testing-library/jest-dom'
import { isValidURL } from '@/utils/isValidURL';

describe('IsValidURL', () => {
  it("Should return true for valid video url", () => {
    const isValid = isValidURL("https://www.youtube.com/watch?v=AS79oJ3Fcf0&t=20s");
    expect(isValid).toBeTruthy();
  })

  it("Should return true for valid shorts url", () => {
    const isValid = isValidURL("https://youtube.com/shorts/NOjLrN_QktM?si=60kQexaavh8M9vwL");
    expect(isValid).toBeTruthy();
  })

  it("Should return false for incorrect url", () => {
    const isValid = isValidURL("https://www.wikipedia.com");
    expect(isValid).toBeFalsy();
  })

  it("Should return false for special characters", () => {
    const isValid = isValidURL("https://www.youtúbe.com/watch?v=AS79oJ3Fcf0&t=20s");
    expect(isValid).toBeFalsy();
  })

  it("Should return false for not being https", () => {
    const isValid = isValidURL("http://youtube.com/shorts/NOjLrN_QktM?si=60kQexaavh8M9vwL");
    expect(isValid).toBeFalsy();
  })
});
