import React, { useState, useEffect } from 'react';
import { Table, Icon, Checkbox, Grid, Header, Input, Pagination, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TableHeader from '../../general/tableHeader';
import AssignVmModal from './assignVmModal';
import { onSearch } from '../../utilities/search';
import { useSelector } from 'react-redux';

const ApiButton = React.lazy(() => import('container/ApiButton'));

const ReturnVmTable = ({ t, modal, vmInterfaces, checked, toggle, showModalButton, onModalSubmit, onDelete, disabledList, group }) => {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [oldActivePage, setoldActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [paginationMass, setPaginationMass] = useState([]);
    const providerId = useSelector(state => state.VpcStore.providerId);
    const user = useSelector(state => state.host.user);
    const baseUrls = useSelector(state => state.host.baseUrls);

    const getPaginationMass = () => {
        let paginationMassVar = [];
        if (activePage === totalPages) {
            paginationMassVar = result.slice((activePage - 1) * 10, result.length + 1);
            setPaginationMass(paginationMassVar);
        } else {
            paginationMassVar = result.slice((activePage - 1) * 10, activePage * 10);
            setPaginationMass(paginationMassVar);
        }
    };

    const onChange = (e) => {
        setSearch(e.currentTarget.value);
    };

    const pageChange = (_e, { activePage }) => {
        setActivePage(activePage);
        setoldActivePage(activePage);
    };

    useEffect(() => {
        if (vmInterfaces) {
            setResult(vmInterfaces);
            setTotalPages(Math.ceil(vmInterfaces.length / 10));
            getPaginationMass();
        }
    }, [vmInterfaces]);

    useEffect(() => {
        setResult(onSearch(vmInterfaces, search));
    }, [search, activePage, totalPages]);

    useEffect(() => {
        if (activePage !== oldActivePage && search === '') {
            setActivePage(oldActivePage);
        } else {
            setActivePage(1);
        }
    }, [search]);

    useEffect(() => {
        if (result) {
            setTotalPages(Math.ceil(result.length / 10));
            getPaginationMass();
        }
    }, [result, activePage, totalPages]);

    const nameCells = ['nic', 'service', 'vmName', 'vmId', 'mac', 'ipv4', 'ipv6'];
    modal && nameCells.splice(5);

    const headers = nameCells.slice(0);
    modal ? headers.unshift('') : headers.push('', '');

    const vmInterfacesCell = (vmInterface) => {
        const vmInterfacesCell = nameCells.map((nameCell, index) => {
            return (
                <Table.Cell key={index}>{vmInterface[nameCell] || String.fromCharCode(8212)}</Table.Cell>
            );
        });

        // eslint-disable-next-line
        modal ? vmInterfacesCell.unshift(<Table.Cell key={vmInterface.nicId}><Checkbox onChange={toggle(vmInterface.vmId)} checked={checked[vmInterface.nicId]} disabled={disabledList[vmInterface.nicId]} /></Table.Cell>) :
            vmInterfacesCell.push(
                <Table.Cell key={vmInterfacesCell.length + 1}>
                    <React.Suspense fallback={
                        <Loader active inline='centered' />
                    }>
                        <ApiButton
                            firewallGroup={group}
                            element='vmTable'
                            item={vmInterface}
                            user={user}
                            providerId={providerId} 
                            locationUrl={baseUrls[user.location]}/>
                    </React.Suspense>
                </Table.Cell>,
                user.role === 'admin' && <Table.Cell key={vmInterfacesCell.length + 2}>
                    {onDelete && <Icon onClick={onDelete(vmInterface.nicId)} name='trash alternate' />}
                </Table.Cell>
            );

        return vmInterfacesCell;
    };

    const vmInterfacesRow = paginationMass && paginationMass.map((vmInterface, index) => (
        // eslint-disable-next-line max-len
        <Table.Row className={disabledList && disabledList[vmInterface.nicId] && 'disabled-nic' || ''} key={index}>{vmInterfacesCell(vmInterface)}</Table.Row>
    ));

    return <>
        <Header as='h4'>{t('assignedVm')} ({vmInterfaces.length})</Header>
        {!modal && <Grid.Row>
            <Grid.Column verticalAlign='middle' width={8}>
                <Input value={search} onChange={onChange} icon='search'
                    placeholder={t('search')}
                    disabled={vmInterfaces.length === 0} />
            </Grid.Column>
            {showModalButton && <Grid.Column textAlign='right' width={8}>
                <AssignVmModal t={t} submitAction={onModalSubmit} />
            </Grid.Column>}
        </Grid.Row>}
        <div className='table-container'>
            <Table unstackable className="item-list">
                <TableHeader t={t} headers={headers} />
                <Table.Body>{vmInterfacesRow}</Table.Body>
            </Table>
        </div>
        {vmInterfaces.length > 9 &&
            <Grid.Row className='pagination__vm'>
                <Pagination
                    pointing
                    secondary
                    lastItem={null}
                    firstItem={null}
                    activePage={activePage}
                    totalPages={totalPages}
                    onPageChange={pageChange} />
            </Grid.Row>
        }
        {vmInterfaces.length === 0 &&
            <Grid.Row className='pagination__novm'>
                <Grid.Column className='novm-text'>{t('noAssignedVM')}</Grid.Column>
            </Grid.Row>
        }
    </>;
};

ReturnVmTable.propTypes = {
    t: PropTypes.func,
    vmInterfaces: PropTypes.array,
    modal: PropTypes.bool,
    checked: PropTypes.any,
    toggle: PropTypes.func,
    showModalButton: PropTypes.bool,
    onModalSubmit: PropTypes.func,
    onDelete: PropTypes.func,
    disabledList: PropTypes.any,
    group: PropTypes.object
};

export default ReturnVmTable;
