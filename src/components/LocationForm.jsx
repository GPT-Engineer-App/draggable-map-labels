import React, { useState } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';

const LocationForm = ({ onSubmit, onCancel }) => {
  const [locationName, setLocationName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(locationName);
  };

  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            placeholder="Enter location name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
          <Button onClick={onCancel} colorScheme="red">
            Cancel
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LocationForm;