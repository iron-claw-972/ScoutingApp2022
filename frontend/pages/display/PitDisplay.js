import ClimbSpecs from "../../components/DisplayTypes/ClimbSpecs";
import DriveSpecs from "../../components/DisplayTypes/DriveSpecs";
import ShooterSpecs from "../../components/DisplayTypes/ShooterSpecs";
import Sponsors from "../../components/DisplayTypes/Sponsors";
import Textbox from "../../components/DisplayTypes/Textbox";

export default function PitDisplay(prop) {
  const autoHeading = "Auto Capabilities";
  const autoCapabilities =
    "Deposit preloaded ball, intake 1-2 more balls, and deposit them.";
  return (
    <div>
      <h3>Publicity Board</h3>
      <ClimbSpecs></ClimbSpecs>
      <ShooterSpecs></ShooterSpecs>
      <DriveSpecs></DriveSpecs>
      <Textbox category={autoHeading} text={autoCapabilities}></Textbox>

      <iframe></iframe>

      <Sponsors></Sponsors>
    </div>
  );
}
