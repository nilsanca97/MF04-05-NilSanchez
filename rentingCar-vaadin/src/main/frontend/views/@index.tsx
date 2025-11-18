import { AutoCrud } from '@vaadin/hilla-react-crud';
import CarModel from 'Frontend/generated/dev/app/rentingcartestvaadin/model/CarModel';
import { CarEndpoint } from 'Frontend/generated/endpoints';


import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = { menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' }, title: 'Home' };

export default function HomeView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <AutoCrud service={CarEndpoint} model={CarModel} />
    </div>
  );
}
