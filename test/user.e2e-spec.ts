import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.setTimeout(200000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /api/users', () => {
    return request(app.getHttpServer())
      .post('/api/user')
      .send({
        email: 'george.bluth@reqres.in',
        first_name: 'George',
        last_name: 'Bluth',
        avatar: 'https://reqres.in/img/faces/1-image.jpg',
      })
      .expect(201);
  });

  it('GET /api/user/{userId}', () => {
    return request(app.getHttpServer()).get('/api/user/1').expect(200);
  });

  it('GET /api/user/{userId}/avatar', () => {
    return request(app.getHttpServer()).get('/api/user/1/avatar').expect(200);
  });

  it('GET /api/user/{userId}/avatar', () => {
    return request(app.getHttpServer()).get('/api/user/1/avatar').expect(200);
  });

  it('DELETE /api/user/{userId}/avatar', () => {
    return request(app.getHttpServer())
      .delete('/api/user/1/avatar')
      .expect(200);
  });
});
