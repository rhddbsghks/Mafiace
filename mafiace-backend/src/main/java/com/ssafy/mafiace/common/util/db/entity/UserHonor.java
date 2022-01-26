package com.ssafy.mafiace.common.util.db.entity;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "user_honor")
@ToString
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "user_honor_id"))
})
public class UserHonor extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_unique_id")
    private User user;

    @Column(name = "honor_no")
    private int honorNo;




}
