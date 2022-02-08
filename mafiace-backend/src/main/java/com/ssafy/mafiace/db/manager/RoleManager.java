package com.ssafy.mafiace.db.manager;

import com.ssafy.mafiace.api.response.GamePlayerRes;
import com.ssafy.mafiace.game.role.Role;
import com.ssafy.mafiace.game.role.RoleMaker;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class RoleManager {

    private static Map<Integer, RoleMaker> roleMapper = new ConcurrentHashMap<>();

    static {
        roleMapper.put(5, new RoleMaker(5, 1, 2, 1, 1));
        roleMapper.put(6, new RoleMaker(6, 2, 2, 1, 1));
        roleMapper.put(7, new RoleMaker(7, 2, 3, 1, 1));
        roleMapper.put(8, new RoleMaker(8, 3, 3, 1, 1));
    }

    public static List<Role> allocateRole(GamePlayerRes players){
        RoleMaker roleMaker = roleMapper.get(players.getPlayers().size());
        List<Role> roles = roleMaker.makeRole();

        Collections.shuffle(roles);
        players.setRole(roles);
        return roles;
    }



}
