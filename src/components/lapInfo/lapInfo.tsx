import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import styles from "./laps.module.scss";
import TableInfo from "./table";
import { OverallInfo } from "../../types/overall";
import useSessionInfo from "../../hook/useSessionInfo";

const LapsInfo = () => {
  const infos: OverallInfo = useSessionInfo();
  console.log("driverList2", infos);

  return (
    <div className={styles.container_laps_info}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>CURRENT</Th>
              <Th>LAP TIME</Th>
              <Th>GAP</Th>
              <Th isNumeric>FATEST LAP</Th>
              <Th isNumeric>1</Th>
              <Th isNumeric>2</Th>
              <Th isNumeric>3</Th>
              <Th>INFO</Th>
              <Th isNumeric>SECTOR 1</Th>
              <Th isNumeric>SECTOR 2</Th>
              <Th isNumeric>SECTOR 3</Th>
            </Tr>
          </Thead>

          <Tbody>
            {infos?.sessionInfo?.sessionInfo?.map((item) => (
              <TableInfo key={item.driver_number} {...item} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LapsInfo;
