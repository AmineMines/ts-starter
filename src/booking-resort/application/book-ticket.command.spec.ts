import { BookingTicketCommand, BookingTicketHandler } from "./book-ticket.comand"

describe("Booking Ticket", ()=>{
  describe("Given a none existing gojobber ",()=>{

    

    describe("When a gojobber try to book a ticket", ()=>{

      const command = new BookingTicketCommand('e3251f50-55ff-4773-bd24-d843571ca6ef')
      const handler = new BookingTicketHandler()
      it("Then it should trow a error", async ()=>{
        expect(async ()=> {
          await handler.execute(command)
        }).rejects.toThrow(new Error("GOJOBBER_DOES_NOT_EXIST"))
      })
    })
  })
  describe('Given a gojobber', ()=>{
    describe('And a none existing period', ()=>{
      
    })
  })
})