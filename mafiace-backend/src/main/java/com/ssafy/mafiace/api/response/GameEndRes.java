package com.ssafy.mafiace.api.response;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameEndRes {
    private boolean end;
    private List<String> mafia;
    private String winTeam;
}
