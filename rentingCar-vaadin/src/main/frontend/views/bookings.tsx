import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  menu: { order: 2, icon: 'line-awesome/svg/address-book-solid.svg' },
  title: 'Bookings',
};

export default function BookingsView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <h1>Bookings</h1>
      <h2>This place intentionally left empty</h2>
      <p>It’s a place where you can grow your own UI 🤗: get all bookings and show them in a table</p>
    </div>
  );
}
