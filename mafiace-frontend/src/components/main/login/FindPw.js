import axios from "axios";
import { useState } from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

const FindPw = ({ clickFindPw }) => {
  const [values, setValues] = useState({
    userId: "",
    email: "",
  });

  // onChange state 값 갱신
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onclick = () => {
    console.log(values);
    axiosPatch();
  };

  const axiosPatch = () => {
    axios
      .patch("/mafiace/api/user/password", values)
      .then((res) => {
        console.log(res);
        window.alert(
          `${values.email}로 임시 비밀번호가 발송되었습니다.\n메일 확인 후 임시 비밀번호로 로그인 해주세요.`
        );
        clickFindPw();
      })
      .catch((err) => {
        console.log(err.response.data);
        window.alert("ID 또는 e-amil을 다시 한번 확인해주세요.");
      });
  };

  return (
    <>
      <h1>PW 찾기</h1>

      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                icon="user"
                iconPosition="left"
                label="ID"
                placeholder="type your ID here"
                name="userId"
                value={values.userId}
                onChange={handleChange}
              />
              <Form.Input
                icon="user"
                iconPosition="left"
                label="e-mail"
                placeholder="type your e-mail here"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </Form>
          </Grid.Column>

          <Grid.Column textAlign="center" verticalAlign="middle">
            <Button.Group>
              <Button
                onClick={onclick}
                content="Find PW"
                inverted
                color="blue"
              />
              <Button
                onClick={clickFindPw}
                content="뒤로가기"
                inverted
                color="purple"
              />
            </Button.Group>
          </Grid.Column>
        </Grid>
        <Divider vertical>and</Divider>
      </Segment>
    </>
  );
};

export default FindPw;
