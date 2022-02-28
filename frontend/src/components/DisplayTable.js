import PropTypes from "prop-types";
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';

function DisplayTable(props) {

  registerAllModules()

  return (
    <>
      <HotTable {...props} />
    </>
  );
}

export default DisplayTable;