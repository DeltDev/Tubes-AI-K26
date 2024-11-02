import { Test, TestingModule } from '@nestjs/testing';
import { MagicCubeController } from './magic-cube.controller';

describe('MagicCubeController', () => {
  let controller: MagicCubeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagicCubeController],
    }).compile();

    controller = module.get<MagicCubeController>(MagicCubeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
