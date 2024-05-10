import ClearIcon from '@mui/icons-material/Clear';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import {
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { customColor, familyMemberStatusColor } from 'theme/variants';
import { FamilyMemberStatus } from 'types/State';
import Configuration from '../../config/Configuration';
import {
  IIncomingDocumentData,
  MemberDocumentType,
} from '../../types/document';

interface SetDocumentTypePreviewProps extends IIncomingDocumentData {
  setDocumentType: (
    documentId: string,
    documentType: MemberDocumentType
  ) => Promise<void>;
  onDelete: (documentId: string) => void;
  processing?: boolean;
}

const ContentWrapper = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 254px;
  height: 254px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & img {
    width: 100%;
  }
`;

const SelectButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  align-items: center;
  border-bottom-left-radius: 5px;
  border-right: 1px solid rgb(180, 180, 180);
  border-top-left-radius: 5px;
  display: flex;
  height: 100%;
  justify-content: center;
  margin: 0 1rem 0 0;
  padding: 0 0.7rem;
  cursor: pointer;
`;

const DeleteDocument = styled.div`
  position: absolute;
  top: 20px;
  transform: translateY(-50%);
  right: 5px;
  z-index: 99999;
`;

const DeleteDocumentButton = styled(IconButton)`
  && {
    background: ${familyMemberStatusColor[FamilyMemberStatus.ERRORS]};
    color: white;
    pointer-events: all;
    &:hover {
      background: ${customColor[800]};
      color: white;
    }
  }
`;

const documentTypes = [
  { name: 'Select the document', type: MemberDocumentType.UNKNOWN },
  { name: 'Birth Certificate', type: MemberDocumentType.BIRTH_CERTIFICATE },
  { name: 'Death Certificate', type: MemberDocumentType.DEATH_CERTIFICATE },
  {
    name: 'Marriage Certificate',
    type: MemberDocumentType.MARRIAGE_CERTIFICATE,
  },
  { name: 'Divorce Certificate', type: MemberDocumentType.DIVORCE_CERTIFICATE },
];

const SetDocumentTypePreview: React.FC<SetDocumentTypePreviewProps> = ({
  setDocumentType,
  onDelete,
  processing,
  ...props
}) => {
  const config = new Configuration();

  const handleChange = (event: SelectChangeEvent) => {
    setDocumentType(props._id, event.target.value as MemberDocumentType);
  };

  const disabled = processing
    ? {
        pointerEvents: 'none',
        opacity: 0.5,
      }
    : {};

  return (
    <Paper
      elevation={3}
      sx={{ backgroundColor: '#e5e5e5', width: '100%', ...disabled }}
    >
      <ContentWrapper>
        <ImageWrapper>
          {processing ? (
            <CircularProgress />
          ) : (
            props.documentPath && (
              <img
                alt='preview'
                crossOrigin='anonymous'
                src={config.baseUrl + props.documentPath}
              />
            )
          )}
        </ImageWrapper>
        <SelectButtonWrapper>
          <DeleteDocument>
            <DeleteDocumentButton
              onClick={() => {
                onDelete(props._id);
              }}
              size='small'
            >
              <ClearIcon />
            </DeleteDocumentButton>
          </DeleteDocument>

          <FormControl fullWidth size='small'>
            <Select
              fullWidth
              id='demo-simple-select'
              onChange={handleChange}
              placeholder='Select Document Type'
              startAdornment={
                <IconWrapper
                  onClick={() => console.log('open the document preview?')}
                >
                  <ZoomInIcon
                    sx={{
                      color: 'rgb(180 180 180)',
                      fontSize: '24px',
                      height: '40px',
                    }}
                  />
                </IconWrapper>
              }
              sx={{ backgroundColor: '#ebebeb', paddingLeft: 0 }}
              value={props.documentType}
            >
              {documentTypes.map((item) => (
                <MenuItem key={`menu-item-${item.type}`} value={item.type}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SelectButtonWrapper>
      </ContentWrapper>
    </Paper>
  );
};

export default SetDocumentTypePreview;
