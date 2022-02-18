import ClimbSpecs from "../../components/DisplayTypes/ClimbSpecs";
import DriveSpecs from "../../components/DisplayTypes/DriveSpecs";
import ShooterSpecs from "../../components/DisplayTypes/ShooterSpecs";
import Sponsors from "../../components/DisplayTypes/Sponsors";
import Textbox from "../../components/DisplayTypes/Textbox";
import dynamic from "next/dynamic";

export default function PitDisplay(props) {
  const autoHeading = "Auto Capabilities";
  const autoCapabilities =
    "Deposit preloaded ball, intake 1-2 more balls, and deposit them.";
  const teamHist =
    "Iron Claw is an FRC team that operates through the Robotics Class at Los Gatos High School. It was founded with a strong belief in the importance of student leadership.";
  const PDFViewer = dynamic(() => import("../components/pdf-viewer"), {
    ssr: false,
  });
  return (
    <div>
      <h3>Publicity Board</h3>
      <ClimbSpecs></ClimbSpecs>
      <ShooterSpecs></ShooterSpecs>
      <DriveSpecs></DriveSpecs>
      <Textbox category={autoHeading} text={autoCapabilities}></Textbox>

      <PDFViewer />

      <Textbox category={"About Us"} text={teamHist}></Textbox>
    </div>
  );
}
