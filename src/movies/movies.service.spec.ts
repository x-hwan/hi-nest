import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 4', () => {
    expect(2 + 3).toEqual(5);
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      // const beforeTitle = service.getOne(1).title;
      service.update(1, { title: 'Update Movie' });
      const movie = service.getOne(1).title;
      expect(movie).toEqual('Update Movie');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('search', () => {
    it('should search a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2010,
      });

      const searchMovie = service.search(2000);
      const beforeMovie = service.getOne(1);

      expect(searchMovie[0].title).toEqual(beforeMovie.title);
    });
  });
});
