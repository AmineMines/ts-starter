import { RoomRepository } from '../application/book-room.command';
import { Room } from '../domain/Room';

export class InMemRoomRepository implements RoomRepository {
  rooms = new Map<number, Room>();

  async getAll(): Promise<Room[]> {
    return [...this.rooms.values()];
  }

  feedWith(rooms: Room[]) {
    this.rooms.clear();
    rooms.forEach((room) => this.rooms.set(room.roomNumber, room));
  }
  async save(room: Room): Promise<void> {
    this.rooms.set(room.roomNumber, room);
  }

  getForRoomNumber(roomNumber: number) {
    return this.rooms.get(roomNumber);
  }
}
