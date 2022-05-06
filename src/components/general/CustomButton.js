import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
    color: 'black',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'black',
      borderColor: 'black',
      color: 'white',
      boxShadow: 'none',
    }
});

export default CustomButton;