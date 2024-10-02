import React from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Option from './Option';

interface QuestionProps {
  options: string[];
  questionText: string;
}

const Question: React.FC<QuestionProps> = ({ options, questionText }) => {
  const [selectedOption, setSelectedOption] = React.useState<string>('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
        {questionText}
      </Typography>
      <RadioGroup value={selectedOption} onChange={handleOptionChange}>
        {options.map((option, index) => (
          <Option key={index} label={option} value={option} />
        ))}
      </RadioGroup>
    </Box>
  );
};

export default Question;
