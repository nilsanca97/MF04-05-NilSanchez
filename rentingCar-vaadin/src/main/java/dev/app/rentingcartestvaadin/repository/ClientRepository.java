package dev.app.rentingcartestvaadin.repository;

import dev.app.rentingcartestvaadin.model.Client;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<Client, String>, JpaSpecificationExecutor<Client> {
}
