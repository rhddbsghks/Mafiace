package com.ssafy.mafiace.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameEndRes {
    private boolean end;
    private String winTeam;
}
