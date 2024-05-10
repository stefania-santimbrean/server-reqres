import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MOCK_USER } from './schemas/user.mock';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(MOCK_USER),
            findOne: jest.fn().mockResolvedValue({ id: 1, ...MOCK_USER }),
            findAvatar: jest.fn(),
            removeAvatar: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(controller.create(MOCK_USER)).resolves.toEqual(
      expect.objectContaining(MOCK_USER),
    );
    expect(service.create).toHaveBeenCalled();
    expect(service.create).toHaveBeenCalledWith(MOCK_USER);
  });

  it('should find one user', () => {
    controller.findOne('1');
    expect(service.findOne).toHaveBeenCalled();
  });

  it("should find or retrieve one user's avatar", () => {
    controller.findAvatar('1');
    expect(service.findAvatar).toHaveBeenCalled();
  });

  it("should remove one user's avatar", () => {
    controller.remove('1');
    expect(service.removeAvatar).toHaveBeenCalled();
  });
});
