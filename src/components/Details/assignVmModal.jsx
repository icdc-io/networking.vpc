import { Button } from "container/Button";
import { Input } from "container/Input";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "container/Modal";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVMs } from "../../AppActions";
import { onSearch } from "../../utilities/search";
import ReturnVmTable from "./returnVmTable";

const AssignVmModal = ({ submitAction, vmAssignedData = [] }) => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [result, setResult] = useState([]);
	const [checked, setChecked] = useState({});
	const allServices = useSelector((state) => state.VpcStore.allVms);
	const [nicsBasedVmList, setNicsBasedVmList] = useState([]);
	const disabledList = {};
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllVMs());
	}, [dispatch]);

	const onChange = (e) => {
		setSearch(e.target.value);
	};

	const handleClose = () => {
		setChecked({});
		setOpen(false);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const vms = [];
		const allVms = allServices.flatMap((item) =>
			item.vms.map((vm) => ({
				...vm,
				serviceName: item.name,
				owner: item.evm_owner.email,
			})),
		);

		for (const vm of allVms) {
			vms.push({
				serviceName: vm.serviceName,
				vmId: vm.id,
				vmName: vm.name,
				owner: vm.owner,
				uid: vm.uid_ems,
			});
		}

		setNicsBasedVmList(
			vms.filter(
				(x) =>
					!vmAssignedData.some((y) => {
						return +y.uuid === +x.uid;
					}),
			),
		);
	}, [allServices]);

	const handleSubmit = () => {
		const nicIds = Object.entries(checked)
			.filter((nic) => nic[1])
			.map((nic) => nic[0]);
		submitAction(nicIds);
		handleClose();
	};

	useEffect(() => {
		setResult(onSearch(nicsBasedVmList, search));
	}, [search, nicsBasedVmList]);

	const toggle = (id) => () => setChecked({ ...checked, [id]: !checked[id] });

	// useEffect(() => {
	// 	setCheckedCount(Object.values(checked).filter((value) => value).length);
	// }, [checked]);

	const checkedCount = Object.values(checked).filter((value) => value).length;

	return (
		<React.Fragment>
			<Button onClick={() => setOpen(true)}>{t("createNic")}</Button>
			<Dialog
				open={open}
				onOpenChange={(isOpen) => {
					setOpen(isOpen);
				}}
			>
				<DialogContent aria-describedby={undefined} className="assign_vm_modal">
					<DialogHeader>
						<DialogTitle>{t("connectAssignetVMS")}</DialogTitle>
					</DialogHeader>
					{/* <p>{getDescription()}</p> */}
					<div className="input-container">
						<Input
							value={search}
							onChange={onChange}
							variant="search"
							placeholder={t("search")}
						/>
					</div>

					<div className="vm-block">
						<ReturnVmTable
							modal
							vmInterfaces={result}
							checked={checked}
							toggle={toggle}
							disabledList={disabledList}
						/>
					</div>
					<DialogFooter>
						<span className="flex items-center">
							{t("selected", { count: checkedCount })}
						</span>
						<DialogClose asChild>
							<Button
								variant="ghost"
								size="lg"
								type="button"
								// className={styles.cancel}
							>
								{t("cancel")}
							</Button>
						</DialogClose>
						<Button
							onClick={handleSubmit}
							size="lg"
							type="button"
							disabled={!checkedCount}
						>
							{t("save")}
						</Button>

						{/* <Button
							type="button"
							size="lg"
							className={"confirm-delete-dns"}
							onClick={onSubmitHandler}
						>
							{t("confirm")}
						</Button> */}
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* <Modal open={open} size="fullscreen" className="networking_vpc_modal">
				<Header content={t("connectAssignetVMS")} />

				<Modal.Content>

					<Modal.Actions align={"right"}>

					</Modal.Actions>
				</Modal.Content>
			</Modal> */}
		</React.Fragment>
	);
};

export default AssignVmModal;
