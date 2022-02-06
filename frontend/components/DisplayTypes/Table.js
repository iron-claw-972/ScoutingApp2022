import styles from "../../styles/Home.module.css";

export default function Table(props) {
  const data = props.input;
  return (
    <div>
      <table className={styles.tablestyle}>
        <tr>
          <th className={styles.thstyle}>Team Number</th>
          <th className={styles.thstyle}>Match Number</th>
          <th className={styles.thstyle}>Auto Low Hub</th>
          <th className={styles.thstyle}>Auto Upper Hub</th>
          <th className={styles.thstyle}>Teleop Low Hub</th>
          <th className={styles.thstyle}>Teleop Upper Hub</th>
          <th className={styles.thstyle}>Hangar</th>
          <th className={styles.thstyle}>Climb Time (seconds)</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td className={styles.tdstyle}>{val.TeamNo}</td>
              <td className={styles.tdstyle}>{val.MatchNo}</td>
              <td className={styles.tdstyle}>{val.AutoLH}</td>
              <td className={styles.tdstyle}>{val.AutoUH}</td>
              <td className={styles.tdstyle}>{val.TeleopLH}</td>
              <td className={styles.tdstyle}>{val.TeleopUH}</td>
              <td className={styles.tdstyle}>{val.Hangar}</td>
              <td className={styles.tdstyle}>{val.ClimbTime}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
