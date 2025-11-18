import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = { menu: { order: 1, icon: 'line-awesome/svg/car-side-solid.svg' }, title: 'Cars' };

export default function CarsView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
     <h1>Cars</h1>
      <h2>This place intentionally left empty</h2>
      <p>It’s a place where you can grow your own UI 🤗. get all cars and show them in a table</p>
    </div>
  );
}
