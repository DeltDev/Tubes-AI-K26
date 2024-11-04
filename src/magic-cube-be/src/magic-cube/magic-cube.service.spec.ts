import { Test, TestingModule } from '@nestjs/testing';
import { MagicCubeService } from './magic-cube.service';

describe('MagicCubeService', () => {
  let service: MagicCubeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MagicCubeService],
    }).compile();

    service = module.get<MagicCubeService>(MagicCubeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
