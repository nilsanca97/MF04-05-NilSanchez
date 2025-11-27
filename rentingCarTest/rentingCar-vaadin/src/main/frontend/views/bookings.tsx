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
                const bookingsData = await BookingEndpoint.getAllBookings();
                setBookings(bookingsData ? Array.from(bookingsData).filter((booking): booking is Booking => booking !== undefined) : []);
                //Filtra los undefined antes de llamar a setBookings
                //setBookings(bookingsData.filter((booking): booking is Booking => booking !== undefined));
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
      <h1>Bookings </h1>

      <div className= "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4 shadow-md">

                <div className="mt-2 space-y-1">
                    <p><strong>Id Boooking:</strong> {booking.id}</p>
                    <p><strong>Qty_days:</strong> {booking.qtyDays}</p>
                    <p><strong>Total Amount:</strong> {booking.totalAmount}</p>
                    <p><strong>Car brand:</strong> {booking.car?.brand} {booking.car?.model}</p>
                    <p><strong> Client name:</strong> {booking.client?.name} {booking.client?.lastName}</p>
            </div>
        </div>
      ))}
    </div>

      <h2>This place intentionally left empty </h2>
      <p>It’s a place where you can grow your own UI 🤗: get all bookings and show them in a table</p>

    </div>
  );
}
