import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

const FindId = ({ clickFindId }) => {
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
              />
            </Form>
          </Grid.Column>

          <Grid.Column textAlign="center" verticalAlign="middle">
            <Button.Group>
              <Button
                onClick={clickFindId}
                content="Find ID"
                inverted
                color="blue"
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
