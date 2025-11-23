import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = { menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' }, title: 'Home' };

export default function HomeView() {
  return (
    <div className="flex flex-col  items-center justify-center p-l text-center box-border">
     <h1>Home</h1>
     <p>Feature to implement: generate booking</p>
     <br />
     <img style={{ width: '800px' }} src="https://raw.githubusercontent.com/AlbertProfe/rentingCarTest/refs/heads/master/docs/ui/create_booking.drawio.png" />

    </div>
  );
}
