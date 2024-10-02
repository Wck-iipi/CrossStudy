import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Question from '../components/Question';

const Quiz: React.FC = () => {
  const handleSubmit = () => {
    console.log('Submit clicked');
  };

  return (
    <Container>
      <Box 
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          1.) THIS IS A QUESTION?
        </Typography>

        {/* Question Component */}
        <Question 
          options={['Option A', 'Option B', 'Option C']}
          questionText="ultrices vel ultrices in dui. consectetur non, urna. varius at, fringilla varius elit ac tincidunt..."
        />

        {/* Submit Button */}
        <Button 
          variant="contained" 
          color="success" 
          onClick={handleSubmit} 
          sx={{ mt: 4 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Quiz;
