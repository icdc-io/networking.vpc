import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Header, Input, Modal } from "semantic-ui-react";
import { fetchAllVMs } from "../../AppActions";
import { onSearch } from "../../utilities/search";
import ReturnVmTable from "./returnVmTable";

const AssignVmModal = ({ submitAction, vmAssignedData = [] }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [checked, setChecked] = useState({});
  //   const [disabledList, setDisabledList] = useState({});
  const [checkedCount, setCheckedCount] = useState(0);
  const allServices = useSelector((state) => state.VpcStore.allVms);
  const [nicsBasedVmList, setNicsBasedVmList] = useState([]);
  const disabledList = {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllVMs());
  }, [dispatch]);

  const onChange = (e) => {
    setSearch(e.currentTarget.value);
  };

  const handleClose = () => {
    setChecked({});
    setOpen(false);
  };

  useEffect(() => {
    const nics = [];
    for (const serv of allServices) {
      for (const network of serv.networks) {
        for (const nic of network.allocations) {
          if (nic?.type === "nic" && nic.nic_id) {
            const existingNic = nics.find((x) => x.vmId === nic?.vm_id);
            if (existingNic && nic.ip) {
              existingNic.ipAddresses.push(nic.ip);
            } else {
              nics.push({
                nic: nic?.nic_name,
                nicId: nic.nic_id,
                serviceName: serv?.name,
                vmId: nic?.vm_id,
                vmName: nic.vm_name,
                mac: nic.mac,
                ip: nic.ip,
                ipAddresses: [nic.ip],
                owner: serv?.user?.email,
                uid: nic.uid_ems,
              });
            }
          }
        }
      }
    }

    setNicsBasedVmList(
      nics.filter(
        (x) =>
          !vmAssignedData.some((y) => {
            return y.mac === x.mac;
          }),
      ),
    );
  }, [allServices]);

  const handleSubmit = () => {
    const nicIds = Object.entries(checked)
      .filter((nic) => nic[1].isChecked)
      .map((nic) => nic[0].nicId);
    submitAction(nicIds);
    handleClose();
  };

  useEffect(() => {
    setResult(onSearch(nicsBasedVmList, search));
  }, [search, nicsBasedVmList]);

  const toggle = (id) => () => setChecked({ ...checked, [id]: !checked[id] });

  useEffect(() => {
    setCheckedCount(Object.values(checked).filter((value) => value).length);
  }, [checked]);

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)} primary>
        {t("createNic")}
      </Button>

      <Modal open={open} size="fullscreen" className="networking_vpc_modal">
        <Header content={t("connectAssignetVMS")} />

        <Modal.Content>
          <Input
            value={search}
            onChange={onChange}
            icon="search"
            placeholder="Search..."
          />

          <div className="vm-block">
            <ReturnVmTable
              modal
              vmInterfaces={result}
              checked={checked}
              toggle={toggle}
              disabledList={disabledList}
            />
          </div>
          <Modal.Actions align={"right"}>
            {t("selected", { count: checkedCount })}
            <Button onClick={handleClose}>{t("cancel")}</Button>
            <Button
              onClick={handleSubmit}
              primary
              type="submit"
              disabled={!checkedCount}
            >
              {t("save")}
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    </React.Fragment>
  );
};

AssignVmModal.propTypes = {
  vmAssignedData: PropTypes.array,
  submitAction: PropTypes.func,
};

export default AssignVmModal;
