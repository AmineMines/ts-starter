import { Room } from '../domain/Room';
import { InMemRoomRepository } from '../infrastructure/in-mem.room.repository';
import { BookRoomCommandHandler } from './book-room.command';

describe('Book a room comamnd handler', () => {
  let roomRepository: InMemRoomRepository;
  let commandHandler: BookRoomCommandHandler;

  beforeEach(() => {
    roomRepository = new InMemRoomRepository();
    commandHandler = new BookRoomCommandHandler(roomRepository);
  });

  it('should not book a room when there is no room', async () => {
    const isBooked = await commandHandler.execute({
      bookingDate: '2020-01-01',
    });

    expect(isBooked).toBe(false);
  });

  fit('should book an available room', async () => {
    const bookingDate = '2022-03-10';
    const availableRoom: Room = { roomNumber: 1, availableDate: bookingDate };
    const unavailableRoom: Room = {
      roomNumber: 2,
      availableDate: '2022-01-01',
    };
    roomRepository.feedWith([unavailableRoom, availableRoom]);

    await commandHandler.execute({ bookingDate, price: 10 });

    const roomBooked = roomRepository.getForRoomNumber(1);
    expect(roomBooked?.bookings).toEqual([bookingDate]);
  });

  it('should not book twice a room', async () => {
    const availableRoom: Room = { roomNumber: 1, availableDate: '2022-03-10' };
    roomRepository.feedWith([availableRoom]);
    const bookingDate = '2022-03-10';

    await commandHandler.execute({ bookingDate });
    const isBooked = await commandHandler.execute({ bookingDate });

    expect(isBooked).toEqual(false);
  });

  it('should incrase price of the booking if we are in christmas day', async () => {
    const christmasDay = '2022-12-25';
    dateProvider.setNow(christmasDay);
    const bookinDate = '2023-01-25';
    const availableRoom: Room = { roomNumber: 1, availableDate: bookinDate };
    roomRepository.feedWith([availableRoom]);
    const bookingPrice = 10;

    await commandHandler.execute({
      bookingDate: bookinDate,
      price: bookingPrice,
    });

    const roomBooked = roomRepository.getForRoomNumber(1);
    expect(roomBooked?.bookings[0].billed).toEqual(bookingPrice * 1.4);
  });
});
