import { AutoCrud } from '@vaadin/hilla-react-crud';
import ClientModel from 'Frontend/generated/dev/app/rentingcartestvaadin/model/ClientModel';
import { ClientService } from 'Frontend/generated/endpoints';


import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = { menu: { order: 3, icon: 'line-awesome/svg/person-booth-solid.svg' }, title: 'Clients' };

export default function ClientsView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <AutoCrud service={ClientService} model={ClientModel} />
    </div>
  );
}
