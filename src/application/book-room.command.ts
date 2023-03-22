import { Room } from '../domain/Room';

export class BookRoomCommand {
  constructor(
    public readonly bookingDate: string,
    public readonly price: number
  ) {}
}

export interface RoomRepository {
  getAll(): Promise<Room[]>;
  save(room: Room): Promise<void>;
}

export class BookRoomCommandHandler {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly
  ) {}
  async execute({ bookingDate }: BookRoomCommand) {
    const availableRoom = await this.findAvailableRoom(bookingDate);
    if (this.dateProvider.now() === '2022-12-25') {
      price *= 1.4;
    }
    if (availableRoom) {
      return this.roomRepository.save({
        ...availableRoom,
        bookedDates: [bookingDate],
      });
    }
    return false;
  }

  private async findAvailableRoom(bookingDate: string) {
    const rooms = await this.roomRepository.getAll();

    const availableRoom = rooms.find(
      (room) => room.availableDate === bookingDate
    );
    return availableRoom;
  }
}
