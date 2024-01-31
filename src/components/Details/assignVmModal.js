import React, { useState, useEffect } from 'react';
import { Modal, Header, Button, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ReturnVmTable from './returnVmTable';
import { onSearch } from '../../utilities/search';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllVMs } from '../../AppActions';

const AssignVmModal = ({ t, submitAction, vmAssignedData = [] }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [checked, setChecked] = useState({});
    const [disabledList, setDisabledList] = useState({});
    const [checkedCount, setCheckedCount] = useState(0);
    const allServices = useSelector(state => state.VpcStore.allVms)
    const [nicsBasedVmList, setNicsBasedVmList] = useState([]);
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
        for (let serv of allServices) {

            for (let network of serv.networks) { 
            
                for (let nic of network.allocations) {
                    if (nic?.type === 'nic' && nic.nic_id) {
                        nics.push({
                            nic: nic?.nic_name,
                            nicId: nic.nic_id,
                            serviceName: serv?.name,
                            vmName: nic.vm_name,
                            uuid: nic.uid_ems,
                            mac: nic.mac,
                            ip: nic.ip,
                            email: serv?.user?.email,
                            uid: nic.uid_ems
                        });
                    }
                }
            }
        }

        setNicsBasedVmList(nics.filter(x => !vmAssignedData.some(y => {
            return y.mac == x.mac
        })));
    }, [allServices]);

    const handleSubmit = () => {
        const uids = Object.entries(checked).filter(([_nicId, isChecked]) => isChecked).map(([nicId, _isChecked]) => nicId);
        var nicIds = nicsBasedVmList.filter(x => uids.includes(x.uid)).map(x=>x.nicId);
        submitAction(nicIds);
        handleClose();
    };

    useEffect(() => {
        setResult(onSearch(nicsBasedVmList, search));
    }, [search, nicsBasedVmList]);

    const toggle = (id) => () => (setChecked({ ...checked, [id]: !checked[id] }));

    useEffect(() => {
        setCheckedCount(Object.values(checked).filter(value => value).length);
    }, [checked]);

    return <React.Fragment>
        <Button onClick={() => setOpen(true)} primary>{t('assignNic')}</Button>

        <Modal open={open} size="fullscreen">
            <Header content={t('selectAssignetVMS')} />
           
            <Modal.Content>
                <Input value={search} onChange={onChange} icon='search' placeholder='Search...' />

                <div className='vm-block'>
                    <ReturnVmTable t={t} modal vmInterfaces={result} checked={checked} toggle={toggle} disabledList={disabledList} />
                </div>
                <Modal.Actions align={'right'}>
                    {t('selected', { count: checkedCount })}
                    <Button onClick={handleClose}>{t('cancel')}</Button>
                    <Button onClick={handleSubmit} primary type='submit' disabled={!checkedCount} >{t('save')}</Button>
                </Modal.Actions>
            </Modal.Content>
        </Modal>
    </React.Fragment>;
};

AssignVmModal.propTypes = {
    t: PropTypes.func,
    // data: PropTypes.string,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitAction: PropTypes.func
};

export default AssignVmModal;
