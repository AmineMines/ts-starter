export class BookingTicketCommand{
  constructor(
    public readonly gojobberId: string,
){

}
  
}

export class BookingTicketHandler{
  async execute(command: BookingTicketCommand){
    throw new Error("GOJOBBER_DOES_NOT_EXIST")
  }
}