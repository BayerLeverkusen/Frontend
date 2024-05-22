export interface Reservation {
    reservationHotelId: number;
    reservationHotelName: string;
    reservationHotelCountry: string;
    reservationHotelCity: string;
    reservationHotelPrice: number;
    reservationHotelStartDate: Date;
    reservationHotelEndDate: Date;

    reservationTransportId: number;
    reservationTransportName: string;
    reservationTransportCountry: string;
    reservationTransportCity: string;
    reservationTransportPrice: number;
    reservationTransportStartDate: Date;
    reservationTransportEndDate: Date;

    reservationFieldId: number;
    reservationFieldName: string;
    reservationFieldCountry: string;
    reservationFieldCity: string;
    reservationFieldPrice: number;
    reservationFieldStartDate: Date;
    reservationFieldEndDate: Date;
    
  }