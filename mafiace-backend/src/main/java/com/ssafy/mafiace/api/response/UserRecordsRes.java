package com.ssafy.mafiace.api.response;

import com.ssafy.mafiace.api.service.GameLogService;
import com.ssafy.mafiace.db.entity.UserGameLog;
import io.swagger.annotations.ApiModel;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@ApiModel("UserRecordPostResponse")
public class UserRecordsRes extends BaseResponseBody {

    @Autowired
    private static GameLogService gameLogService;

    List<RecordBody> records = new ArrayList<>();

    public static UserRecordsRes of(Integer statusCode, String message, List<UserGameLog> userGameLogs) {
        UserRecordsRes res = new UserRecordsRes();
        List<RecordBody> recordsList = new ArrayList<>();
        res.setStatus(statusCode);
        res.setMessage(message);
        for(UserGameLog userGameLog : userGameLogs){
            recordsList.add(
                new RecordBody(userGameLog.getPlayTime(),
                    userGameLog.isWin(),
                    userGameLog.getRoleName())
            );
        }
        res.setRecords(recordsList);
        return res;
    }
}