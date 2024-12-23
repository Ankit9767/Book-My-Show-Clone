package com.example.BookMyShow.DTO;

import java.time.LocalDateTime;
import java.util.List;

public class BookingDTO {

    private Integer numberOfSeats;
    private LocalDateTime timestamp;
    private Long userID;
    private Long showID;
    private List<Integer> selectedShowSeatIDs;


	public BookingDTO(Integer numberOfSeats, LocalDateTime timestamp, Long userID, Long showID,
		List<Integer> selectedShowSeatIDs) 
	{
		
		this.numberOfSeats = numberOfSeats;
		this.timestamp = timestamp;
		this.userID = userID;
		this.showID = showID;
		this.selectedShowSeatIDs = selectedShowSeatIDs;
	}

	public BookingDTO() {
		super();
	}

	public Integer getNumberOfSeats() {
		return numberOfSeats;
	}
	public void setNumberOfSeats(Integer numberOfSeats) {
		this.numberOfSeats = numberOfSeats;
	}
	public Long getShowID() {
		return showID;
	}
	public void setShowID(Long showID) {
		this.showID = showID;
	}
	public List<Integer> getSelectedShowSeatIDs() {
		return selectedShowSeatIDs;
	}
	public void setSelectedShowSeatIDs(List<Integer> selectedShowSeatIDs) {
		this.selectedShowSeatIDs = selectedShowSeatIDs;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }
    
}

