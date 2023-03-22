import { InMemRoomRepository } from './in-mem.room.repository';

describe('In Memory Implem of Room Repository', () => {
  const repository = new InMemRoomRepository();
  describe('getAll', () => {
    it('should return an empty array when no room is stored', async () => {
      expect(await repository.getAll()).toEqual([]);
    });

    it('should return all rooms stored', async () => {
      const rooms = [
        { roomNumber: 1, availableDate: '2022-01-01' },
        { roomNumber: 2, availableDate: '2022-01-01' },
      ];
      repository.feedWith(rooms);

      expect(await repository.getAll()).toEqual(rooms);
    });
  });

  describe('save', () => {
    it('should save a new room', async () => {
      const room = { roomNumber: 3, availableDate: '2022-01-01' };
      await repository.save(room);

      expect(await repository.getAll()).toEqual(expect.arrayContaining([room]));
    });

    it('should save an existing room', async () => {
      const room = { roomNumber: 3, availableDate: '2022-01-01' };
      repository.feedWith([room]);

      await repository.save({ ...room, bookedDates: ['2022-01-01'] });

      const expectedRoom = repository.getForRoomNumber(room.roomNumber);
      expect(expectedRoom).toEqual({ ...room, bookedDates: ['2022-01-01'] });
    });
  });
});
