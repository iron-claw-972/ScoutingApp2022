//HI RICHIE
//EXPLANATIONS IN COMMENTS

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SpecTable from "./SpecTable";

import { getFirestore, collection, getDocs } from "firebase/firestore";

import { Grid, Label, List, LabelDetail, Table } from "semantic-ui-react";
import Textbox from "./Textbox";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Router, useRouter } from "next/router";
import "handsontable/dist/handsontable.full.css";
import dynamic from "next/dynamic";
import { datas } from "../../utils/localstorage";
import Link from "next/link";
import { ObjectSchema } from "yup";
import { boolean } from "yup/lib/locale";

//This is all ui
const TeamCard = ({ bgcolor, labelcolor, textcolor, teamData }) => {
  //Read all the comments first, they start further down.
  const {
    teamNumber = "",
    teamName = "",
    cvCapability = "",
    driveTrain = "",
    height = "",
    length = "",
    pastFocuses = "",
    weight = "",
    worlds = "",
    hangar = [[0, 0, 0, 0, 0]],
    matchAvg = [[0, 0, 0, 0, 0]],
    commentAuto = [""],
    commentTele = [""],
    commentEnd = [""],
  } = teamData;

  const TextHelper = (props) => (
    <span style={{ fontSize: 16, color: textcolor }}>{props.children}</span>
  );
  return (
    <div>
      <List.Item key={teamNumber}>
        <Grid
          divided="vertically"
          stackable
          style={{
            background: bgcolor,
            border: "2px solid rgba(0, 0, 0, 0.5)",
            borderRadius: "5px",
            margin: "5px",
          }}
        >
          <Grid.Row columns={2} textAlign="center" verticalAlign="bottom">
            <Grid.Column>
              <Label size="huge" color={labelcolor}>
                {teamNumber}
              </Label>
            </Grid.Column>
            <Grid.Column>
              <Label color={labelcolor} size="big">
                <LabelDetail>{teamName}</LabelDetail>
              </Label>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2} divided>
            <Grid.Column>
              <Label horizontal color={labelcolor}>
                DriveTrain:
              </Label>
              <TextHelper>{driveTrain}</TextHelper>
            </Grid.Column>
            <Grid.Column>
              <Label horizontal color={labelcolor}>
                CV:
              </Label>
              <TextHelper>{cvCapability}</TextHelper>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3} divided>
            <Grid.Column>
              <Label horizontal color={labelcolor}>
                Height:
              </Label>
              <TextHelper>{height}</TextHelper>
            </Grid.Column>
            <Grid.Column>
              <Label horizontal color={labelcolor}>
                Length:
              </Label>
              <TextHelper>{length}</TextHelper>
            </Grid.Column>
            <Grid.Column>
              <Label horizontal color={labelcolor}>
                Weight:
              </Label>
              <TextHelper>{weight}</TextHelper>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row divided>
            <Grid.Column width={6}>
              <Label horizontal color={labelcolor}>
                World?:
              </Label>
              <TextHelper>{worlds}</TextHelper>
            </Grid.Column>
            <Grid.Column width={10}>
              <TextHelper>{pastFocuses}</TextHelper>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row divided>
            <Grid.Column width={7}>
              <SpecTable
                columns={5}
                headerName="match averages"
                specData={matchAvg}
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <SpecTable columns={5} headerName="Hangar" specData={hangar} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Textbox
                category={"Auto comments"}
                text={commentAuto.join(",   ")}
              ></Textbox>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Textbox
                category={"Teleop comments"}
                text={commentTele.join(",   ")}
              ></Textbox>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Textbox
                category={"Endgame comments"}
                text={commentEnd.join(",   ")}
              ></Textbox>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </List.Item>
    </div>
  );
};

