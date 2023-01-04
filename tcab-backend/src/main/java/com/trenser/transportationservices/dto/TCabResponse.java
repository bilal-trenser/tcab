package com.trenser.transportationservices.dto;

import com.trenser.transportationservices.exception.StatusCode;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

/**
 * Base Response class.
 */
@ApiModel(description = "TCab Base Response class")
@SuperBuilder
@Getter
public class TCabResponse {

    private StatusCode status;

}
