import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { HttpService } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UserTestingMock } from './schemas/user.mock';
import { ClientProxy } from '@nestjs/microservices';
import { mock } from 'jest-mock-extended';
import { MailerService } from '@nestjs-modules/mailer';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: getModelToken(User.name),
          useClass: UserTestingMock,
        },
        {
          provide: 'USER_SERVICE',
          useValue: mock<ClientProxy>,
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
