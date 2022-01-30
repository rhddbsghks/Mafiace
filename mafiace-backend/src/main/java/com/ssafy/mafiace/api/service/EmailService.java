package com.ssafy.mafiace.api.service;

public interface EmailService {
	public void sendPasswordToEmail(String to, String password) throws Exception;
	public String createPassword();
}
