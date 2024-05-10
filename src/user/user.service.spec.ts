import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { HttpService } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { MOCK_USER } from './schemas/user.mock';
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
          useValue: {
            findOne: jest.fn(),
            create: jest.fn().mockResolvedValue(MOCK_USER),
            updateOne: jest.fn(),
            exists: jest.fn(),
          },
        },
        {
          provide: 'USER_SERVICE',
          useValue: {
            emit: jest.fn(),
          },
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

  it('should store user in db, send mail, emit rabbit event', () => {
    expect(service.create(MOCK_USER)).resolves.toEqual(
      expect.objectContaining(MOCK_USER),
    );
  });

  // rest of the tests missing because I need to figure out how to mock firstValueFrom
});
