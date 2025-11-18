package dev.app.rentingcartestvaadin.service;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;
import dev.app.rentingcartestvaadin.model.Client;
import dev.app.rentingcartestvaadin.repository.ClientRepository;

@BrowserCallable
@AnonymousAllowed
public class ClientService
        extends CrudRepositoryService<Client, String, ClientRepository> {
}