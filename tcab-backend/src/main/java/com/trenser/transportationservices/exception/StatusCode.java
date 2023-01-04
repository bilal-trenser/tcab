package com.trenser.transportationservices.exception;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * enum to hold custom error codes.
 */
@Getter
@RequiredArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum StatusCode {

    SUCCESS(200, "Success"),
    DUPLICATE_CABID(101, "Duplicate Cab ID Entered");

    private final int code;
    private final String message;

}
