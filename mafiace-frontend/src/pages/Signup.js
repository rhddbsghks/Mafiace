import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

const Signup = ({ clickSignup }) => {
  return (
    <>
      <h1>회원가입</h1>

      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                icon="user"
                iconPosition="left"
                label="ID"
                placeholder="type your ID here"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="PW"
                placeholder="type your PW here"
                type="password"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="PW 확인"
                placeholder="type your PW here"
                type="password"
              />
              <Form.Input
                icon="user"
                iconPosition="left"
                label="e-mail"
                placeholder="type your e-mail here"
              />

              <Form.Input
                icon="user"
                iconPosition="left"
                label="NickName"
                placeholder="type your NickName here"
              />
            </Form>
          </Grid.Column>

          <Grid.Column textAlign="center" verticalAlign="middle">
            <Button.Group>
              <Button
                onClick={clickSignup}
                content="Sign Up"
                icon="signup"
                inverted
                color="red"
              />
            </Button.Group>
          </Grid.Column>
        </Grid>
        <Divider vertical>and</Divider>
      </Segment>
    </>
  );
};

export default Signup;
