package com.trenser.transportationservices.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import com.trenser.transportationservices.exception.TCabException;
import com.trenser.transportationservices.model.CabDetail;
import com.trenser.transportationservices.repository.CabRepository;

public class CabServiceTest {

    @Test
    public void searchCabDetailsTest(){

        CabService cabService = new CabService();
        MongoTemplate mongoTemplate = mock(MongoTemplate.class);
        Query query = mock(Query.class);
        List<CabDetail> cabDetails = new ArrayList<>();
        when(mongoTemplate.find(query, CabDetail.class)).thenReturn(cabDetails);
        cabService.mongoTemplate = mongoTemplate;
        cabService.searchCabDetails(0, 10, "cabId", 1, "cabType");

    }

    @Test
    public void addCabDetailsTest() throws TCabException{

        CabService cabService = new CabService();
        MongoTemplate mongoTemplate = mock(MongoTemplate.class);
        cabService.mongoTemplate = mongoTemplate;
        CabDetail cabDetail = new CabDetail();
        cabDetail.setCabId("Id");
        cabDetail.setCabType("CabType");
        cabDetail.setCabCompany("CabCompany");
        cabDetail.setCapacity(1);
        cabDetail.setModifiedDate(new Date());
        CabRepository cabRepository = mock(CabRepository.class);
        cabService.cabRepository = cabRepository;
        Boolean result = cabService.addCabDetails(cabDetail);
        assertTrue(result);
    }

    @Test
    public void deleteCabDetailsTest(){

        CabService cabService = new CabService();
        CabRepository cabRepository = mock(CabRepository.class);
        cabService.cabRepository = cabRepository;
        boolean result = cabService.deleteCabDetails("Id");
        assertTrue(result);
    }

    @Test
    public void updateCabDetailsTest(){

        CabService cabService = new CabService();
        CabRepository cabRepository = mock(CabRepository.class);
        CabDetail cabDetail = new CabDetail();
        cabDetail.setCabId("Id");
        cabDetail.setCabType("CabType");
        cabDetail.setCabCompany("CabCompany");
        cabDetail.setCapacity(1);
        cabDetail.setModifiedDate(new Date());
        Optional<CabDetail> cabDetails = Optional.of(cabDetail);
        when(cabRepository.findById("id")).thenReturn(cabDetails);
        cabService.cabRepository = cabRepository;
       
        CabDetail result = cabService.updateCabDetails("id", cabDetail);
        assertEquals(cabDetail.getId(), result.getId());
        assertEquals(cabDetail.getCabType(), result.getCabType());
        assertEquals(cabDetail.getCabCompany(), result.getCabCompany());
        assertEquals(cabDetail.getCapacity(), result.getCapacity());
        assertEquals(cabDetail.getModifiedDate(), result.getModifiedDate());
    }
    
}
