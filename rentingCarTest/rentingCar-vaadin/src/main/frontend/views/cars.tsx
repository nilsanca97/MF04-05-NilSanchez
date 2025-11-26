import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { CarEndpoint } from 'Frontend/generated/endpoints';
import Car from 'Frontend/generated/dev/app/rentingcartestvaadin/model/Car';

export const config: ViewConfig = {
    menu: { order: 1, icon: 'line-awesome/svg/car-side-solid.svg' },
    title: 'Cars'
};

export default function CarsView() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const carsData = await CarEndpoint.getAllCars();
        //Filtra los undefined antes de llamar a setCars
        setCars(carsData.filter((car): car is Car => car !== undefined));
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
      <div className="flex flex-col h-full items-center justify-center p-4">
        <h1>Cars</h1>
        <p>Loading cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-4">
        <h1>Cars</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Cars ({cars.length})</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold">{car.brand} {car.model}</h3>
            <div className="mt-2 space-y-1">
              <p><strong>Plate:</strong> {car.plate}</p>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Price:</strong> ${car.price}</p>
              {car.inssuranceCia && (
                <p><strong>Insurance:</strong> {car.inssuranceCia.name}</p>
              )}
              {car.availabilityRanges && (
                <div>
                  <strong>Availability:</strong>
                  <pre className="text-xs mt-1 bg-gray-100 p-2 rounded">
                    {car.availabilityRanges}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {cars.length === 0 && (
        <div className="text-center mt-8">
          <p>No cars found. Try populating the database first.</p>
        </div>
      )}
    </div>
  );
}
