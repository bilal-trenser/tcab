package com.trenser.transportationservices.controller;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.trenser.transportationservices.dto.CabDetailsResponse;
import com.trenser.transportationservices.dto.TCabResponse;
import com.trenser.transportationservices.exception.StatusCode;
import com.trenser.transportationservices.exception.TCabException;
import com.trenser.transportationservices.model.CabDetail;
import com.trenser.transportationservices.service.CabService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.NonNull;

/**
 * Rest Class for Cab Deatils.
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/tcab")
public class CabController {

    @Autowired
    protected CabService cabService;

    @GetMapping(value = "/v1/cabs")
    @ApiOperation(value = "Search Cab Details", notes = "API to Search a Cab Details based on search criteria")
    public ResponseEntity<CabDetailsResponse> listCabDetails(@RequestParam Integer page,
            @RequestParam Integer limit,
            @RequestParam(required = false) String cabId,
            @RequestParam(required = false) Integer capacity,
            @RequestParam(required = false) String cabType) {
        CabDetailsResponse cabDetailsResponse = cabService.searchCabDetails(page, limit, cabId, capacity, cabType);
        return ResponseEntity.ok(CabDetailsResponse.builder()
                .data(cabDetailsResponse.getData())
                .totalCount(cabDetailsResponse.getTotalCount())
                .status(StatusCode.SUCCESS).build());
    }

    @PostMapping("/v1/cabs")
    @ApiOperation(value = "Add Cab Details", notes = "API to Add a Cab in the system")
    public ResponseEntity<TCabResponse> addCabDetails(@NonNull @RequestBody CabDetail cabDetails) {
        try {
            cabService.addCabDetails(cabDetails);
            return ResponseEntity.ok(TCabResponse.builder().status(StatusCode.SUCCESS).build());
        } catch (TCabException te) {
            return new ResponseEntity<>(TCabResponse.builder().status(StatusCode.DUPLICATE_CABID).build(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/v1/cabs/{id}")
    @ApiOperation(value = "Delete Cab Details", notes = "API to Delete a Cab Detail in the system")
    public ResponseEntity<TCabResponse> deleteCabDetails(
            @ApiParam(value = "ID of the Cab which is to be deleted", required = true) @PathVariable String id) {
        cabService.deleteCabDetails(id);
        return ResponseEntity.ok(TCabResponse.builder()
                .status(StatusCode.SUCCESS)
                .build());
    }

    @PutMapping("/v1/cabs/{id}")
    @ApiOperation(value = "Modify Cab Details", notes = "API to Modify a Cab Detail present in the system")
    public ResponseEntity<CabDetailsResponse> updateCabDetails(@PathVariable String id,
            @NonNull @RequestBody CabDetail cabDetail) {

        return ResponseEntity.ok(CabDetailsResponse.builder()
                .data(Arrays.asList(cabService.updateCabDetails(id, cabDetail)))
                .status(StatusCode.SUCCESS)
                .build());
    }

}
