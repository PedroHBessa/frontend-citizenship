import React, { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../molecules/Header';
import { ReportLayout } from '../atoms/ReportLayout';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EmailIcon from '@mui/icons-material/Email';
import { SelectFormField } from 'components/atoms/CommonFormFields/SelectField';
import { useFamilies } from 'components/hooks/useFamilies';
import Configuration from 'config/Configuration';
import { Api } from 'api/Api';

const api = new Api();
const config = new Configuration();

/* eslint-disable @typescript-eslint/no-explicit-any */

export function Reports() {
  const { rows } = useFamilies();
  const [opt, setOpt] = React.useState([]);
  const [data, setData] = React.useState<any>([]);
  const [selectedFamily, setSelectedFamily] = React.useState<any>(null);

  const fetchData = useCallback(() => {
    api
      .get(
        config.getRouteWithVars(config.endpoint.get.report, {
          familyId: selectedFamily,
        })
      )
      .then((response) => {
        setData(response.data);
      })
      .finally(() => {});
  }, [selectedFamily]);

  useEffect(() => {
    if (selectedFamily) {
      fetchData();
    }
  }, [fetchData, selectedFamily]);

  useEffect(() => {
    setOpt(formatDataToOptions(rows));
    setSelectedFamily(rows[0]?._id);
  }, [rows]);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const formatDataToOptions = (data: any) => {
    return data.map((item: any) => {
      return {
        label: item.familyName,
        value: item._id,
      };
    });
  };

  return (
    <>
      <Helmet title='Reports' />
      <Header
        actionButton={
          <div style={{ width: '200px' }}>
            <SelectFormField
              label='Select the family'
              options={opt}
              setSelectedFamily={setSelectedFamily}
            />
          </div>
        }
      >
        Reports
      </Header>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '1rem',
          gap: '0.5rem',
        }}
      >
        <LocalPrintshopIcon style={{ fontSize: '40px' }} />
        <EmailIcon style={{ fontSize: '40px' }} />
      </div>
      <ReportLayout data={data} />
    </>
  );
}
