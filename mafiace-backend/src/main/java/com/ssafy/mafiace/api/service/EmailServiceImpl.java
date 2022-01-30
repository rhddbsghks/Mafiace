package com.ssafy.mafiace.api.service;

import java.util.Random;
import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    JavaMailSender emailSender;

    private MimeMessage createMessage(String to, String password) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to);//보내는 대상
        message.setSubject("Mafiace: 임시 비밀번호 발급");//제목

        String msg = "";
        msg += "<div style='margin:100px;'>";
        msg += "<h2> 안녕하세요, Mafiace입니다. </h2>";
        msg += "<br>";
        msg += "<p>아래 임시비밀번호로 로그인하시고 비밀번호를 수정해주세요.<p>";
        msg += "<br>";
        msg += "<p>저희 서비스를 이용해주셔서 감사합니다!<p>";
        msg += "<br>";
        msg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msg += "<h3 style='color:blue;'>" + password + "</h3>";
        msg += "<div style='font-size:130%'>";
        message.setText(msg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("mafiassafy@gmail.com", "Mafiace"));//보내는 사람
        return message;
    }

    @Override
    public void sendPasswordToEmail(String to, String password) throws Exception {
        MimeMessage message = createMessage(to, password);
        try {//예외처리
            emailSender.send(message);
        } catch (MailException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }

    }

    @Override
    public String createPassword() {
        StringBuffer password = new StringBuffer();
        Random rnd = new Random();
        for (int i = 0; i < 16; i++) { // 16자리의 임시 비밀번호
            int index = rnd.nextInt(3); // 0~2 까지 랜덤
            switch (index) {
                case 0:
                    password.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    password.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    password.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return password.toString();
    }
}
