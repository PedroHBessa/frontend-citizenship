import {
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { FamilyTreeMember } from 'components/contexts/FamilyContext';
import { useFamily } from 'components/hooks/useFamily';
import { useTab } from 'components/hooks/useTab';
import { useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { grayScale } from 'theme/variants';
import { FamilyMemberStatus } from 'types/State';

type ParentItem = {
  name: string;
  id: string;
  marriageId: string[];
  spouseName?: string;
};

type CardProps = {
  selected?: boolean;
};

const CustomCard = styled(Card)<CardProps>`
  && {
    background: ${(props) => (props.selected ? grayScale[60] : grayScale[25])};
    padding: 0.75rem;
    height: 100%;
    box-sizing: border-box;
    transition: background 0.3s;
    cursor: pointer;
    &:hover {
      background: ${grayScale[60]};
    }
  }
`;

function ParentItemComponent({ member }: { member: ParentItem }) {
  const { setCurrentMarriageId, currentMarriageId } = useTab();
  const radioRef = useRef<HTMLInputElement | null>(null);

  return (
    <CustomCard
      onClick={() => radioRef?.current?.click()}
      selected={currentMarriageId?.join(',') === member.marriageId.join(',')}
    >
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <FormControlLabel
              control={<Radio />}
              label=''
              onChange={() => {
                setCurrentMarriageId(member.marriageId);
              }}
              ref={radioRef}
              value={member.marriageId?.join(',')}
            />
          </Grid>
          <Grid item xs={10}>
            <FormLabel>Parent</FormLabel>
            <Typography variant='h6'>{member.name}</Typography>
            {member.spouseName && (
              <>
                <Divider sx={{ margin: '1rem 0' }} />
                <FormLabel>Spouse</FormLabel>
                <Typography variant='h6'>{member.spouseName}</Typography>
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </CustomCard>
  );
}

export function Parents({
  control,
  required = false,
}: {
  control: Control<{ gender: string; type: string; parents: string }>;
  required?: boolean;
}) {
  const { tree } = useFamily();

  const onlyNotFromLineage = tree
    .filter((member: { name: string }) => member.name.length > 0)
    .filter(
      (member: { status: string }) =>
        member.status !== FamilyMemberStatus.NOT_FROM_LINEAGE
    );
  const parents = [
    ...onlyNotFromLineage
      .filter((member) => member.spouses.length > 0)
      .flatMap((member) => {
        return member.spouses.map((spouse) => {
          const spouseObj = tree.find(
            (m: FamilyTreeMember) => m.id === spouse.id
          );

          return {
            name: member.name,
            spouseName: spouseObj?.name,
            id: member.id,
            marriageId: [member.id, spouse.id],
          };
        });
      }),
    ...onlyNotFromLineage.map((member: FamilyTreeMember) => {
      return {
        name: member.name,
        id: member.id,
        marriageId: [member.id],
      };
    }),
  ] as ParentItem[];

  return (
    <>
      {!!parents.length && (
        <Grid item xs={12}>
          <FormLabel>Parent Relationship</FormLabel>
          <Controller
            control={control}
            name='parents'
            render={({ field, fieldState: { error } }) => (
              <RadioGroup {...field}>
                <Grid container mt={2} spacing={2}>
                  {parents.map((member: ParentItem) => (
                    <Grid
                      item
                      key={`${member.marriageId}-parents`}
                      lg={4}
                      sm={6}
                      xl={3}
                      xs={6}
                    >
                      <ParentItemComponent member={member} />
                    </Grid>
                  ))}
                </Grid>
                {error && (
                  <Typography color='error' variant='caption'>
                    {error.message}
                  </Typography>
                )}
              </RadioGroup>
            )}
            rules={{ required: required && 'You must select an ancestor' }}
          />
        </Grid>
      )}
    </>
  );
}
