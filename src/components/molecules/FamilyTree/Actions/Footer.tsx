import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import styled from 'styled-components';
import { darkColors } from 'theme/variants';
import { CustomButton } from '../../../atoms/CustomButton';
import { useTab } from '../../../hooks/useTab';

const ModalActionsFooter = styled.div`
  display: flex;
  width: 100%;
`;

interface FooterProps {
  onClose: () => void;
}

const FinishButton = styled(CustomButton)`
  && {
    background: ${darkColors.darkGreen}!important;
  }
`;

export function Footer({ onClose }: FooterProps) {
  const { currentId, onSubmit, setCurrentId } = useTab();

  const handleClick = () => {
    onSubmit && onSubmit.current(currentId);
  };

  const handleBack = () => {
    let newId = parseInt(currentId) - 1;
    setCurrentId(newId.toString());
  };

  const handleFinish = () => {
    setCurrentId('1');
    onClose();
  };

  return (
    <ModalActionsFooter>
    
        {currentId > '1' && (
          <CustomButton
          color='primary'
          style={{ marginRight: '1rem' }}
          startIcon={<KeyboardDoubleArrowLeftIcon />}
          onClick={() => handleBack()}
          variant='contained'
        >
          Back
        </CustomButton>
      )}
        {currentId === '4' ? (
        <FinishButton
          color='primary'
          endIcon={<KeyboardDoubleArrowRightIcon />}
          onClick={handleFinish}
          variant='contained'
        >
          Finish
        </FinishButton>
      ) : (
        <CustomButton
          color='primary'
          endIcon={<KeyboardDoubleArrowRightIcon />}
          onClick={() => handleClick()}
          variant='contained'
        >
          Next
        </CustomButton>
      )}

      {currentId === '1' && (
        <CustomButton
          color='secondary'
          onClick={onClose}
          startIcon={<BackHandOutlinedIcon />}
          style={{ marginLeft: 'auto' }}
          variant='outlined'
        >
          Manually
        </CustomButton>
      )}

    </ModalActionsFooter>
  );
}
