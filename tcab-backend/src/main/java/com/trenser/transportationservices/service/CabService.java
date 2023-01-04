package com.trenser.transportationservices.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.trenser.transportationservices.dto.CabDetailsResponse;
import com.trenser.transportationservices.exception.StatusCode;
import com.trenser.transportationservices.exception.TCabException;
import com.trenser.transportationservices.model.CabDetail;
import com.trenser.transportationservices.repository.CabRepository;

/**
 * Service class for Cab Details.
 */
@Service
public class CabService {

    @Autowired
    protected CabRepository cabRepository;

    @Autowired
    protected MongoTemplate mongoTemplate;

    public CabDetailsResponse searchCabDetails(Integer page, Integer limit, String cabId, Integer capacity,
            String cabType) {
        Pageable pageable = PageRequest.of(page, limit);
        Query query = new Query();
        if (StringUtils.hasText(cabId)) {
            query.addCriteria(Criteria.where("cabId").regex(cabId, "i"));
        }
        if (StringUtils.hasText(cabType)) {
            query.addCriteria(Criteria.where("cabType").regex(cabType, "i"));
        }
        if (null != capacity) {
            query.addCriteria(Criteria.where("capacity").is(capacity));
        }
        query.with(pageable);
        Page<CabDetail> pageResponse = PageableExecutionUtils.getPage(mongoTemplate.find(query, CabDetail.class),
                pageable,
                () -> mongoTemplate.count(query.skip(0).limit(0), CabDetail.class));
        return CabDetailsResponse.builder().data(pageResponse.getContent())
                .totalCount(pageResponse.getTotalElements()).build();
    }

    public Boolean addCabDetails(CabDetail cabDetails) throws TCabException {
        validateDuplicate(cabDetails);
        cabDetails.setCreatedDate(new Date());
        cabRepository.insert(cabDetails);
        return true;
    }

    private void validateDuplicate(CabDetail cabDetails) throws TCabException {
        CabDetailsResponse response = searchCabDetails(0, 10, cabDetails.getCabId(), null, null);
        if (response.getTotalCount() > 0) {
            throw new TCabException(StatusCode.DUPLICATE_CABID);
        }
    }

    public Boolean deleteCabDetails(String id) {
        cabRepository.deleteById(id);
        return true;
    }

    public CabDetail updateCabDetails(String id, CabDetail cabDetails) {
        CabDetail cab = cabRepository.findById(id).get();
        cab.setRegistrationNumber(cabDetails.getRegistrationNumber());
        cab.setCapacity(cabDetails.getCapacity());
        cab.setCabType(cabDetails.getCabType());
        cab.setCabCompany(cabDetails.getCabCompany());
        cab.setSupervisorNumber(cabDetails.getSupervisorNumber());
        cab.setModifiedDate(new java.util.Date());
        cab.setModifiedBy(cabDetails.getRegistrationNumber());
        cabRepository.save(cab);
        return cab;
    }

}