//The tricky part starts here:
const TeamPages = () => {
  const router = useRouter();
  const hotTableComponent = useRef(null);

  const data = datas.match;

  const [teamData, setTeamData] = useState([]);

  useEffect(async () => {
    axios
      .get("/api/scout/match/getMatchData/")
      .then(async (res) => {
        var scouting_data_keys = Object.keys(res.data[0]);
        var [success, form_schema] = await data.getFormSchema();
        if (success) {
          scouting_data_keys = scouting_data_keys.map((key) => {
            return form_schema.find((field) => {
              return field.id === key;
            })?.label;
          });
        }
        const matchDataArr = [];
        for (var i = 0; i < res.data.length; i++) {
          matchDataArr[i] = Object.values(res.data[i]);
        }
      })
      .catch((err) => {
        console.log("No data");
      });
    var add = true;
    let mergedDataArr = [];
    var totalMatches = Array(100001);
    var realTotalMatches = Array(100001);
    for (let i = 0; i < matchDataArr.length; i++) {
      for (let j = 0; j < mergedDataArr.length; j++) {
        if (mergedData[j].teamNumber == matchDataArr[i][10]) {
          totalMatches[matchDataArr] += 1;
          realTotalMatches[matchDataArr] += 1;
          add = false;
        }
        if (add) {
          mergedDataArr.push({
            teamNumber: matchDataArr[i][10],
            hangar: [
              ["Traverse", "High", "Medium", "Low", "None"],
              [0, 0, 0, 0, 0],
            ],
            matchAvg: [
              ["auto LH", "auto UH", "teleop LH", "teleop UH"],
              [0, 0, 0, 0],
            ],
            commentAuto: [],
            commentTele: [],
          });
          add = true;
          totalMatches[matchDataArr] += 1;
          realTotalMatches[matchDataArr] += 1;
        }
      }
    }

    for (let i = 0; i < matchDataArr.length; i++) {
      var index = 0;
      for (let j = 0; j < mergedDataArr.length; j++) {
        if (mergedDataArr[j].teamNumber == matchDataArr[i][10]) {
          index = j;
          break;
        }
      }
      mergedDataArr[index].commentAuto.push(matchDataArr[i][1]);
      if (matchDataArr[index][2] == "Traverse") {
        mergedDataArr[index].hangar[1][0] += 1;
      } else if (matchDataArr[i][2] == "High") {
        mergedDataArr[index].hangar[1][1] += 1;
      } else if (matchDataArr[i][2] == "Medium") {
        mergedDataArr[index].hangar[1][2] += 1;
      } else if (matchDataArr[i][2] == "Low") {
        mergedDataArr[index].hangar[1][3] += 1;
      } else {
        mergedDataArr[index].hangar[1][4] += 1;
      }
      mergedDataArr[index].commentTele.push(matchDataArr[i][4]);
      mergedDataArr[index].matchAvg[1][0] += parseInt(matchDataArr[i][6]);
      mergedDataArr[index].matchAvg[1][1] += parseInt(matchDataArr[i][6]);
      mergedDataArr[index].matchAvg[1][2] += parseInt(matchDataArr[i][6]);
      mergedDataArr[index].matchAvg[1][3] += parseInt(matchDataArr[i][6]);
      totalMatches[mergedDataArr[index].teamNumber] =
        totalMatches[mergedDataArr[index].teamNumber] - 1;
      if (totalMatches[mergedDataArr[index].teamNumber] == 0) {
        for (let k = 0; k < mergedDataArr[index].matchAvg.length; k++) {
          mergedDataArr[index].matchAvg.length[k] =
            mergedDataArr[index].matchAvg.length[k] /
            realTotalMatches[mergedDataArr[index].teamNumber];
        }
      }
    }

    //to store pit data
    const teamDataArr = [];

    //formatted and combined data goes here

    //This gets teamSnapshot (Pit Scout data) and matchSnapshot (Match Scout data)
    const db = getFirestore();
    const teamSnapshot = await getDocs(collection(db, "teams"));
    const matchSnapshot = await getDocs(collection(db, "match"));

    //This pushes each data object (a match or a team) to their respective arrays.

    teamSnapshot.forEach((team) => {
      teamDataArr.push(team.data());
    });

    //This processes the data:
    //Iterating over teams
    for (let i = 0; i < teamDataArr.length; i++) {
      //Iterating over matches to find ones that the team played in
      let filteredTeamMatchData = matchDataArr.filter((md) => {
        return md.teamNumber == teamDataArr[i].teamNumber;
      });

      //THIS IS THE FORMAT HANGAR DATA MUST BE IN

      //THIS IS THE FORMAT NUMERICAL DATA MUST BE IN

      var totMatch = 0;

      //iterating over matches the team played.
      filteredTeamMatchData.forEach((j) => {
        totMatch = totMatch + 1;

        //this counts which bar team made to in each match
        if (j.Hangar == "Traverse") {
          hang[1][0] += 1;
        } else if (j.Hangar == "High") {
          hang[1][1] += 1;
        } else if (j.Hangar == "Medium") {
          hang[1][2] += 1;
        } else if (j.Hangar == "Low") {
          hang[1][3] += 1;
        } else {
          hang[1][4] += 1;
        }

        //This simply adds in the points (we haven't calculated average yet)
        matchavg[1][0] += parseInt(j.AutoLH);
        matchavg[1][1] += parseInt(j.AutoUH);
        matchavg[1][2] += parseInt(j.TeleopLH);
        matchavg[1][3] += parseInt(j.TeleopUH);
        matchavg[1][4] += parseInt(j.ClimbTime);

        //This adds in comments
        autoC.push(j.AutoC);
        teleopC.push(j.TeleopC);
        endgameC.push(j.EndgameC);
      });

      //This makes matchavg actually contain the averages
      if (totMatch > 0) {
        for (let k = 0; k < matchavg[1].length; k++) {
          matchavg[1][k] = matchavg[1][k] / totMatch;
        }
      }

      //We create a new object with all our data
      const newMatchAvgObj = {
        hangar: hang,
        matchAvg: matchavg,
        commentAuto: autoC,
        commentTele: teleopC,
        commentEnd: endgameC,
      };

      //This combines team data and match data and pushes it to an array
      mergedDataArr.push({ ...teamDataArr[i], ...newMatchAvgObj });
    }

    //...And we use that array as the team data.
    console.log(mergedDataArr);
    setTeamData(mergedDataArr);
  }, []);

  //VERY IMPORTANT:
  //Make the data from your backend into this format -->
  //Tell me what fields you want removed, though
  //Like you said you didn't want worlds or pastFocuses
  const dummyMatchDataArr = [
    {
      teamNumber: "123",
      teamName: "Some team",
      cvCapability: "no",
      driveTrain: "2W",
      height: "12",
      length: "15",
      pastFocuses: "this was good in past",
      weight: "20",
      worlds: "yes",
      hangar: [
        ["Traverse", "High", "Medium", "Low", "None"],
        [0, 2, 1, 1, 0],
      ],
      matchAvg: [
        ["auto LH", "auto UH", "teleop LH", "teleop UH", "Climb Time"],
        [1, 2, 4, 2, 25],
      ],
      commentAuto: ["blah1", "blah2", "blah1", "blah2"],
      commentTele: ["clah1", "clah2", "clah1", "clah2"],
      commentEnd: ["elah1", "elah2", "elah1", "elah2"],
    },
    {
      teamNumber: "210",
      teamName: "Some other team",
      cvCapability: "no",
      driveTrain: "2W",
      height: "12",
      length: "15",
      pastFocuses: "this was good in past",
      weight: "20",
      worlds: "yes",
      hangar: [
        ["Traverse", "High", "Medium", "Low", "None"],
        [0, 2, 1, 1, 0],
      ],
      matchAvg: [
        ["auto LH", "auto UH", "teleop LH", "teleop UH", "Climb Time"],
        [1, 2, 4, 2, 25],
      ],
      commentAuto: ["blae1", "blae2", "blae1", "blae2"],
      commentTele: ["clae1", "clae2", "clae1", "clae2"],
      commentEnd: ["elae1", "elae2", "elae1", "elae2"],
    },
  ];

  const returnTeamCards = () => {
    return teamData.map((teamRow, index) => {
      let labelcolor, bgcolor;
      if (index % 2 == 0) {
        labelcolor = "black";
        bgcolor = "white";
      } else {
        labelcolor = "orange";
        bgcolor = "white";
      }
      return (
        <TeamCard
          key={index}
          bgcolor={bgcolor}
          labelcolor={labelcolor}
          textcolor={"black"}
          teamData={teamRow}
        />
      );
    });
  };

  return (
    <List style={{ margin: "10px", padding: "10px" }}>{returnTeamCards()}</List>
  );
};
export default TeamPages;
