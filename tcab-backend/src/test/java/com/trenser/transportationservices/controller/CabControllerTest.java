package com.trenser.transportationservices.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import com.trenser.transportationservices.dto.CabDetailsResponse;
import com.trenser.transportationservices.dto.TCabResponse;
import com.trenser.transportationservices.exception.StatusCode;
import com.trenser.transportationservices.exception.TCabException;
import com.trenser.transportationservices.model.CabDetail;
import com.trenser.transportationservices.service.CabService;

public class CabControllerTest {

    @Test
    public void listCabDetailsTest() throws TCabException {
        CabController cabController = new CabController();
        CabService cabService = mock(CabService.class);
        CabDetailsResponse cabDetailsResponse = mock(CabDetailsResponse.class);
        List<CabDetail> cabDetails = mock(ArrayList.class);
        when(cabDetailsResponse.getData()).thenReturn(cabDetails);
        cabController.cabService = cabService;
        when(cabService.searchCabDetails(0, 10, "cabId", 5, "cabType")).thenReturn(cabDetailsResponse);
        ResponseEntity<CabDetailsResponse> response = cabController.listCabDetails(0, 10, "cabId", 5, "cabType");
        assertEquals(200, response.getStatusCode().value(), "Must be same");
        assertNotNull(response.getBody());
    }

    @Test
    public void addCabDetailsTest() throws TCabException {
        CabController cabController = new CabController();
        CabDetail cabDetail = mock(CabDetail.class);
        CabService cabService = mock(CabService.class);
        cabController.cabService = cabService;
        when(cabService.addCabDetails(cabDetail)).thenReturn(true);
        ResponseEntity<TCabResponse> response = cabController.addCabDetails(cabDetail);
        assertEquals(200, response.getStatusCode().value(), "Must be same");
    }

    @Test
    public void addCabDetailsFailTest() throws TCabException {
        CabController cabController = new CabController();
        CabDetail cabDetail = mock(CabDetail.class);
        CabService cabService = mock(CabService.class);
        cabController.cabService = cabService;
        when(cabService.addCabDetails(cabDetail)).thenThrow(new TCabException(StatusCode.DUPLICATE_CABID));
        ResponseEntity<TCabResponse> response = cabController.addCabDetails(cabDetail);
        assertEquals(500, response.getStatusCode().value(), "Must be same");
    }

    @Test
    public void deleteCabDetailsTest() throws TCabException {
        CabController cabController = new CabController();
        CabService cabService = mock(CabService.class);
        cabController.cabService = cabService;
        when(cabService.deleteCabDetails("id")).thenReturn(true);
        ResponseEntity<TCabResponse> response = cabController.deleteCabDetails("id");
        assertEquals(200, response.getStatusCode().value(), "Must be same");
    }

    @Test
    public void updateCabDetailsTest() throws TCabException {
        CabController cabController = new CabController();
        CabDetail cabDetail = mock(CabDetail.class);
        CabService cabService = mock(CabService.class);
        cabController.cabService = cabService;
        when(cabService.updateCabDetails("id", cabDetail)).thenReturn(cabDetail);
        ResponseEntity<CabDetailsResponse> response = cabController.updateCabDetails("id", cabDetail);
        assertEquals(200, response.getStatusCode().value(), "Must be same");
        assertNotNull(response.getBody());
    }
}
