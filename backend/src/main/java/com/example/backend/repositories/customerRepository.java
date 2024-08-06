
package com.example.backend.repositories;
import com.example.backend.models.customerModel;

import com.example.backend.models.deliverypartnerModel;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface customerRepository extends CrudRepository<customerModel, Long> {
    // Method to find a customer by email
    customerModel findByCustMail(String custMail);
    
    customerModel findByCustMailAndCustPswd(String mail, String pswd);
    @Query("SELECT COUNT(c) FROM customerModel c")
    long countCustomers();
}
