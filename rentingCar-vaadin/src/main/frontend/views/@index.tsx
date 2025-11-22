import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { CarEndpoint } from 'Frontend/generated/endpoints';
import { GenerateBookingEndpoint } from 'Frontend/generated/endpoints';
import Car from 'Frontend/generated/dev/app/rentingcartestvaadin/model/Car';
import Client from 'Frontend/generated/dev/app/rentingcartestvaadin/model/Client';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { FormLayout } from '@vaadin/react-components/FormLayout.js';
import { Select } from '@vaadin/react-components/Select.js';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { IntegerField } from '@vaadin/react-components/IntegerField.js';
import { Button } from '@vaadin/react-components/Button.js';
import { Details } from '@vaadin/react-components/Details.js';
import { Notification } from '@vaadin/react-components/Notification.js';
import { ProgressBar } from '@vaadin/react-components/ProgressBar.js';


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


  if (loading) {
    return (
      <VerticalLayout style={{ margin: '100px' }}>
        <h1>Generate Booking</h1>
        <p>Loading cars...</p>
        <ProgressBar indeterminate />
        <img style={{ width: '800px' }} src="https://raw.githubusercontent.com/AlbertProfe/rentingCarTest/refs/heads/master/docs/ui/create_booking.drawio.png" />
      </VerticalLayout>
    );
  }

  if (error && !cars.length) {
    return (
      <VerticalLayout style={{ margin: '100px' }}>
        <h1>Generate Booking</h1>
        <p>{error}</p>
        <img style={{ width: '800px' }} src="https://raw.githubusercontent.com/AlbertProfe/rentingCarTest/refs/heads/master/docs/ui/create_booking.drawio.png" />
      </VerticalLayout>
    );
  }

  const showError = (message: string) => {
    Notification.show(message, { theme: 'error' });
  };

  const showSuccess = (message: string) => {
    Notification.show(message, { theme: 'success' });
  };

  const handleSubmitInternal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCar) {
      showError('Please select a car');
      return;
    }

    if (!bookingDate) {
      showError('Please select a booking date');
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
      if (result) {
        showSuccess('Booking created successfully!');
      }

    } catch (err) {
      const errorMessage = 'Failed to create booking: ' + (err as Error).message;
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const carItems = cars.map((car) => ({
    label: `${car.brand} ${car.model} - ${car.plate} (€${car.price}/day)`,
    value: car.id?.toString() || ''
  }));

  return (
    <VerticalLayout style={{ margin: '100px' }}>
      <h1>Generate Booking</h1>

      <Details summary="Client Information" opened>
        <VerticalLayout style={{ margin: '10px' }}>
          <p><strong>Name:</strong> {hardcodedClient.name} {hardcodedClient.lastName}</p>
          <p><strong>Email:</strong> {hardcodedClient.email}</p>
          <p><strong>Client subscription:</strong> {hardcodedClient.premium ? "Premium" : "Standard"}</p>
        </VerticalLayout>
      </Details>

      <FormLayout>
        <Select
          label="Select Car"
          placeholder="Choose a car..."
          items={carItems}
          value={selectedCar?.id?.toString() || ''}
          onValueChanged={(e) => {
            const carId = parseInt(e.detail.value);
            const car = cars.find(c => c.id?.toString() === carId.toString()) || null;
            setSelectedCar(car);
          }}
          disabled={submitting}
        />

        <DatePicker
          label="Booking Date"
          value={bookingDate}
          onValueChanged={(e) => setBookingDate(e.detail.value)}
          disabled={submitting}
        />

        <IntegerField
          label="Quantity of Days"
          value={qtyDays.toString()}
          min={1}
          onValueChanged={(e) => setQtyDays(parseInt(e.detail.value) || 1)}
          disabled={submitting}
        />

        <Button
          theme="primary"
          onClick={handleSubmitInternal}
          disabled={submitting}
        >
          {submitting ? 'Creating Booking...' : 'Generate Booking'}
        </Button>
      </FormLayout>

      {bookingResult && (
        <Details summary="Booking Result" opened>
          <pre>{bookingResult}</pre>
        </Details>
      )}
    </VerticalLayout>
  );
}
