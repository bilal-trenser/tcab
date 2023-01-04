package com.trenser.transportationservices.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

@ApiModel(description = "Details about Cab")
@Document(collection = "CabTest")
@Data
public class CabDetail {

    @Id
    private String id;

    @ApiModelProperty(notes = "The cab identification NO of CAB")
    private String cabId;

    @ApiModelProperty(notes = "The registration number of CAB")
    private String registrationNumber;

    @ApiModelProperty(notes = "The type of CAB")
    private String cabType;

    @ApiModelProperty(notes = "The cab company of CAB")
    private String cabCompany;

    @ApiModelProperty(notes = "The capacity of CAB")
    private Integer capacity;

    @ApiModelProperty(notes = "The contact NO of supervisor of CAB")
    private Long supervisorNumber;

    @ApiModelProperty(notes = "The created date of the CAB")
    private Date createdDate;

    @ApiModelProperty(notes = "The user who created  the CAB")
    private String createdBy;

    @ApiModelProperty(notes = "The modified date the CAB")
    private Date modifiedDate;

    @ApiModelProperty(notes = "The user who modified the CAB")
    private String modifiedBy;

}
