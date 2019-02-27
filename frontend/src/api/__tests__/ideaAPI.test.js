import * as request from '../request';
import * as api from '../';

describe('postIdea', () => {
  it('calls request with correct params', async () => {
    const ideaMock = 'mock idea';
    const url = '/api/v1/ideas';
    const options = {
      method: 'POST',
      body: JSON.stringify({
        idea: ideaMock
      }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    };
    const requestResponse = [{ id: 1, idea: ideaMock }];
    const requestMock = jest.spyOn(request, 'request');

    requestMock.mockReturnValue(Promise.resolve(requestResponse));

    const postIdeaReturn = await api.postIdea(ideaMock);

    expect(postIdeaReturn).toEqual(requestResponse);
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith(url, options);
    requestMock.mockRestore();
  });
});

describe('updateidea', () => {
  it('calls request with correct params', async () => {
    const ideaMock = 'updated mock idea';
    const url = '/api/v1/ideas/' + 1;
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        idea: ideaMock
      }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    };
    const requestResponse = [{ id: 1, idea: 'updated mock idea' }];
    const requestMock = jest.spyOn(request, 'request');

    requestMock.mockReturnValue(Promise.resolve(requestResponse));

    const result = await api.updateIdea(1, 'updated mock idea');

    expect(result).toEqual(requestResponse);
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith(url, options);
    requestMock.mockRestore();
  });
});

describe('deleteidea', () => {
  it('calls request with correct params', async () => {
    const url = '/api/v1/ideas/' + 1;
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    };
    const simulatedResponse = [{ id: 1 }];
    const mock = jest.spyOn(request, 'request');

    mock.mockReturnValue(Promise.resolve(simulatedResponse));

    const result = await api.deleteIdea(1);

    expect(result).toEqual(simulatedResponse);
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(url, options);
    mock.mockRestore();
  });
});
