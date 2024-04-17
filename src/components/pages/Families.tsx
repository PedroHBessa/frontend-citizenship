import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../molecules/Header';
import { DataView } from '../organisms/DataView';
import { useFamilies } from '../hooks/useFamilies';
import { DateTime } from '../atoms/DataTable/DateTime';
import { Status } from '../atoms/DataTable/Status';
import { NewButton } from '../atoms/NewButton';
import { FormModal as NewModal } from '../molecules/FormModal';
import AddIcon from '@mui/icons-material/Add';
import familiesSchema from '../../schemas/familiesSchema';
import { Data } from '../../types/data';
import { Applicant } from '../atoms/DataTable/Applicant';
import { Operator } from '../atoms/DataTable/Operator';

const headCells = [
  {
    id: 'id',
    disablePadding: true,
    label: 'Reference',
  },
  {
    id: 'familyStatus',
    disablePadding: true,
    label: 'Status',
    component: <Status keyName='familyStatus' />,
  },
  {
    id: 'familyName',
    disablePadding: true,
    label: 'Family Name',
  },
  {
    id: 'personalInformation',
    disablePadding: true,
    label: 'Applicant',
    component: <Applicant />,
  },
  {
    id: 'createdAt',
    disablePadding: true,
    label: 'Submitted Date',
    component: <DateTime keyName='createdAt' />,
  },
  {
    id: 'operator',
    disablePadding: true,
    label: 'Operator',
    component: <Operator />,
  },
];

export function Families() {
  const { rows, loading, initialized, openModal, setOpenModal, addNew } =
    useFamilies();

  const handleAddNew = (formData: Data) => {
    addNew(formData);
  };

  return (
    <>
      <Helmet title='Families' />
      <Header
        actionButton={
          <NewButton onClick={() => setOpenModal(true)}>New Family</NewButton>
        }
      >
        Families
      </Header>
      <NewModal
        loading={loading}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddNew}
        open={openModal}
        schema={familiesSchema}
        startIcon={<AddIcon />}
        submitLabel='Add New'
      />
      <DataView
        contextName='families'
        headCells={headCells}
        initialized={initialized}
        loading={loading}
        rows={rows}
      />
    </>
  );
}
