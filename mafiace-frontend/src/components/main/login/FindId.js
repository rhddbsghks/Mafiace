import { useState } from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

const FindId = ({ clickFindId }) => {
  const [email, setEmail] = useState("");

  // onChange state 값 갱신
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const onclick = () => {
    console.log(email);
    alert("ID 찾기 api 없음");
  };

  return (
    <>
      <h1>ID 찾기</h1>

      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                icon="user"
                iconPosition="left"
                label="e-mail"
                placeholder="type your e-mail here"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form>
          </Grid.Column>

          <Grid.Column textAlign="center" verticalAlign="middle">
            <Button.Group>
              <Button
                onClick={onclick}
                content="Find ID"
                inverted
                color="blue"
              />
              <Button
                onClick={clickFindId}
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

export default FindId;
