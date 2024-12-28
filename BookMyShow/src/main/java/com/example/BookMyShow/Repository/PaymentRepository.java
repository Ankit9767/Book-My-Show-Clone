package com.example.BookMyShow.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.BookMyShow.Domain.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}

