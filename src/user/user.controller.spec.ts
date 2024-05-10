import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const createUserDto = {
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(createUserDto),
            findOne: jest.fn().mockResolvedValue({ id: 1, ...createUserDto }),
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
    expect(controller.create(createUserDto)).resolves.toEqual(
      expect.objectContaining(createUserDto),
    );
    expect(service.create).toHaveBeenCalled();
    expect(service.create).toHaveBeenCalledWith(createUserDto);
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
