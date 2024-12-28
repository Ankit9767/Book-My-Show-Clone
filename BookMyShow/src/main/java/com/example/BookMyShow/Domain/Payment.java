package com.example.BookMyShow.Domain;

import java.time.LocalDateTime;

import com.example.BookMyShow.Domain.Enumeration.PaymentMethod;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentID;

    private Double amount;

    private LocalDateTime timestamp;

    private Integer discountCouponID;

    private Integer remoteTransactionID;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @ManyToOne
    @JoinColumn(name = "bookingID")
    private Booking booking;

	public Payment(Integer paymentID, Double amount, LocalDateTime timestamp, Integer discountCouponID,
			Integer remoteTransactionID, PaymentMethod paymentMethod, Booking booking) 
	{
		this.paymentID = paymentID;
		this.amount = amount;
		this.timestamp = timestamp;
		this.discountCouponID = discountCouponID;
		this.remoteTransactionID = remoteTransactionID;
		this.paymentMethod = paymentMethod;
		this.booking = booking;
	}

	public Payment() {
		super();
	}

	public Integer getPaymentID() {
		return paymentID;
	}

	public void setPaymentID(Integer paymentID) {
		this.paymentID = paymentID;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public Integer getDiscountCouponID() {
		return discountCouponID;
	}

	public void setDiscountCouponID(Integer discountCouponID) {
		this.discountCouponID = discountCouponID;
	}

	public Integer getRemoteTransactionID() {
		return remoteTransactionID;
	}

	public void setRemoteTransactionID(Integer remoteTransactionID) {
		this.remoteTransactionID = remoteTransactionID;
	}

	public PaymentMethod getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(PaymentMethod paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public Booking getBooking() {
		return booking;
	}

	public void setBooking(Booking booking) {
		this.booking = booking;
	}

}

