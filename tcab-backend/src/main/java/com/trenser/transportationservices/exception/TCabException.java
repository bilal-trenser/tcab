package com.trenser.transportationservices.exception;

import lombok.Getter;

/**
 * Exception Class for TCab.
 */
@Getter
public class TCabException extends Exception {

    private static final long serialVersionUID = -2298878021677280815L;
    private final int statusCode;
    private final String statusMessage;

    public TCabException(StatusCode statusCode) {
        super();
        this.statusCode = statusCode.getCode();
        this.statusMessage = statusCode.getMessage();
    }
}
