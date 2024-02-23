import { beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('+ Integration tests', () => {

  let baseURL = '';
  beforeAll(() => {
    baseURL = import.meta.env.MODE === 'test' ? import.meta.env.VITE_CELEBRITIES_BASEURL : import.meta.env.VITE_CELEBRITIES_BASEURL;
  });

  it('Celebrities: /list (GET) - 200 Success', () => {
    return request(baseURL)
    .get('/list')
    .set('Content-Type', 'application/json')
    .expect(200)
    .expect(res => {
      expect(res.body).toEqual(expect.any(Array));
    });
  });

  it('Votes: /save (POST) - 400 Empty body', () => {
    return request(baseURL)
    .post('/save')
    .set('Content-Type', 'application/json')
    .expect(400)
    .then(response => {
      expect(response.body).toHaveProperty('status', 400);
      expect(response.body).toHaveProperty('error', 'Bad Request');
      expect(response.body).toHaveProperty('message', 'Empty body');
    });
  });

  it('Votes: /save (POST) - 400 The ID or vote parameter are missing', () => {
    return request(baseURL)
    .post('/save')
    .set('Content-Type', 'application/json')
    .send({ id: 5 })
    .expect(400)
    .then(response => {
      expect(response.body).toHaveProperty('status', 400);
      expect(response.body).toHaveProperty('error', 'Bad Request');
      expect(response.body).toHaveProperty('message', 'The ID or vote parameter are missing');
    });
  });

  it('Votes: /save (POST) - 404 Celebrity not found', () => {
    return request(baseURL)
    .post('/save')
    .set('Content-Type', 'application/json')
    .send({ id: 123456789, vote: 'positive' })
    .expect(404)
    .then(response => {
      expect(response.body).toHaveProperty('status', 404);
      expect(response.body).toHaveProperty('error', 'Not Found');
      expect(response.body).toHaveProperty('message', 'Celebrity not found');
    });
  });

  it('Votes: /save (POST) - The valid vote values are \'positive\' or \'negative\'', () => {
    return request(baseURL)
    .post('/save')
    .set('Content-Type', 'application/json')
    .send({ id: 5, vote: 'thing' })
    .expect(400)
    .then(response => {
      expect(response.body).toHaveProperty('status', 400);
      expect(response.body).toHaveProperty('error', 'Bad Request');
      expect(response.body).toHaveProperty('message', 'The valid vote values are \'positive\' or \'negative\'');
    });
  });

  it('Votes: /save (POST) - 200 Success', () => {
    return request(baseURL)
    .post('/save')
    .set('Content-Type', 'application/json')
    .send({ id: 6, vote: 'positive' })
    .expect(200);
  });
});