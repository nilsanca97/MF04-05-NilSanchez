import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { BookingEndpoint} from 'Frontend/generated/endpoints';
import Booking from 'Frontend/generated/dev/app/rentingcartestvaadin/model/Booking';

export const config: ViewConfig = {
  menu: { order: 2, icon: 'line-awesome/svg/address-book-solid.svg' },
  title: 'Bookings',
};

export default function BookingsView() {
      const [bookings, setBookings] = useState<Booking[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
          const fetchBookings = async () => {
              try {
                setLoading(true);
                const bookingData = await BookingEndpoint.getAllBookings();
                setBookings(bookingData ? Array.from(bookingData).filter((booking): booking is Booking => booking !== undefined) : []);
              } catch (error) {
                  setError('Failed to fetch bookings: '+ (error as Error).message);
              } finally {
                  setLoading(false);
              }
          };

          fetchBookings();
        }, []);

        if (loading) return <div className="p-8 text-center">Loading bookings...</div>;
        if (error) return <div className="p-8 text-red-600 text-center">{error}</div>;


  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <h1>Bookings</h1>
      <h2>This place intentionally left empty</h2>
      <p>It’s a place where you can grow your own UI 🤗: get all bookings and show them in a table</p>
    </div>
  );
}
