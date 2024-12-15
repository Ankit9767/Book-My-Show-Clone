package com.example.BookMyShow.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.BookMyShow.Domain.OrgUser;

@Repository
public interface OrgUserRepository extends JpaRepository<OrgUser, Long> {

    Optional<OrgUser> findByUserName(String userName);
    Optional<OrgUser> findByEmail(String email);
    }


