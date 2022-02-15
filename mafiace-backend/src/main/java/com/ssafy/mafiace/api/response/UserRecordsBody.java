package com.ssafy.mafiace.api.response;

import com.ssafy.mafiace.db.entity.UserRecords;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRecordsBody {
    private int winCount;
    private int loseCount;
    private int rating;

    public UserRecordsBody(UserRecords userRecords) {
        this.winCount = userRecords.getWinCount();
        this.loseCount = userRecords.getLoseCount();
        this.rating = userRecords.getRating();
    }
}
