import Table from "../../components/DisplayTypes/Table";
import Textbox from "../../components/DisplayTypes/Textbox";
export default function Data(props) {
  const defenseText =
    "I think they have pretty good defense. Their defense is low key offense as well. Someone please make me shut up. I'm literally going to die.";
  const defense = "defense";
  const tableinpt = [
    {
      TeamNo: "972",
      MatchNo: 1,
      AutoLH: 1,
      AutoUH: 0,
      TeleopLH: 5,
      TeleopUH: 0,
      Hangar: 15,
      ClimbTime: 25,
    },
  ];
  return (
    <div>
      <Table input={tableinpt}></Table>
      <Textbox category={defense} text={defenseText}></Textbox>
    </div>
  );
}
