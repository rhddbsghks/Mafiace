package com.ssafy.mafiace.api.response;

import com.ssafy.mafiace.db.entity.UserGameLog;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.game.honor.HonorName;
import io.swagger.annotations.ApiModel;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserRecordPostResponse")
public class UserRecordsRes extends BaseResponseBody {

    List<RecordBody> records = new ArrayList<>();
    List<String> honors = new ArrayList<>();
    UserRecordsBody userRecords;

    public static UserRecordsRes of(Integer statusCode, String message, List<UserGameLog> userGameLogs, UserRecords userRecords, List<HonorName> honorNameList) {
        UserRecordsRes res = new UserRecordsRes();
        List<RecordBody> recordsList = new ArrayList<>();
        List<String> tmpHonors = new ArrayList<>();
        res.setStatus(statusCode);
        res.setMessage(message);
        for(UserGameLog userGameLog : userGameLogs){
            recordsList.add(
                new RecordBody(userGameLog.getPlayTime(),
                    userGameLog.isWin(),
                    userGameLog.getRoleName())
            );
        }
        for(HonorName honorName : honorNameList){
            tmpHonors.add(honorName.name());
        }
        res.setRecords(recordsList);
        res.setUserRecords(new UserRecordsBody(userRecords));
        res.setHonors(tmpHonors);
        return res;
    }
}