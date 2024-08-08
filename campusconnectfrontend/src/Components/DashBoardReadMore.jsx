import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const DahBoardReadMore = ({ text, maxWords }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expanded state
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to truncate text to a specified number of words
  const truncateText = (text, maxWords) => {
    if (!text) return ''; // Handle undefined or null text
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  return (
    <div>
      <p style={{ margin: 0, color: "black" }}>
        {isExpanded ? text : truncateText(text, maxWords)}
      </p>
      <Button
        onClick={toggleReadMore}
        style={{
          textTransform: 'none',  // Ensures button text is not capitalized
          padding: 0,
          justifyContent: 'left', // Align button text to the left
          fontWeight: 'bold',
        }}
        aria-expanded={isExpanded} // Accessibility feature
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </Button>
    </div>
  );
};

// Define prop types for the component
DahBoardReadMore.propTypes = {
  text: PropTypes.string, // Expecting a string for text
  maxWords: PropTypes.number.isRequired // maxWords is required and should be a number
};

DahBoardReadMore.defaultProps = {
  text: '', // Default value for text
};

export default DahBoardReadMore;
