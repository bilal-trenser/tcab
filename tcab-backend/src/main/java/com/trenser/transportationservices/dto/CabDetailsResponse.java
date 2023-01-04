package com.trenser.transportationservices.dto;

import java.util.List;

import com.trenser.transportationservices.model.CabDetail;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

/**
 * Response class for storing Cab Details.
 */
@ApiModel(description = "TCab CabDetails Response class")
@SuperBuilder
@Getter
public class CabDetailsResponse extends TCabResponse {

    @ApiModelProperty(notes = "Total Count of the Response")
    private final long totalCount;
    private final List<CabDetail> data;

}
