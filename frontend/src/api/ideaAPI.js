import { request } from './request';

export const postIdea = async idea => {
  const url = '/api/v1/ideas';
  const options = {
    method: 'POST',
    body: JSON.stringify({ idea }),
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  };

  return await request(url, options);
};

export const updateIdea = async (ideaID, idea) => {
  const url = '/api/v1/ideas/' + ideaID;
  const options = {
    method: 'PUT',
    body: JSON.stringify({ idea }),
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  };
  return await request(url, options);
};

export const deleteIdea = async ideaID => {
  const url = '/api/v1/ideas/' + ideaID;
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  };
  return await request(url, options);
};
