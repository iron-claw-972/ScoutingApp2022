import styles from "../../styles/Home.module.css";

export default function DriveSpecs(props) {
  {
    return (
      <div>
        <h4>Drive Subsystem Specs</h4>
        <table className={styles.specstyle}>
          <tr>
            <th className={styles.thstyle}>spex</th>
            <th className={styles.thstyle}>more spex</th>
          </tr>
          <tr>
            <td className={styles.tdstyle}> speccy</td>
            <td className={styles.tdstyle}> more speccy</td>
          </tr>
        </table>
      </div>
    );
  }
}
