package com.ssafy.mafiace.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordBody {
    private String playTime;
    private boolean isWin;
    private String role;

    public RecordBody(String playTime, boolean isWin, String role) {
        this.playTime = playTime;
        this.isWin = isWin;
        this.role = role;
    }

}
