package com.inm5151.user.client.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inm5151.user.client.model.ClientAccount;

@Repository 

public interface ClientRepository extends JpaRepository<ClientAccount, Long> {
    ClientAccount findById(long id);
}
