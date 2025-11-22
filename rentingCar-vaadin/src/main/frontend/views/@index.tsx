import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { CarEndpoint } from 'Frontend/generated/endpoints';
import { GenerateBookingEndpoint } from 'Frontend/generated/endpoints';
import Car from 'Frontend/generated/dev/app/rentingcartestvaadin/model/Car';
import Client from 'Frontend/generated/dev/app/rentingcartestvaadin/model/Client';


export const config: ViewConfig = {
    menu: {
        order: 0, icon: 'line-awesome/svg/home-solid.svg'
        },
    title: 'Home'
    };

// Hardcoded client
const hardcodedClient: Client = {
  id: '4782',
  name: 'Emma',
  lastName: 'Smith',
  email: 'emma.smith@gmail.com',
  age: 73,
  password: 'pass7032',
  premium: true
};

export default function HomeView() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [qtyDays, setQtyDays] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const carsData = await CarEndpoint.getAllCars();
        setCars(carsData ? Array.from(carsData).filter((car): car is Car => car !== undefined) : []);
      } catch (err) {
        setError('Failed to fetch cars: ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCar) {
      setError('Please select a car');
      return;
    }

    if (!bookingDate) {
      setError('Please select a booking date');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setBookingResult(null);

      // Convert date string to Unix timestamp (epoch seconds at 00:00:00 GMT)
      const dateObj = new Date(bookingDate + 'T00:00:00.000Z');
      const bookingDateEpoch = Math.floor(dateObj.getTime() / 1000);

      // Call GenerateBookingEndpoint with IDs instead of full objects
      const result = await GenerateBookingEndpoint.generateBooking(
        hardcodedClient.id!,
        selectedCar.id!,
        bookingDateEpoch,
        qtyDays
      );

      // Set the string result from the endpoint
      setBookingResult(result || null);

    } catch (err) {
      setError('Failed to create booking: ' + (err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-4">
        <h1>Generate Booking</h1>
        <p>Loading cars...</p>
         <img style={{ width: '800px' }} src="https://raw.githubusercontent.com/AlbertProfe/rentingCarTest/refs/heads/master/docs/ui/create_booking.drawio.png" />
      </div>
    );
  }

  if (error && !cars.length) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-4">
        <h1>Generate Booking</h1>
        <p className="text-red-500">{error}</p>
         <img style={{ width: '800px' }} src="https://raw.githubusercontent.com/AlbertProfe/rentingCarTest/refs/heads/master/docs/ui/create_booking.drawio.png" />
      </div>
    );
  }

  return (
     <div className="flex flex-col h-full items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Booking</h1>

      {/* Hardcoded Client Info */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Client Information</h2>
        <p><strong>Name:</strong> {hardcodedClient.name} {hardcodedClient.lastName}</p>
        <p><strong>Email:</strong> {hardcodedClient.email}</p>
        <p><strong>Client subscription:</strong> {hardcodedClient.premium ? "Premium" : "Standard"}</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Car Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Car:</label>
          <select
            value={selectedCar?.id?.toString() || ''}
            onChange={(e) => {
              const carId = parseInt(e.target.value);
              const car = cars.find(c => c.id?.toString() === carId.toString()) || null;
              setSelectedCar(car);
            }}
            className="w-full p-2 border rounded-md"
            required
            disabled={submitting}
          >
            <option value="">Choose a car...</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id?.toString() || ''}>
                {car.brand} {car.model} - {car.plate} (€{car.price}/day)
              </option>
            ))}
          </select>
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Booking Date:</label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
            disabled={submitting}
          />
        </div>

        {/* Quantity Days Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Quantity of Days:</label>
          <input
            type="number"
            min="1"
            value={qtyDays}
            onChange={(e) => setQtyDays(parseInt(e.target.value) || 1)}
            className="w-full p-2 border rounded-md"
            required
            disabled={submitting}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          disabled={submitting}
        >
          {submitting ? 'Creating Booking...' : 'Generate Booking'}
        </button>
      </form>

      {/* Booking Result */}
      {bookingResult && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Booking Result:</h3>
          <pre className="whitespace-pre-wrap text-sm">{bookingResult}</pre>
        </div>
      )}
    </div>
  );
}
