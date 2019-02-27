import { request } from '../request';

describe('request', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({ data: 'mock data' })
      })
    );
  });

  it('calls fetch with correct params', async () => {
    const url = 'www.mock.com';
    const options = {};

    await request(url, options);

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenLastCalledWith(url, {});
  });

  it('throws an error if response.ok is false', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        ok: false,
        json: () => Promise.resolve({ data: 'mock data' })
      })
    );

    const expected = Error(`Network request failed. (error: 500)`);
    await expect(request()).rejects.toEqual(expected);
  });

  it('throws an error if fetch fails', async () => {
    window.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(Error('mock error')));
    const expected = Error('Network request failed. (error: mock error)');

    await expect(request()).rejects.toEqual(expected);
  });
});
