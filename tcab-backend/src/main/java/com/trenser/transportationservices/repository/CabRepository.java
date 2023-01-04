package com.trenser.transportationservices.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.trenser.transportationservices.model.CabDetail;

/**
 * Repository Class for Cab Details.
 */
@Repository
public interface CabRepository extends MongoRepository<CabDetail, String> {

}
