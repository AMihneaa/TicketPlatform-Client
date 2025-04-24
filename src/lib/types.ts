export interface Route {
    id: number | string
    from: string
    to: string
    price: string | number
    duration: string
    departures: string
    departureTime?: string
    arrivalTime?: string
    rating?: number
    amenities?: string[]
    popular?: boolean
  }
  
  export interface Ticket {
    id: string
    from: string
    to: string
    date: string
    departureTime: string
    arrivalTime: string
    passengers: number
    status: "upcoming" | "completed" | "cancelled"
    price: string
  }

  export interface ReservationDetails {
    [reservationId: string]: {
      [transportType: string]: {
        "Reservation Status": "ACTIVE" | "INACTIVE";
        Routes: string[];
      };
    };
  }

  export interface NormalizedReservation {
    id: string;
    transportType: string;
    reservationStatus: "ACTIVE" | "INACTIVE";
    routes: string[];
  }
  
  export interface DepartureOption {
    time: string
    arrivalTime: string
    price: number
  }