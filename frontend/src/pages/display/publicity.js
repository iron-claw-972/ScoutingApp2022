import Image from "next/image";

export default function PublicityBoard() {
  return (
    <div className="container">
      <div className="row">
        <div className="p-3 col-10" style={{ height: "100vh" }}>
          <Image alt="Iron Claw Robotics logo" src="/ironclawlogo.png" width={221} height={110} className="position-absolute top-0 end-0 d-inline-block" />
          <iframe
            src="/2022DietTechBinder/2022DietTechBinder.html"
            className="col-xs-12 col-10 h-75 border border-primary d-inline-block"
          />
        </div>
      </div>
    </div>

  )
}