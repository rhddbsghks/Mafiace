import React from "react";
import {
  Divider,
  Header,
  Icon,
  Table,
  Statistic,
  Image,
} from "semantic-ui-react";
// import axios from "axios";

const MypageCompo = () => {
  // const [user, setUser] = useState({
  //   user_id: "",
  //   email: "",
  //   name: "",
  //   nickname: "",
  // });

  return (
    <>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="tag" />
          회원 정보
        </Header>
      </Divider>
      <br></br>
      <Image src="" size="small" />
      <Table definition sty>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2}>Name</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Nick Name</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>E-mail</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Password</Table.Cell>
            <Table.Cell>
              <button
                className="bg-purple-300 hover:bg-purple-500 py-1 text-center px-1 md:px-1 md:py-1 text-white rounded text-xl md:text-base mt-4"
                style={{}}
              >
                Change
              </button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Odor</Table.Cell>
            <Table.Cell>Not Much Usually</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Odor</Table.Cell>
            <Table.Cell>Not Much Usually</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <br></br>

      <Divider horizontal>
        <Header as="h4">
          <Icon name="bar chart" />
          전적
        </Header>
      </Divider>
      <br></br>

      <Statistic.Group style={{ justifyContent: "center" }}>
        <Statistic>
          <Statistic.Value>22,321</Statistic.Value>
          <Statistic.Label
            style={{ color: "blue", fontSize: "25px", marginTop: "10%" }}
          >
            Win
          </Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>31,200</Statistic.Value>
          <Statistic.Label
            style={{ color: "red", fontSize: "25px", marginTop: "10%" }}
          >
            Lose
          </Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>60,020</Statistic.Value>
          <Statistic.Label
            style={{ color: "#006400", fontSize: "30px", marginTop: "10%" }}
          >
            Total
          </Statistic.Label>
        </Statistic>
      </Statistic.Group>
      {/* <Segment.Group raised>
        <Segment>승리</Segment>
        <Segment>패배</Segment>
        <Segment>+</Segment>
      </Segment.Group> */}
    </>
  );
};

export default MypageCompo;
